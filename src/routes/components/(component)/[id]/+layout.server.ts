import { supabase } from "$lib/local/server/supabase.js";

export const load = async ({ params }) => {
    const { data, error } = await supabase.from("components").select("*").eq("id", params.id);

    if (error) {
        throw new Error(`Failed to fetch data: ${error.message}`);
    }

    return {
        component: data[0]
    };
};
