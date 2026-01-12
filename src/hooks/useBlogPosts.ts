import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { BlogPost } from '@/types';

export function useBlogPosts(tag?: string) {
  return useQuery({
    queryKey: ['blog-posts', tag],
    queryFn: async () => {
      let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (tag) {
        query = query.contains('tags', [tag]);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as BlogPost[];
    },
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      if (error) throw error;
      return data as BlogPost | null;
    },
    enabled: !!slug,
  });
}

export function useMyBlogPosts() {
  return useQuery({
    queryKey: ['my-blog-posts'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('author_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as BlogPost[];
    },
  });
}

export function useCreateBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'reading_time' | 'author_id'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('blog_posts')
        .insert({
          ...post,
          author_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data as BlogPost;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['my-blog-posts'] });
    },
  });
}

export function useUpdateBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...post }: Partial<BlogPost> & { id: string }) => {
      const { data, error } = await supabase
        .from('blog_posts')
        .update(post)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as BlogPost;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['my-blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blog-post', data.slug] });
    },
  });
}

export function useDeleteBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['my-blog-posts'] });
    },
  });
}

export function useAllTags() {
  return useQuery({
    queryKey: ['all-tags'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('tags')
        .eq('published', true);

      if (error) throw error;

      const tagCounts: Record<string, number> = {};
      data.forEach((post) => {
        (post.tags || []).forEach((tag: string) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      });

      return Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([tag, count]) => ({ tag, count }));
    },
  });
}
