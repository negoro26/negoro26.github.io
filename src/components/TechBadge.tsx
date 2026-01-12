import { cn } from '@/lib/utils';
import type { LanguageBadgeColor } from '@/types';

interface TechBadgeProps {
  language: string;
  className?: string;
}

function getLanguageColor(language: string): LanguageBadgeColor {
  const normalizedLang = language.toLowerCase();
  
  const colorMap: Record<string, LanguageBadgeColor> = {
    'react': 'react',
    'typescript': 'typescript',
    'tsx': 'typescript',
    'javascript': 'javascript',
    'js': 'javascript',
    'jsx': 'javascript',
    'python': 'python',
    'py': 'python',
    'rust': 'rust',
    'go': 'go',
    'golang': 'go',
    'html': 'html',
    'css': 'css',
    'scss': 'css',
    'sass': 'css',
    'vue': 'vue',
    'shell': 'shell',
    'bash': 'shell',
    'sh': 'shell',
  };

  return colorMap[normalizedLang] || 'default';
}

export function TechBadge({ language, className }: TechBadgeProps) {
  const color = getLanguageColor(language);

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        `badge-${color}`,
        className
      )}
    >
      {language}
    </span>
  );
}
