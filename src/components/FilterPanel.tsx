import { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

export interface Filters {
  categories: string[];
  priceRange: [number, number];
  minRating: number;
}

interface FilterPanelProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

const categories = [
  'Programming',
  'Design',
  'Marketing',
  'Business',
  'Creative',
  'Health',
  'Personal Development'
];

export const FilterPanel = ({ 
  filters, 
  onFiltersChange, 
  isOpen, 
  onToggle,
  className = "" 
}: FilterPanelProps) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    rating: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    
    onFiltersChange({
      ...filters,
      categories: newCategories
    });
  };

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: [value[0], value[1]]
    });
  };

  const handleRatingChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      minRating: value[0]
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      priceRange: [0, 200],
      minRating: 0
    });
  };

  const activeFilterCount = filters.categories.length + 
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 200 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0);

  const FilterSection = ({ 
    title, 
    isExpanded, 
    onToggle, 
    children 
  }: { 
    title: string; 
    isExpanded: boolean; 
    onToggle: () => void; 
    children: React.ReactNode; 
  }) => (
    <div className="border-b border-glass-border pb-6 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left mb-4 group"
      >
        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      
      <div className={`
        transition-all duration-300 overflow-hidden
        ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
      `}>
        {children}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button
          onClick={onToggle}
          variant="outline"
          className="w-full glass border-glass-border justify-between"
        >
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2 text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </div>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      {/* Filter Panel */}
      <div className={`
        ${className}
        lg:block transition-all duration-300
        ${isOpen ? 'block' : 'hidden lg:block'}
      `}>
        <div className="glass-card border border-card-border">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">Filters</h2>
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </div>
            
            {activeFilterCount > 0 && (
              <Button
                onClick={clearAllFilters}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>

          <div className="space-y-6">
            {/* Categories */}
            <FilterSection
              title="Categories"
              isExpanded={expandedSections.category}
              onToggle={() => toggleSection('category')}
            >
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-3">
                    <Checkbox
                      id={category}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={(checked) => 
                        handleCategoryChange(category, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={category}
                      className="text-sm text-foreground cursor-pointer hover:text-primary transition-colors"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </FilterSection>

            {/* Price Range */}
            <FilterSection
              title="Price Range"
              isExpanded={expandedSections.price}
              onToggle={() => toggleSection('price')}
            >
              <div className="space-y-4">
                <Slider
                  value={filters.priceRange}
                  onValueChange={handlePriceChange}
                  max={200}
                  min={0}
                  step={5}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
            </FilterSection>

            {/* Rating */}
            <FilterSection
              title="Minimum Rating"
              isExpanded={expandedSections.rating}
              onToggle={() => toggleSection('rating')}
            >
              <div className="space-y-4">
                <Slider
                  value={[filters.minRating]}
                  onValueChange={handleRatingChange}
                  max={5}
                  min={0}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Any Rating</span>
                  <span>{filters.minRating}+ stars</span>
                </div>
              </div>
            </FilterSection>
          </div>
        </div>
      </div>
    </>
  );
};