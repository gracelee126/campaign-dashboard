import axios from 'axios'
import type { Campaign } from '../types/index'

const HEYREACH_API_KEY = import.meta.env.VITE_HEYREACH_API_KEY
const HEYREACH_BASE_URL = 'https://api.heyreach.io/api'

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
  if (!HEYREACH_API_KEY) {
    console.error('VITE_HEYREACH_API_KEY not set')
    return []
  }

  try {
    const campaigns: Campaign[] = []
    let page = 1
    const pageSize = 100

    // Fetch all campaigns with pagination
    while (true) {
      const response = await axios.get<{ data: HeyReachCampaignResponse[] }>(
        `${HEYREACH_BASE_URL}/campaigns`,
        {
          params: {
            page,
            limit: pageSize,
          },
          headers: {
            'Authorization': `Bearer ${HEYREACH_API_KEY}`,
            'Content-Type': 'application/json',
          },
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
