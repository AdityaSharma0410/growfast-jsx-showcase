import { useState, useEffect, useMemo } from 'react';
import { Grid, List, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/CourseCard';
import { FilterPanel, type Filters } from '@/components/FilterPanel';
import { PaginationControls } from '@/components/PaginationControls';
import { Badge } from '@/components/ui/badge';
import coursesData from '@/data/courses.json';

const Courses = () => {
  const [courses] = useState(coursesData);
  const [filteredCourses, setFilteredCourses] = useState(coursesData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'students' | 'title'>('rating');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    priceRange: [0, 200],
    minRating: 0,
  });

  // Filter and sort courses
  const processedCourses = useMemo(() => {
    let filtered = courses.filter(course => {
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(course.category)) {
        return false;
      }
      
      // Price range filter
      if (course.price < filters.priceRange[0] || course.price > filters.priceRange[1]) {
        return false;
      }
      
      // Rating filter
      if (course.rating < filters.minRating) {
        return false;
      }
      
      return true;
    });

    // Sort courses
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'title') {
        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [courses, filters, sortBy, sortOrder]);

  // Update filtered courses when processing changes
  useEffect(() => {
    setFilteredCourses(processedCourses);
    setCurrentPage(1); // Reset to first page when filters change
  }, [processedCourses]);

  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const shuffleCourses = () => {
    const shuffled = [...filteredCourses].sort(() => Math.random() - 0.5);
    setFilteredCourses(shuffled);
    setCurrentPage(1);
  };

  const activeFilterCount = filters.categories.length + 
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 200 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0);

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            All Courses
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover our complete collection of expert-led courses across various domains.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar - Filter Panel */}
          <aside className="lg:w-80 flex-shrink-0">
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              isOpen={isFilterPanelOpen}
              onToggle={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            
            {/* Controls Bar */}
            <div className="glass-card border border-card-border mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Results Info & Active Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    {filteredCourses.length} of {courses.length} courses
                  </span>
                  
                  {activeFilterCount > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Active filters:</span>
                      <Badge variant="secondary" className="text-xs">
                        {activeFilterCount}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* View Controls */}
                <div className="flex items-center gap-4">
                  
                  {/* Sort Controls */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Sort by:</span>
                    <select
                      value={`${sortBy}-${sortOrder}`}
                      onChange={(e) => {
                        const [field, order] = e.target.value.split('-');
                        setSortBy(field as typeof sortBy);
                        setSortOrder(order as typeof sortOrder);
                      }}
                      className="text-sm glass border border-glass-border rounded-lg px-2 py-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="rating-desc">Rating (High to Low)</option>
                      <option value="rating-asc">Rating (Low to High)</option>
                      <option value="price-asc">Price (Low to High)</option>
                      <option value="price-desc">Price (High to Low)</option>
                      <option value="students-desc">Most Popular</option>
                      <option value="title-asc">Title (A to Z)</option>
                    </select>
                  </div>

                  {/* Shuffle Button */}
                  <Button
                    onClick={shuffleCourses}
                    variant="outline"
                    size="sm"
                    className="glass border-glass-border"
                  >
                    <Shuffle className="h-4 w-4" />
                  </Button>

                  {/* View Mode Toggle */}
                  <div className="flex items-center border border-glass-border rounded-lg overflow-hidden glass">
                    <Button
                      onClick={() => setViewMode('grid')}
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      className={`rounded-none border-0 ${viewMode === 'grid' ? 'gradient-primary text-white' : ''}`}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => setViewMode('list')}
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      className={`rounded-none border-0 ${viewMode === 'list' ? 'gradient-primary text-white' : ''}`}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Courses Grid */}
            {paginatedCourses.length > 0 ? (
              <>
                <div className={`
                  grid gap-6 mb-8
                  ${viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                    : 'grid-cols-1'
                  }
                `}>
                  {paginatedCourses.map((course) => (
                    <CourseCard 
                      key={course.id} 
                      course={course}
                      className={viewMode === 'list' ? 'md:flex md:items-center md:space-x-6' : ''}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  itemsPerPage={itemsPerPage}
                  totalItems={filteredCourses.length}
                  onPageChange={handlePageChange}
                  onItemsPerPageChange={handleItemsPerPageChange}
                />
              </>
            ) : (
              /* No Results */
              <div className="glass-card border border-card-border text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 gradient-primary rounded-full flex items-center justify-center opacity-20">
                    <Grid className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    No courses found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search terms to find more courses.
                  </p>
                  <Button
                    onClick={() => setFilters({
                      categories: [],
                      priceRange: [0, 200],
                      minRating: 0,
                    })}
                    variant="outline"
                    className="glass border-glass-border"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Courses;