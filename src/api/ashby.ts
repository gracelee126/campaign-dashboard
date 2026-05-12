import axios from 'axios'
import type { AshbyRole } from '../types/index'

const ASHBY_FUNCTION_URL = '/.netlify/functions/ashby'

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
    name: string
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
  try {
    const response = await axios.post(
      ASHBY_FUNCTION_URL,
      {
        query: ASHBY_QUERY,
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
