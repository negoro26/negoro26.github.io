import type { GitHubRepo } from '@/types';
import { TechBadge } from './TechBadge';
import { Star, GitFork, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  repo: GitHubRepo;
  className?: string;
}

export function ProjectCard({ repo, className }: ProjectCardProps) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'glass-card p-6 block group hover:scale-[1.02] transition-all duration-300',
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors truncate pr-2">
          {repo.name}
        </h3>
        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[2.5rem]">
        {repo.description || 'No description provided'}
      </p>

      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-400" />
          <span>{repo.stargazers_count}</span>
        </div>
        <div className="flex items-center gap-1">
          <GitFork className="h-4 w-4" />
          <span>{repo.forks_count}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {repo.language && <TechBadge language={repo.language} />}
        {repo.topics?.slice(0, 3).map((topic) => (
          <TechBadge key={topic} language={topic} />
        ))}
      </div>
    </a>
  );
}
