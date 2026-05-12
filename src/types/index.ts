export type CampaignStatus = 'active' | 'paused' | 'finished' | 'draft'
export type CampaignType = 'recruiting' | 'client'

export interface Campaign {
  id: string
  name: string
  status: CampaignStatus
  type: CampaignType
  connectionRate: number
  replyRate: number
  openRate: number
  sent: number
  inProgress: number
  positive: number
  negative: number
  senders: string[]
  createdAt: string
  linkedRoles?: string[]
}

export interface AshbyRole {
  id: string
  title: string
  department: string
  location: string
  pipelineStage: string
  applications: number
  interviewsScheduled: number
  created_at: string
  linkedCampaigns?: Campaign[]
}

export interface DashboardData {
  campaigns: Campaign[]
  roles: AshbyRole[]
  lastSync: string
  alerts: Alert[]
  stats: DashboardStats
}

export interface Alert {
  id: string
  type: 'error' | 'warning' | 'info'
  message: string
  detail?: string
  linkedCampaignId?: string
  linkedRoleId?: string
}

export interface DashboardStats {
  totalCampaigns: number
  activeCampaigns: number
  pausedCampaigns: number
  finishedCampaigns: number
  draftCampaigns: number
  openRoles: number
  rolesWithCampaigns: number
  rolesWithoutCampaigns: number
  avgConnectionRate: number
  avgReplyRate: number
}
