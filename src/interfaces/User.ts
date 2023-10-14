export interface ProfileResponse {
  avatar_url?: string
  bio?: string
  followers?: number
  following?: number
  id: number
  location?: string
  login: string
  name?: string
  public_repos?: number
}

export interface RepositoryResponse {
  description?: string
  html_url: string
  id: number
  language?: string
  name?: string
  stargazers_count: number
}
