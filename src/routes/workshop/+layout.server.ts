import { supabase } from '$lib/local/server/supabase.js';

export const load = async () => {

  const { data, error } = await supabase
    .from('components')
    .select('code')
    .eq('name', 'dropdown-menu');

  if (error) {
    console.error(error);
    return { code: null };
  }

  const code = data.length > 0 ? data[0].code : null;
  
  return { code };
};
