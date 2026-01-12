import { useGitHubUser, useGitHubRepos } from '@/hooks/useGitHubData';
import { cn } from '@/lib/utils';
import { 
  Code, 
  Briefcase, 
  Trophy, 
  Star, 
  GitFork, 
  Users, 
  Zap,
  Globe,
  Database,
  Cloud
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const skills = [
  { name: 'React', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'Python', level: 85 },
  { name: 'Node.js', level: 88 },
  { name: 'Rust', level: 70 },
];

const services = [
  { icon: Globe, label: 'Full-Stack Development' },
  { icon: Database, label: 'Database Architecture' },
  { icon: Cloud, label: 'Cloud & DevOps' },
  { icon: Zap, label: 'API Design' },
];

export function BentoGrid() {
  const { data: user, isLoading: userLoading } = useGitHubUser();
  const { data: repos, isLoading: reposLoading } = useGitHubRepos();

  const totalStars = repos?.reduce((acc, repo) => acc + repo.stargazers_count, 0) || 0;
  const totalForks = repos?.reduce((acc, repo) => acc + repo.forks_count, 0) || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
      {/* Developer Stats - Large */}
      <div className="glass-card p-6 lg:col-span-2 lg:row-span-2 group hover:scale-[1.02] transition-transform duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Code className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Developer Stats</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <div className="text-3xl font-bold gradient-text">
              {userLoading ? <Skeleton className="h-9 w-16" /> : user?.public_repos || 0}
            </div>
            <div className="text-sm text-muted-foreground">Public Repos</div>
          </div>
          
          <div className="space-y-1">
            <div className="text-3xl font-bold gradient-text flex items-center gap-2">
              {reposLoading ? <Skeleton className="h-9 w-16" /> : (
                <>
                  <Star className="h-6 w-6 text-yellow-400" />
                  {totalStars}
                </>
              )}
            </div>
            <div className="text-sm text-muted-foreground">Total Stars</div>
          </div>
          
          <div className="space-y-1">
            <div className="text-3xl font-bold gradient-text flex items-center gap-2">
              {reposLoading ? <Skeleton className="h-9 w-16" /> : (
                <>
                  <GitFork className="h-6 w-6 text-primary" />
                  {totalForks}
                </>
              )}
            </div>
            <div className="text-sm text-muted-foreground">Total Forks</div>
          </div>
          
          <div className="space-y-1">
            <div className="text-3xl font-bold gradient-text flex items-center gap-2">
              {userLoading ? <Skeleton className="h-9 w-16" /> : (
                <>
                  <Users className="h-6 w-6 text-green-400" />
                  {user?.followers || 0}
                </>
              )}
            </div>
            <div className="text-sm text-muted-foreground">Followers</div>
          </div>
        </div>

        {/* GitHub Profile Link */}
        <a
          href={user?.html_url || 'https://github.com/negoro26'}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          View GitHub Profile →
        </a>
      </div>

      {/* Tech Stack */}
      <div className="glass-card p-6 lg:col-span-2 group hover:scale-[1.02] transition-transform duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Tech Stack</h3>
        </div>
        
        <div className="space-y-3">
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{skill.name}</span>
                <span className="text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-purple-400 rounded-full transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="glass-card p-6 group hover:scale-[1.02] transition-transform duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Briefcase className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Services</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {services.map((service) => (
            <div
              key={service.label}
              className="p-3 rounded-lg bg-secondary/50 text-center hover:bg-primary/10 transition-colors"
            >
              <service.icon className="h-5 w-5 mx-auto mb-2 text-primary" />
              <span className="text-xs text-muted-foreground">{service.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="glass-card p-6 group hover:scale-[1.02] transition-transform duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Trophy className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Achievements</h3>
        </div>
        
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            Open Source Contributor
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            5+ Years Experience
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Full-Stack Certified
          </li>
        </ul>
      </div>
    </div>
  );
}
