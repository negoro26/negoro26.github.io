import { useQuery } from '@tanstack/react-query';
import type { GitHubRepo, GitHubUser } from '@/types';

const GITHUB_USERNAME = 'negoro26';

async function fetchGitHubUser(): Promise<GitHubUser> {
  const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
  if (!response.ok) {
    throw new Error('Failed to fetch GitHub user');
  }
  return response.json();
}

async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch GitHub repos');
  }
  const repos: GitHubRepo[] = await response.json();
  // Filter out forks and sort by stars
  return repos
    .filter(repo => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count);
}

export function useGitHubUser() {
  return useQuery({
    queryKey: ['github-user', GITHUB_USERNAME],
    queryFn: fetchGitHubUser,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
  });
}

export function useGitHubRepos() {
  return useQuery({
    queryKey: ['github-repos', GITHUB_USERNAME],
    queryFn: fetchGitHubRepos,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
  });
}
