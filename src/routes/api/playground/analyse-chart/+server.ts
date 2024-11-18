import type { RequestHandler } from "@sveltejs/kit";
import { json, error } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export const POST: RequestHandler = async ({ request }) => {
    // Extract description and date from the request body
    const { data, date } = await request.json();

    if (!data || !date) {
        return error(400, "Data and date are required");
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant that analyses charts." },
                { role: "user", content: `Write a technical analysis report for the chart with data: "${data}". Today's Date: "${date}". What is the trend of the chart?` }
            ],
        });

        return json({ message: response.choices[0].message.content });
    } catch (err) {
        if (err instanceof Error) {
            return error(500, `Failed to analyse chart: ${err.message}`);
        }
        return error(500, "Failed to analyse chart");
    }
};
