
import supabase from './supabase';

const generateIdea = async (tag: string): Promise<string> => {
  try {
    // Call our secure edge function instead of directly calling OpenAI
    const { data, error } = await supabase.functions.invoke('generate-idea', {
      body: { tag }
    });

    if (error) {
      throw error;
    }

    return data.content;
  } catch (error) {
    console.error('Error generating idea:', error);
    return 'Failed to generate idea. Please try again.';
  }
};

export { generateIdea };
