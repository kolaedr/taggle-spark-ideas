import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useIdeas } from '@/hooks/useIdeas';
import Navbar from '@/components/Navbar';
import CloudTag from '@/components/CloudTag';
import IdeaCard from '@/components/IdeaCard';
import AuthModal from '@/components/AuthModal';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Tag data with colors
const TAGS = [
  { text: 'joke', color: 'blue' as const },
  { text: 'recipe', color: 'green' as const },
  { text: 'startup', color: 'purple' as const },
  { text: 'story', color: 'orange' as const },
  { text: 'poem', color: 'pink' as const },
  { text: 'art', color: 'blue' as const },
  { text: 'app', color: 'green' as const },
  { text: 'game', color: 'purple' as const },
  { text: 'movie', color: 'orange' as const },
  { text: 'book', color: 'pink' as const },
  { text: 'song', color: 'blue' as const },
  { text: 'exercise', color: 'green' as const },
  { text: 'news', color: 'purple' as const },
  { text: 'idea', color: 'orange' as const },
];

const Index = () => {
  const { user, signIn, signUp, signOut } = useAuth();
  const { generateNewIdea, currentIdea, isLoading, saveIdea } = useIdeas();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');
  const { t } = useTranslation();

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
              {t('home.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              {t('home.subtitle')}
            </p>
          </section>

          {/* Cloud tags */}
          <section className="mb-16">
            <div className="tag-container">
              {TAGS.map((tag, index) => (
                <CloudTag
                  key={tag.text}
                  tag={t(`tags.${tag.text}`)}
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
                      {t('home.yourIdea', { tag: t(`tags.${selectedTag}`) })}
                    </h2>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      onClick={() => handleTagClick(selectedTag)}
                      disabled={isLoading}
                      aria-label={t('home.refresh')}
                    >
                      <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    </Button>
                  </div>
                  <p className="text-muted-foreground mt-2">
                    {t('home.refreshDescription')}
                  </p>
                </div>

                <IdeaCard
                  idea={currentIdea?.content || ''}
                  tag={t(`tags.${selectedTag}`)}
                  isLoading={isLoading}
                  onSave={handleSaveIdea}
                />
              </>
            ) : (
              <div className="text-center p-12 bg-secondary/50 rounded-2xl max-w-2xl mx-auto">
                <h2 className="text-xl font-medium mb-2">{t('home.selectTag')}</h2>
                <p className="text-muted-foreground">
                  {t('home.clickTagDescription')}
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="py-6 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {t('common.appName')}. {t('common.allRightsReserved')}
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
