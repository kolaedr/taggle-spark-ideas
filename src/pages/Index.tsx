
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useIdeas } from '@/hooks/useIdeas';
import Navbar from '@/components/Navbar';
import CloudTag from '@/components/CloudTag';
import IdeaCard from '@/components/IdeaCard';
import AuthModal from '@/components/AuthModal';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

// Tag data with colors
const TAGS = [
  { text: 'Joke', color: 'blue' as const },
  { text: 'Recipe', color: 'green' as const },
  { text: 'Startup', color: 'purple' as const },
  { text: 'Story', color: 'orange' as const },
  { text: 'Poem', color: 'pink' as const },
  { text: 'Art', color: 'blue' as const },
  { text: 'App', color: 'green' as const },
  { text: 'Game', color: 'purple' as const },
  { text: 'Movie', color: 'orange' as const },
  { text: 'Book', color: 'pink' as const },
  { text: 'Song', color: 'blue' as const },
  { text: 'Exercise', color: 'green' as const },
  { text: 'News', color: 'purple' as const },
  { text: 'Idea', color: 'orange' as const },
];

const Index = () => {
  const { user, signIn, signUp, signOut } = useAuth();
  const { generateNewIdea, currentIdea, isLoading, saveIdea } = useIdeas();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');
  
  // Handle tag click
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    generateNewIdea(tag);
  };

  // Handle saving the current idea
  const handleSaveIdea = () => {
    if (currentIdea) {
      saveIdea(currentIdea);
    }
  };

  // Handle login request
  const handleLoginRequest = () => {
    setIsAuthModalOpen(true);
  };

  // Handle login
  const handleLogin = async (email: string, password: string) => {
    await signIn(email, password);
  };

  // Handle signup
  const handleSignup = async (email: string, password: string) => {
    await signUp(email, password);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        user={user} 
        onLogin={handleLoginRequest} 
        onLogout={signOut} 
      />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Hero section */}
          <section className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fadeIn">
              What will you <span className="text-primary">create</span> today?
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Select a tag below and let AI generate creative ideas for you. Click on different tags to explore endless possibilities.
            </p>
          </section>
          
          {/* Cloud tags */}
          <section className="mb-16">
            <div className="tag-container">
              {TAGS.map((tag, index) => (
                <CloudTag 
                  key={tag.text}
                  tag={tag.text}
                  color={tag.color}
                  delay={index * 100}
                  onClick={() => handleTagClick(tag.text)}
                />
              ))}
            </div>
          </section>
          
          {/* Idea display section */}
          <section>
            {selectedTag ? (
              <>
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center space-x-3">
                    <h2 className="text-2xl font-medium">
                      Your {selectedTag} Idea
                    </h2>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full"
                      onClick={() => handleTagClick(selectedTag)}
                      disabled={isLoading}
                    >
                      <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    </Button>
                  </div>
                  <p className="text-muted-foreground mt-2">
                    Click refresh for a new idea or try another tag
                  </p>
                </div>
                
                <IdeaCard 
                  idea={currentIdea?.content || ''}
                  tag={selectedTag}
                  isLoading={isLoading}
                  onSave={handleSaveIdea}
                />
              </>
            ) : (
              <div className="text-center p-12 bg-secondary/50 rounded-2xl max-w-2xl mx-auto">
                <h2 className="text-xl font-medium mb-2">Select a tag to get started</h2>
                <p className="text-muted-foreground">
                  Click on any tag above to generate a creative idea
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
      
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} GiveMeWhat. All rights reserved.
        </div>
      </footer>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    </div>
  );
};

export default Index;
