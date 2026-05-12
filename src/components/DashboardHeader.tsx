import './DashboardHeader.css'

interface DashboardHeaderProps {
  onLogout: () => void
  lastSync: Date | null
}

export default function DashboardHeader({ onLogout, lastSync }: DashboardHeaderProps) {
  return (
    <header className="dashboard-header">
      <div className="header-content">
        <h1>Campaign Dashboard</h1>
        <div className="header-actions">
          <span className="last-sync">
            {lastSync ? `Updated: ${lastSync.toLocaleTimeString()}` : 'Loading...'}
          </span>
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
