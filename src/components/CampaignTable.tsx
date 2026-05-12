import type { Campaign } from '../types'
import './CampaignTable.css'

interface CampaignTableProps {
  campaigns: Campaign[]
}

export default function CampaignTable({ campaigns }: CampaignTableProps) {
  const getStatusBadgeClass = (status: string) => {
    return `badge badge-${status.toLowerCase()}`
  }

  const getTypeBadgeClass = (type: string) => {
    return `badge badge-${type.toLowerCase()}`
  }

  if (campaigns.length === 0) {
    return (
      <section className="campaign-table-section">
        <h2>Campaigns</h2>
        <div className="empty-state">No campaigns found</div>
      </section>
    )
  }

  return (
    <section className="campaign-table-section">
      <h2>Campaigns ({campaigns.length})</h2>
      <div className="table-wrapper">
        <table className="campaign-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Type</th>
              <th>Senders</th>
              <th>Connection Rate</th>
              <th>Reply Rate</th>
              <th>Open Rate</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="campaign-row">
                <td className="campaign-name">{campaign.name}</td>
                <td>
                  <span className={getStatusBadgeClass(campaign.status)}>
                    {campaign.status}
                  </span>
                </td>
                <td>
                  <span className={getTypeBadgeClass(campaign.type)}>
                    {campaign.type}
                  </span>
                </td>
                <td>{campaign.senders.length}</td>
                <td className="metric">
                  {campaign.connectionRate.toFixed(1)}%
                </td>
                <td className="metric">
                  {campaign.replyRate.toFixed(1)}%
                </td>
                <td className="metric">
                  {campaign.openRate.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
