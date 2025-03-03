import { useState, useEffect } from 'react';
import supabase from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { generateIdea } from '@/lib/openai';
import { useToast } from '@/hooks/use-toast';

export type Idea = {
  id?: string;
  content: string;
  tag: string;
  created_at?: string;
  user_id?: string;
};

export const useIdeas = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [savedIdeas, setSavedIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIdea, setCurrentIdea] = useState<Idea | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch saved ideas when user changes
  useEffect(() => {
    if (user) {
      fetchSavedIdeas();
    } else {
      setSavedIdeas([]);
    }
  }, [user]);

  // Fetch saved ideas from Supabase
  const fetchSavedIdeas = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('ideas')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setSavedIdeas(data || []);
    } catch (error) {
      console.error('Error fetching saved ideas:', error);
      toast({
        title: "Failed to load saved ideas",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  // Generate a new idea based on tag
  const generateNewIdea = async (tag: string) => {
    setIsLoading(true);
    try {
      const content = await generateIdea(tag);
      const newIdea: Idea = { content, tag };
      setCurrentIdea(newIdea);
      setIdeas([newIdea, ...ideas]);
    } catch (error) {
      console.error('Error generating idea:', error);
      toast({
        title: "Failed to generate idea",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Save an idea to Supabase
  const saveIdea = async (idea: Idea) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save ideas",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('ideas')
        .insert([{ ...idea, user_id: user.id }])
        .select();
        
      if (error) throw error;
      
      if (data && data[0]) {
        setSavedIdeas([data[0], ...savedIdeas]);
        toast({
          title: "Idea saved",
          description: "The idea has been added to your collection",
        });
      }
    } catch (error) {
      console.error('Error saving idea:', error);
      toast({
        title: "Failed to save idea",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  // Delete a saved idea
  const deleteIdea = async (ideaId: string) => {
    try {
      const { error } = await supabase
        .from('ideas')
        .delete()
        .eq('id', ideaId);
        
      if (error) throw error;
      
      setSavedIdeas(savedIdeas.filter(idea => idea.id !== ideaId));
      toast({
        title: "Idea deleted",
        description: "The idea has been removed from your collection",
      });
    } catch (error) {
      console.error('Error deleting idea:', error);
      toast({
        title: "Failed to delete idea",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return {
    ideas,
    savedIdeas,
    currentIdea,
    isLoading,
    generateNewIdea,
    saveIdea,
    deleteIdea,
    fetchSavedIdeas,
  };
};
