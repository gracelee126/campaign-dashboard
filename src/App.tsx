import { useState, useEffect } from 'react'
import type { DashboardData, Campaign, AshbyRole, Alert } from './types'
import { fetchHeyReachCampaigns } from './api/heyreach'
import { fetchAshbyRoles } from './api/ashby'
import { generateAlerts, crossReferenceCampaigns } from './utils/analysis'
import { calculateStats } from './utils/stats'
import LoginScreen from './components/LoginScreen'
import DashboardHeader from './components/DashboardHeader'
import QuickStats from './components/QuickStats'
import CampaignTable from './components/CampaignTable'
import RolesList from './components/RolesList'
import AlertsPanel from './components/AlertsPanel'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('dashboard_auth')
      if (token) {
        setIsAuthenticated(true)
        loadDashboardData()
      } else {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const loadDashboardData = async () => {
    setLoading(true)
    setError(null)

    try {
      // Load data from localStorage first (cached data)
      const cachedData = localStorage.getItem('dashboard_data')
      if (cachedData) {
        setData(JSON.parse(cachedData))
      }

      // Fetch fresh data from APIs
      const [campaigns, roles] = await Promise.all([
        fetchHeyReachCampaigns(),
        fetchAshbyRoles(),
      ])

      // Cross-reference campaigns with roles
      const campaignsWithRoles = crossReferenceCampaigns(campaigns, roles)
      const rolesWithCampaigns = roles.map((role) => ({
        ...role,
        linkedCampaigns: campaignsWithRoles.filter((c) =>
          c.linkedRoles?.includes(role.title)
        ),
      }))

      // Generate alerts
      const alerts = generateAlerts(campaignsWithRoles, rolesWithCampaigns)

      // Calculate stats
      const stats = calculateStats(campaignsWithRoles, rolesWithCampaigns)

      // Build dashboard data
      const dashboardData: DashboardData = {
        campaigns: campaignsWithRoles,
        roles: rolesWithCampaigns,
        lastSync: new Date().toISOString(),
        alerts,
        stats,
      }

      setData(dashboardData)
      setLastSyncTime(new Date())

      // Cache data
      localStorage.setItem('dashboard_data', JSON.stringify(dashboardData))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load dashboard data'
      setError(message)
      console.error('Dashboard load error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (password: string) => {
    // Simple password check (in production, use proper authentication)
    const correctPassword = import.meta.env.VITE_DASHBOARD_PASSWORD
    if (password === correctPassword) {
      localStorage.setItem('dashboard_auth', 'true')
      setIsAuthenticated(true)
      loadDashboardData()
    } else {
      setError('Invalid password')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('dashboard_auth')
    localStorage.removeItem('dashboard_data')
    setIsAuthenticated(false)
    setData(null)
  }

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} error={error} />
  }

  return (
    <div className="dashboard">
      <DashboardHeader onLogout={handleLogout} lastSync={lastSyncTime} />

      {loading && <div className="loading">Loading dashboard...</div>}

      {error && <div className="alert alert-error">{error}</div>}

      {data && (
        <>
          <QuickStats stats={data.stats} />

          {data.alerts.length > 0 && <AlertsPanel alerts={data.alerts} />}

          <section className="dashboard-section">
            <h2>Active Campaigns</h2>
            <CampaignTable
              campaigns={data.campaigns.filter((c) => c.status === 'active')}
            />
          </section>

          <section className="dashboard-section">
            <h2>Open Roles</h2>
            <RolesList roles={data.roles} campaigns={data.campaigns} />
          </section>

          <section className="dashboard-section">
            <h2>All Campaigns</h2>
            <CampaignTable campaigns={data.campaigns} />
          </section>

          <footer className="dashboard-footer">
            <p>
              Last refreshed:{' '}
              {lastSyncTime?.toLocaleString() || 'Never'}
            </p>
            <p>Data: HeyReach ({data.campaigns.length} campaigns) · Ashby ({data.roles.length} roles)</p>
          </footer>
        </>
      )}
    </div>
  )
}

export default App
