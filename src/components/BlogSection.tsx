import { useBlogPosts, useAllTags } from '@/hooks/useBlogPosts';
import { BlogCard } from './BlogCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { FileText, Tag } from 'lucide-react';

export function BlogSection() {
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
  const { data: posts, isLoading, error } = useBlogPosts(selectedTag);
  const { data: tags } = useAllTags();

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? undefined : tag);
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load blog posts.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Tag Filters */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedTag(undefined)}
            className={cn(
              'inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              !selectedTag
                ? 'bg-primary text-primary-foreground glow'
                : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
            )}
          >
            <Tag className="h-4 w-4" />
            All
          </button>
          {tags.map(({ tag, count }) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={cn(
                'inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                selectedTag === tag
                  ? 'bg-primary text-primary-foreground glow'
                  : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
              )}
            >
              {tag}
              <span className="ml-1 text-xs opacity-60">({count})</span>
            </button>
          ))}
        </div>
      )}

      {/* Blog Posts Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-card p-6">
              <div className="flex gap-2 mb-3">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <Skeleton className="h-7 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <div className="flex gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          ))}
        </div>
      ) : posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} onTagClick={handleTagClick} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No posts yet</h3>
          <p className="text-muted-foreground text-sm">
            {selectedTag 
              ? `No posts found with tag "${selectedTag}"`
              : 'Blog posts will appear here once published.'}
          </p>
        </div>
      )}
    </div>
  );
}
