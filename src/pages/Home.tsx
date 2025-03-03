import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function Home() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [idea, setIdea] = useState<string | null>(null);
  const { t } = useTranslation();

  const tags = [
    'art', 'music', 'writing', 'photography', 'design',
    'technology', 'business', 'education', 'health', 'lifestyle'
  ];

  const generateIdea = async (tag: string) => {
    setSelectedTag(tag);
    // TODO: Implement AI idea generation
    setIdea('This is a placeholder idea. AI integration coming soon!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('home.title')}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {t('home.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => generateIdea(tag)}
            className={`p-4 rounded-lg text-center font-medium transition-colors ${selectedTag === tag
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {!selectedTag ? (
        <p className="text-center text-gray-600">
          {t('home.selectTag')}
        </p>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('home.yourIdea', { tag: selectedTag })}
          </h2>
          <p className="text-gray-600 mb-4">{idea}</p>
          <button
            onClick={() => generateIdea(selectedTag)}
            className="text-indigo-600 hover:text-indigo-800"
          >
            {t('home.refresh')}
          </button>
        </div>
      )}
    </div>
  );
} 
