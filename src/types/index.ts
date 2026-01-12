export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  fork: boolean;
}

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  blog: string | null;
  location: string | null;
  company: string | null;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  tags: string[];
  reading_time: number;
  published: boolean;
  author_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface BentoItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  content?: React.ReactNode;
}

export type LanguageBadgeColor = 
  | 'react'
  | 'typescript'
  | 'javascript'
  | 'python'
  | 'rust'
  | 'go'
  | 'html'
  | 'css'
  | 'vue'
  | 'shell'
  | 'default';
