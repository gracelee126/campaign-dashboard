import type { AshbyRole, Campaign } from '../types'
import './RolesList.css'

interface RolesListProps {
  roles: AshbyRole[]
  campaigns: Campaign[]
}

export default function RolesList({ roles, campaigns }: RolesListProps) {
  const findCampaignsForRole = (role: AshbyRole): Campaign[] => {
    return campaigns.filter(campaign => {
      const roleName = role.title.toLowerCase()
      const campaignName = campaign.name.toLowerCase()
      return campaignName.includes(roleName) || roleName.includes(campaignName.split(' ')[0])
    })
  }

  if (roles.length === 0) {
    return (
      <section className="roles-list-section">
        <h2>Open Roles</h2>
        <div className="empty-state">No open roles found</div>
      </section>
    )
  }

  return (
    <section className="roles-list-section">
      <h2>Open Roles ({roles.length})</h2>
      <div className="roles-grid">
        {roles.map((role) => {
          const linkedCampaigns = findCampaignsForRole(role)
          const hasActiveCampaign = linkedCampaigns.some(c => c.status === 'active')

          return (
            <div key={role.id} className={`role-card ${!hasActiveCampaign ? 'no-campaign' : ''}`}>
              <div className="role-header">
                <div>
                  <h3 className="role-title">{role.title}</h3>
                  <p className="role-meta">{role.department}</p>
                </div>
                {!hasActiveCampaign && <div className="alert-badge">⚠</div>}
              </div>

              <div className="role-details">
                <div className="detail-item">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">{role.location}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Applications:</span>
                  <span className="detail-value">{role.applicationCount}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Interviews:</span>
                  <span className="detail-value">{role.interviewCount}</span>
                </div>
              </div>

              {linkedCampaigns.length > 0 && (
                <div className="campaigns-section">
                  <p className="campaigns-label">Linked Campaigns:</p>
                  <div className="campaigns-list">
                    {linkedCampaigns.map((campaign) => (
                      <span key={campaign.id} className={`campaign-tag campaign-${campaign.status.toLowerCase()}`}>
                        {campaign.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {linkedCampaigns.length === 0 && (
                <div className="no-campaigns">
                  No active campaigns for this role
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
