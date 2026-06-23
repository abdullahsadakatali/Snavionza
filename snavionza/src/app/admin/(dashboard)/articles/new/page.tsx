import { createClient } from '@/lib/supabase/server';
import { Category } from '@/lib/types';
import ArticleForm from '@/components/admin/ArticleForm';

async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data } = await supabase.from('categories').select('*').order('name');
  return (data as Category[]) || [];
}

export default async function NewArticlePage() {
  const categories = await getCategories();

  return (
    <div>
      <ArticleForm categories={categories} mode="create" />
    </div>
  );
}
