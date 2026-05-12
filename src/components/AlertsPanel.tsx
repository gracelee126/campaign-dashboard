import type { Alert } from '../types'
import './AlertsPanel.css'

interface AlertsPanelProps {
  alerts: Alert[]
}

export default function AlertsPanel({ alerts }: AlertsPanelProps) {
  const errorAlerts = alerts.filter(a => a.type === 'error')
  const warningAlerts = alerts.filter(a => a.type === 'warning')
  const infoAlerts = alerts.filter(a => a.type === 'info')

  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'error':
        return '✕'
      case 'warning':
        return '⚠'
      case 'info':
        return 'ℹ'
      default:
        return '•'
    }
  }

  if (alerts.length === 0) {
    return (
      <section className="alerts-panel">
        <h2>Alerts</h2>
        <div className="no-alerts">
          <div className="success-icon">✓</div>
          <p>All systems running smoothly</p>
        </div>
      </section>
    )
  }

  return (
    <section className="alerts-panel">
      <h2>Alerts ({alerts.length})</h2>

      {errorAlerts.length > 0 && (
        <div className="alert-group">
          <h3 className="alert-group-title alert-title-error">
            Errors ({errorAlerts.length})
          </h3>
          <div className="alerts-list">
            {errorAlerts.map((alert, idx) => (
              <div key={`error-${idx}`} className="alert-item alert-error">
                <span className="alert-icon">{getAlertIcon('error')}</span>
                <div className="alert-content">
                  <p className="alert-message">{alert.message}</p>
                  {alert.detail && (
                    <p className="alert-details">{alert.detail}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {warningAlerts.length > 0 && (
        <div className="alert-group">
          <h3 className="alert-group-title alert-title-warning">
            Warnings ({warningAlerts.length})
          </h3>
          <div className="alerts-list">
            {warningAlerts.map((alert, idx) => (
              <div key={`warning-${idx}`} className="alert-item alert-warning">
                <span className="alert-icon">{getAlertIcon('warning')}</span>
                <div className="alert-content">
                  <p className="alert-message">{alert.message}</p>
                  {alert.detail && (
                    <p className="alert-details">{alert.detail}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {infoAlerts.length > 0 && (
        <div className="alert-group">
          <h3 className="alert-group-title alert-title-info">
            Information ({infoAlerts.length})
          </h3>
          <div className="alerts-list">
            {infoAlerts.map((alert, idx) => (
              <div key={`info-${idx}`} className="alert-item alert-info">
                <span className="alert-icon">{getAlertIcon('info')}</span>
                <div className="alert-content">
                  <p className="alert-message">{alert.message}</p>
                  {alert.detail && (
                    <p className="alert-details">{alert.detail}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
