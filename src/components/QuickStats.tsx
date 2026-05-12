import type { DashboardStats } from '../types'
import './QuickStats.css'

interface QuickStatsProps {
  stats: DashboardStats
}

export default function QuickStats({ stats }: QuickStatsProps) {
  return (
    <section className="quick-stats">
      <div className="stat-card">
        <div className="stat-value">{stats.activeCampaigns}</div>
        <div className="stat-label">Active Campaigns</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{stats.pausedCampaigns}</div>
        <div className="stat-label">Paused</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{stats.openRoles}</div>
        <div className="stat-label">Open Roles</div>
      </div>
      <div className="stat-card alert-card">
        <div className="stat-value">{stats.rolesWithoutCampaigns}</div>
        <div className="stat-label">Roles Without Campaigns</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{stats.avgConnectionRate.toFixed(1)}%</div>
        <div className="stat-label">Avg Connection Rate</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{stats.avgReplyRate.toFixed(1)}%</div>
        <div className="stat-label">Avg Reply Rate</div>
      </div>
    </section>
  )
}
