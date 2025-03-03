import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark, Share } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

type IdeaCardProps = {
  idea: string;
  tag: string;
  isLoading?: boolean;
  onSave?: () => void;
};

const IdeaCard = ({
  idea,
  tag,
  isLoading = false,
  onSave
}: IdeaCardProps) => {
  const [saved, setSaved] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    // Add entrance animation
    const timer = setTimeout(() => {
      setShowCard(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleSave = () => {
    setSaved(!saved);
    if (onSave) onSave();

    toast({
      title: saved ? "Idea removed from favorites" : "Idea saved to favorites",
      description: saved ? "The idea has been removed from your collection." : "You can find this in your saved ideas.",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this idea from GiveMeWhat',
        text: `${tag}: ${idea}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${tag}: ${idea}`);
      toast({
        title: "Copied to clipboard",
        description: "The idea has been copied to your clipboard."
      });
    }
  };

  if (isLoading) {
    return (
      <div className="idea-card animate-pulse min-h-[200px] w-full max-w-2xl mx-auto">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
        <div className="flex justify-end mt-6 space-x-2">
          <div className="h-10 bg-gray-200 rounded w-10"></div>
          <div className="h-10 bg-gray-200 rounded w-10"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "idea-card w-full max-w-2xl mx-auto",
        "transform transition-all duration-500 ease-out",
        showCard ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-secondary mb-4">
        {tag}
      </span>
      <p className="text-base sm:text-lg leading-relaxed">{idea}</p>
      <div className="flex justify-end mt-6 space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={handleSave}
        >
          <Bookmark
            className={cn("h-4 w-4", saved ? "fill-primary" : "")}
          />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={handleShare}
        >
          <Share className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default IdeaCard;
