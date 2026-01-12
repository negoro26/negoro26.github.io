import type { BlogPost } from '@/types';
import { Calendar, Clock, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPost;
  onTagClick?: (tag: string) => void;
  className?: string;
}

export function BlogCard({ post, onTagClick, className }: BlogCardProps) {
  return (
    <article
      className={cn(
        'glass-card p-6 group hover:scale-[1.01] transition-all duration-300',
        className
      )}
    >
      <div className="flex flex-wrap gap-2 mb-3">
        {post.tags?.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagClick?.(tag)}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <Tag className="h-3 w-3" />
            {tag}
          </button>
        ))}
      </div>

      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
        {post.title}
      </h3>

      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
        {post.excerpt || post.content.slice(0, 150) + '...'}
      </p>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>{format(new Date(post.created_at), 'MMM d, yyyy')}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{post.reading_time} min read</span>
        </div>
      </div>
    </article>
  );
}
