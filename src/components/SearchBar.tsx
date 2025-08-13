import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Search courses or instructors...",
  className = ""
}: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className={`relative group ${className}`}>
      <div className={`
        relative flex items-center glass rounded-full border-glass-border
        transition-all duration-300 
        ${isFocused ? 'shadow-glow scale-[1.02]' : 'hover:shadow-md'}
      `}>
        <Search className="absolute left-4 h-4 w-4 text-muted-foreground transition-colors duration-200 group-hover:text-primary" />
        
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="
            w-full pl-11 pr-12 py-3 
            bg-transparent border-0 rounded-full
            text-sm placeholder:text-muted-foreground
            focus:outline-none focus:ring-0
            transition-all duration-200
          "
        />
        
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-2 h-8 w-8 rounded-full hover:bg-muted/50 transition-colors duration-200"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};