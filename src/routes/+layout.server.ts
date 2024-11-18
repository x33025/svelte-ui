import { supabase } from '$lib/local/server/supabase.js';

export const load = async () => {

  const { data: components, error: componentsError } = await supabase.from('components').select('*');
  const { data: categories, error: categoriesError } = await supabase.from('categories').select('*');
  const { data: posts, error: postsError } = await supabase.from('posts').select('*');

  
    if (componentsError || categoriesError || postsError) {
    console.error('Error fetching components:', componentsError?.message || categoriesError?.message || postsError?.message);
    return { error: componentsError?.message || categoriesError?.message || postsError?.message, components: [], categories: [], posts: [] };
  }


  return { components, categories, posts };
};
