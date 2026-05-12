import axios from 'axios'
import type { Campaign } from '../types/index'

const HEYREACH_FUNCTION_URL = '/.netlify/functions/heyreach'

interface HeyReachCampaignResponse {
  id: string
  name: string
  status: 'active' | 'paused' | 'finished' | 'draft'
  connectionRate: number
  replyRate: number
  openRate: number
  sent: number
  inProgress: number
  positive: number
  negative: number
  senders: string[]
  createdAt: string
}

export async function fetchHeyReachCampaigns(): Promise<Campaign[]> {
  try {
    const campaigns: Campaign[] = []
    let page = 1
    const pageSize = 100

    // Fetch all campaigns with pagination
    while (true) {
      const response = await axios.post<{ data: HeyReachCampaignResponse[] }>(
        HEYREACH_FUNCTION_URL,
        {
          endpoint: 'Campaigns/GetCampaigns',
          page,
          limit: pageSize,
        }
      )

      if (!response.data.data || response.data.data.length === 0) {
        break
      }

      campaigns.push(
        ...response.data.data.map((campaign) => ({
          ...campaign,
          type: determineCampaignType(campaign.name),
        }))
      )

      if (response.data.data.length < pageSize) {
        break
      }

      page++
    }

    return campaigns
  } catch (error) {
    console.error('Error fetching HeyReach campaigns:', error)
    throw error
  }
}

function determineCampaignType(name: string): 'recruiting' | 'client' {
  // Client campaigns typically include a person name + company name
  const clientPatterns = [
    /^[A-Z][a-z]+\s*-\s*[A-Z]/,  // "Name - Company" pattern
    /ICP\s*-\s*/,                 // "ICP - ..." pattern
  ]

  return clientPatterns.some((pattern) => pattern.test(name)) ? 'client' : 'recruiting'
}
