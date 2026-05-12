import type { Campaign, AshbyRole, Alert } from '../types'

export function crossReferenceCampaigns(
  campaigns: Campaign[],
  roles: AshbyRole[]
): Campaign[] {
  return campaigns.map((campaign) => {
    const linkedRoles = roles
      .filter((role) => isCampaignForRole(campaign.name, role.title))
      .map((role) => role.title)

    return {
      ...campaign,
      linkedRoles: linkedRoles.length > 0 ? linkedRoles : undefined,
    }
  })
}

function isCampaignForRole(campaignName: string, roleTitle: string): boolean {
  const campaignLower = campaignName.toLowerCase()
  const roleLower = roleTitle.toLowerCase()

  // Direct title match
  if (campaignLower.includes(roleLower)) {
    return true
  }

  // Map campaign keywords to roles
  const mappings: Record<string, string[]> = {
    'EO': ['executive operations', 'ops'],
    'content eng': ['head of content', 'content'],
    'SAM': ['strategic account manager'],
    'cs icp': ['customer success'],
    'marketing/sales icp': ['account executive', 'ae', 'gtm', 'sales'],
    'growth eng': ['growth engineer'],
    'copywriter': [], // Flag as potentially stale
  }

  for (const [keyword, roles] of Object.entries(mappings)) {
    if (campaignLower.includes(keyword.toLowerCase())) {
      return roles.some((r) => roleLower.includes(r))
    }
  }

  return false
}

export function generateAlerts(
  campaigns: Campaign[],
  roles: AshbyRole[]
): Alert[] {
  const alerts: Alert[] = []
  let alertId = 0

  // Find roles without campaigns
  const rolesWithoutCampaigns = roles.filter(
    (role) => !campaigns.some((c) => c.linkedRoles?.includes(role.title))
  )

  rolesWithoutCampaigns.forEach((role) => {
    alerts.push({
      id: `alert-${++alertId}`,
      type: 'error',
      message: `Open role without active campaign: ${role.title}`,
      detail: `${role.title} in ${role.department} has no active HeyReach campaign`,
      linkedRoleId: role.id,
    })
  })

  // Check campaigns for issues
  campaigns.forEach((campaign) => {
    // Low connection rate
    if (campaign.connectionRate > 0 && campaign.connectionRate < 5) {
      alerts.push({
        id: `alert-${++alertId}`,
        type: 'warning',
        message: `Low connection rate: ${campaign.name}`,
        detail: `Connection rate is only ${campaign.connectionRate}% - targeting may be off`,
        linkedCampaignId: campaign.id,
      })
    }

    // No replies despite connections
    if (campaign.connectionRate > 0 && campaign.replyRate === 0) {
      alerts.push({
        id: `alert-${++alertId}`,
        type: 'warning',
        message: `No replies despite connections: ${campaign.name}`,
        detail: `${campaign.connectionRate}% connection but 0% reply rate - may need follow-up messages`,
        linkedCampaignId: campaign.id,
      })
    }

    // Stale archetype
    if (campaign.name.toLowerCase().includes('copywriter')) {
      alerts.push({
        id: `alert-${++alertId}`,
        type: 'info',
        message: `Potentially stale archetype: ${campaign.name}`,
        detail: 'Campaign name contains outdated role archetype',
        linkedCampaignId: campaign.id,
      })
    }

    // List exhaustion
    const totalContacts = campaign.sent + campaign.inProgress
    if (totalContacts > 0) {
      const exhaustion = (campaign.sent / totalContacts) * 100
      if (exhaustion > 80) {
        alerts.push({
          id: `alert-${++alertId}`,
          type: 'warning',
          message: `List nearly exhausted: ${campaign.name}`,
          detail: `${exhaustion.toFixed(0)}% of list used`,
          linkedCampaignId: campaign.id,
        })
      }
    }

    // Finished campaign without new list
    if (campaign.status === 'finished') {
      alerts.push({
        id: `alert-${++alertId}`,
        type: 'info',
        message: `Finished campaign needs action: ${campaign.name}`,
        detail: 'Consider creating a new campaign with fresh prospect list',
        linkedCampaignId: campaign.id,
      })
    }
  })

  return alerts
}
