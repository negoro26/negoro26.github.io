import { useQuery } from '@tanstack/react-query';
import type { GitHubRepo, GitHubUser } from '@/types';

const GITHUB_USERNAME = 'negoro26';

export interface LanguageStat {
  name: string;
  bytes: number;
  percentage: number;
}

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

async function fetchGitHubLanguages(repos: GitHubRepo[]): Promise<LanguageStat[]> {
  const languageTotals: Record<string, number> = {};
  
  // Fetch languages for each non-fork repo (limit to top 10 to avoid rate limits)
  const reposToFetch = repos.slice(0, 10);
  
  const languagePromises = reposToFetch.map(async (repo) => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/languages`
      );
      if (response.ok) {
        return response.json() as Promise<Record<string, number>>;
      }
      return {};
    } catch {
      return {};
    }
  });
  
  const languageResults = await Promise.all(languagePromises);
  
  // Aggregate all language bytes
  languageResults.forEach((repoLanguages) => {
    Object.entries(repoLanguages).forEach(([lang, bytes]) => {
      languageTotals[lang] = (languageTotals[lang] || 0) + bytes;
    });
  });
  
  // Calculate total bytes and percentages
  const totalBytes = Object.values(languageTotals).reduce((a, b) => a + b, 0);
  
  const languageStats: LanguageStat[] = Object.entries(languageTotals)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: Math.round((bytes / totalBytes) * 100),
    }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 5);
  
  return languageStats;
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

export function useGitHubLanguages(repos: GitHubRepo[] | undefined) {
  return useQuery({
    queryKey: ['github-languages', GITHUB_USERNAME, repos?.map(r => r.name)],
    queryFn: () => fetchGitHubLanguages(repos || []),
    enabled: !!repos && repos.length > 0,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
  });
}
