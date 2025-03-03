
import { useState } from 'react';
import { cn } from '@/lib/utils';

type CloudTagProps = {
  tag: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'pink';
  onClick: () => void;
  delay?: number;
};

const CloudTag = ({ tag, color, onClick, delay = 0 }: CloudTagProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const baseClasses = cn(
    "px-4 py-2 rounded-full font-medium transition-all duration-300",
    "shadow-subtle hover:shadow-md",
    "cursor-pointer select-none",
    "animate-slideIn",
    {
      "bg-tag-blue": color === 'blue',
      "bg-tag-green": color === 'green',
      "bg-tag-purple": color === 'purple',
      "bg-tag-orange": color === 'orange',
      "bg-tag-pink": color === 'pink',
      "transform hover:scale-105": !isHovered,
      "transform scale-95": isHovered,
    }
  );

  const hoverAnimation = isHovered ? "animate-pulse" : "animate-float";
  
  return (
    <div 
      className={`${baseClasses} ${hoverAnimation}`}
      style={{ 
        animationDelay: `${delay}ms`,
        animationDuration: `${3 + Math.random() * 2}s`
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {tag}
    </div>
  );
};

export default CloudTag;
