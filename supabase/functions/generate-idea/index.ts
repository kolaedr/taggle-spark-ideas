import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

const openaiApiKey = Deno.env.get("OPENAI_API_KEY") || "";

async function generateIdeaWithOpenAI(tag: string, language: string = 'en') {
  const prompt = `Generate a creative and original ${tag} idea. Be specific, engaging, and concise (50-100 words). Generate the response in ${language} language.`;
  
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiApiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a creative assistant that generates original ideas. Always respond in the specified language."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 150,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || "Failed to generate idea");
  }

  const data = await response.json();
  return data.choices[0]?.message?.content?.trim() || "No idea generated";
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get the request body and extract the tag and language
    const { tag, language } = await req.json();
    
    if (!tag) {
      return new Response(
        JSON.stringify({ error: "Tag is required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Call OpenAI to generate the idea with the specified language
    const content = await generateIdeaWithOpenAI(tag, language);
    
    // Return the generated idea
    return new Response(
      JSON.stringify({ content }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
