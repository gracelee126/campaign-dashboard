import type { Campaign, AshbyRole, DashboardStats } from '../types'

export function calculateStats(
  campaigns: Campaign[],
  roles: AshbyRole[]
): DashboardStats {
  const activeCampaigns = campaigns.filter((c) => c.status === 'active')
  const pausedCampaigns = campaigns.filter((c) => c.status === 'paused')
  const finishedCampaigns = campaigns.filter((c) => c.status === 'finished')
  const draftCampaigns = campaigns.filter((c) => c.status === 'draft')

  const rolesWithCampaigns = roles.filter((role) =>
    campaigns.some((c) => c.linkedRoles?.includes(role.title))
  )

  const avgConnectionRate =
    activeCampaigns.length > 0
      ? activeCampaigns.reduce((sum, c) => sum + c.connectionRate, 0) /
        activeCampaigns.length
      : 0

  const avgReplyRate =
    activeCampaigns.length > 0
      ? activeCampaigns.reduce((sum, c) => sum + c.replyRate, 0) /
        activeCampaigns.length
      : 0

  return {
    totalCampaigns: campaigns.length,
    activeCampaigns: activeCampaigns.length,
    pausedCampaigns: pausedCampaigns.length,
    finishedCampaigns: finishedCampaigns.length,
    draftCampaigns: draftCampaigns.length,
    openRoles: roles.length,
    rolesWithCampaigns: rolesWithCampaigns.length,
    rolesWithoutCampaigns: roles.length - rolesWithCampaigns.length,
    avgConnectionRate: Math.round(avgConnectionRate * 100) / 100,
    avgReplyRate: Math.round(avgReplyRate * 100) / 100,
  }
}
