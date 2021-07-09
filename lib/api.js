
const API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'http://54.235.118.120/graphql'

async function fetchAPI(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables })
  })

  const json = await res.json()
  if (json.errors) {
    console.log(json.errors)
    console.log('error details', query, variables)
    throw new Error('Failed to fetch API')
  }

  return json.data
}

export async function getAllCommandAlias() {
  const data = await fetchAPI(`
    query AllAlias {
      posts {
          edges {
              node {
                slug
              }
            }
          }
        }
    `)

  return data?.posts.edges
}

export async function getAllProjects() {
  const data = await fetchAPI(`
    query AllProjects {
      posts(where: {categoryName: "project"}) {
        edges {
          node {
            project {
              title
              description
              app
              github
              icon {
                sourceUrl
              }
            }
          }
        }
      }
    }
  `)
  return data?.posts.edges
}

export async function getCommandOutput(cmd) {
  const data = await fetchAPI(`
    query CommandOutput {
      post(id: "${cmd}", idType: SLUG) {
        command {
          output
        }
      }
    }
  `)
  return data.post?.command.output
}

