import axios from 'axios'
import type { AshbyRole } from '../types/index'

const ASHBY_API_KEY = import.meta.env.VITE_ASHBY_API_KEY
const ASHBY_BASE_URL = 'https://api.ashbyhq.com/graphql'

interface AshbyJobResponse {
  id: string
  title: string
  department: {
    name: string
  }
  locationCity: string
  locationCountry: string
  createdAt: string
  pipelineStages?: {
    totalApplicationCount: number
    scheduledInterviewCount: number
  }[]
}

const ASHBY_QUERY = `
  query GetJobs {
    jobs {
      edges {
        node {
          id
          title
          department {
            name
          }
          locationCity
          locationCountry
          createdAt
          pipelineStages {
            name
            totalApplicationCount
            scheduledInterviewCount
          }
        }
      }
    }
  }
`

export async function fetchAshbyRoles(): Promise<AshbyRole[]> {
  if (!ASHBY_API_KEY) {
    console.error('VITE_ASHBY_API_KEY not set')
    return []
  }

  try {
    const response = await axios.post(
      ASHBY_BASE_URL,
      {
        query: ASHBY_QUERY,
      },
      {
        headers: {
          'Authorization': `Bearer ${ASHBY_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (response.data.errors) {
      console.error('Ashby GraphQL errors:', response.data.errors)
      throw new Error('Failed to fetch Ashby roles')
    }

    const jobs = response.data.data?.jobs?.edges || []

    return jobs.map((job: { node: AshbyJobResponse }) => {
      const node = job.node
      const applications = node.pipelineStages?.reduce(
        (sum, stage) => sum + (stage.totalApplicationCount || 0),
        0
      ) || 0
      const interviews = node.pipelineStages?.reduce(
        (sum, stage) => sum + (stage.scheduledInterviewCount || 0),
        0
      ) || 0

      return {
        id: node.id,
        title: node.title,
        department: node.department?.name || 'Unknown',
        location: `${node.locationCity || ''}, ${node.locationCountry || ''}`.replace(/^,\s*/, '').replace(/,\s*$/, ''),
        pipelineStage: node.pipelineStages?.[0]?.name || 'Unknown',
        applications,
        interviewsScheduled: interviews,
        created_at: node.createdAt,
      }
    })
  } catch (error) {
    console.error('Error fetching Ashby roles:', error)
    throw error
  }
}
