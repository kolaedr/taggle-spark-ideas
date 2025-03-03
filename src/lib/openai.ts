import supabase from './supabase';

type GenerateIdeaResponse = {
  content: string;
  idea: {
    id: string;
    content: string;
    tag: string;
    language: string;
    created_at: string;
    user_id?: string;
  };
};

const generateIdea = async (
  tag: string, 
  language: string = 'en',
  userId?: string
): Promise<GenerateIdeaResponse> => {
  try {
    // Call our secure edge function instead of directly calling OpenAI
    const { data, error } = await supabase.functions.invoke('generate-idea', {
      body: { tag, language, user_id: userId }
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error generating idea:', error);
    throw error;
  }
};

export { generateIdea };
