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

export type InitialProfile = {
  avatar_url: ''
  bio: ''
  followers: null
  following: null
  id: null
  location: ''
  login: ''
  name: ''
  public_repos: null
}

export interface RepositoryResponse {
  description?: string
  html_url?: string
  id: number | null
  language?: string
  name?: string
  stargazers_count?: number | null
}

export type InitialRepository = {
  description: ''
  html_url: ''
  id: null
  language: ''
  name: ''
  stargazers_count: null
}
