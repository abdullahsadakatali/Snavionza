import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Post, Category } from '@/lib/types';
import ArticleForm from '@/components/admin/ArticleForm';

interface EditArticlePageProps {
  params: Promise<{ id: string }>;
}

async function getData(id: string) {
  const supabase = await createClient();
  const [postResult, catsResult] = await Promise.all([
    supabase.from('posts').select('*').eq('id', id).single(),
    supabase.from('categories').select('*').order('name'),
  ]);
  return {
    post: postResult.data as Post | null,
    categories: (catsResult.data as Category[]) || [],
  };
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const { id } = await params;
  const { post, categories } = await getData(id);

  if (!post) notFound();

  return (
    <div>
      <ArticleForm categories={categories} initialData={post} mode="edit" />
    </div>
  );
}
