export interface GitHubUserResponse {
  avatar_url: string
  bio: null
  blog: string
  company: null
  created_at: string
  email: null
  events_url: string
  followers: number
  followers_url: string
  following: number
  following_url: string
  gists_url: string
  gravatar_id: string | null
  html_url: string
  id: number
  location: string
  login: string
  name: string
  node_id: string
  organizations_url: string
  public_gists: number
  public_repos: number
  received_events_url: string
  repos_url: string
  site_admin: boolean
  starred_url: string
  subscriptions_url: string
  twitter_username: string | null
  type: string
  updated_at: string
  url: string
}

export interface RepositoryResponse {
  id: number | null
  name: string
  description: string
  language: string
  stargazers_count: number | null
  html_url: string
}
