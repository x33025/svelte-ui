import { supabase } from '$site/server/supabase.js';
import { json } from '@sveltejs/kit';

export const GET = async () => {


  const { data, error } = await supabase.from('components').select('*');

  if (error) {
    return json({ error: error.message }, { status: 500 });
  }

  console.log(data);

  return json(data);
};
