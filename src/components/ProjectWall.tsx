import { useGitHubRepos } from '@/hooks/useGitHubData';
import { ProjectCard } from './ProjectCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const languageFilters = ['All', 'TypeScript', 'JavaScript', 'Python', 'Rust', 'Go'];

export function ProjectWall() {
  const { data: repos, isLoading, error } = useGitHubRepos();
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredRepos = repos?.filter((repo) => {
    if (activeFilter === 'All') return true;
    return repo.language?.toLowerCase() === activeFilter.toLowerCase();
  });

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load projects. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Language Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {languageFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              activeFilter === filter
                ? 'bg-primary text-primary-foreground glow'
                : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card p-6">
              <Skeleton className="h-6 w-3/4 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <div className="flex gap-4 mb-4">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos?.map((repo) => (
            <ProjectCard key={repo.id} repo={repo} />
          ))}
          {filteredRepos?.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No projects found with this filter.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
