
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useIdeas } from '@/hooks/useIdeas';
import Navbar from '@/components/Navbar';
import IdeaCard from '@/components/IdeaCard';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

const SavedIdeas = () => {
  const { user, signOut } = useAuth();
  const { savedIdeas, deleteIdea, fetchSavedIdeas } = useIdeas();

  useEffect(() => {
    if (user) {
      fetchSavedIdeas();
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} onLogout={signOut} />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <section className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Your Saved Ideas
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Review and manage your collection of saved ideas
            </p>
          </section>
          
          <section className="max-w-4xl mx-auto">
            {savedIdeas.length > 0 ? (
              <div className="space-y-8">
                {savedIdeas.map((idea) => (
                  <div 
                    key={idea.id} 
                    className="relative"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute -top-3 -right-3 rounded-full bg-background z-10"
                      onClick={() => idea.id && deleteIdea(idea.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                    <IdeaCard
                      idea={idea.content}
                      tag={idea.tag}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-12 bg-secondary/50 rounded-2xl">
                <h2 className="text-xl font-medium mb-2">No saved ideas yet</h2>
                <p className="text-muted-foreground mb-6">
                  Browse ideas and save your favorites to access them here
                </p>
                <Button 
                  variant="default" 
                  onClick={() => window.location.href = '/'}
                >
                  Discover Ideas
                </Button>
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
    </div>
  );
};

export default SavedIdeas;
