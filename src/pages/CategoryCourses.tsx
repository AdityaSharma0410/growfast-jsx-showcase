import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/CourseCard';
import { PaginationControls } from '@/components/PaginationControls';
import coursesData from '@/data/courses.json';

const CategoryCourses = () => {
  const { category } = useParams<{ category: string }>();
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    if (category) {
      const categoryName = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
      const filteredCourses = coursesData.filter(
        course => course.category.toLowerCase() === categoryName.toLowerCase()
      );
      setCourses(filteredCourses);
      setCurrentPage(1);
    }
  }, [category]);

  const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';
  
  // Pagination
  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = courses.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const getCategoryDescription = (cat: string) => {
    const descriptions = {
      programming: "Master coding skills with hands-on projects and expert instruction in the latest technologies.",
      design: "Create stunning visuals and user experiences with professional design principles and tools.",
      marketing: "Build your brand and reach your audience with proven marketing strategies and tactics.",
      business: "Develop entrepreneurial skills and business acumen to succeed in today's competitive market.",
      creative: "Express your creativity through various artistic mediums and innovative techniques.",
      health: "Improve your physical and mental wellbeing with evidence-based health and wellness practices.",
    };
    return descriptions[cat.toLowerCase()] || "Explore courses in this exciting category.";
  };

  const getCategoryGradient = (cat: string) => {
    const gradients = {
      programming: 'from-blue-500 to-cyan-500',
      design: 'from-purple-500 to-pink-500',
      marketing: 'from-green-500 to-emerald-500',
      business: 'from-orange-500 to-red-500',
      creative: 'from-indigo-500 to-purple-500',
      health: 'from-pink-500 to-rose-500',
    };
    return gradients[cat.toLowerCase()] || 'from-primary to-secondary';
  };

  if (!category) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Category not found</h1>
          <Button asChild variant="outline">
            <Link to="/courses">Browse All Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="text-muted-foreground hover:text-primary mb-4">
            <Link to="/courses" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to All Courses</span>
            </Link>
          </Button>
        </div>

        {/* Category Header */}
        <div className="glass-card border border-card-border mb-12 overflow-hidden">
          <div className="relative">
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(category)} opacity-10`}></div>
            
            <div className="relative p-8 md:p-12">
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getCategoryGradient(category)} flex items-center justify-center`}>
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                    {categoryName} Courses
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    {courses.length} course{courses.length !== 1 ? 's' : ''} available
                  </p>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground max-w-3xl">
                {getCategoryDescription(category)}
              </p>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        {courses.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {paginatedCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                totalItems={courses.length}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            )}
          </>
        ) : (
          /* No Courses Found */
          <div className="glass-card border border-card-border text-center py-16">
            <div className="max-w-md mx-auto">
              <div className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-br ${getCategoryGradient(category)} rounded-full flex items-center justify-center opacity-20`}>
                <BookOpen className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                No {categoryName} courses available yet
              </h3>
              <p className="text-muted-foreground mb-6">
                We're working on adding more courses in this category. 
                Check back soon or explore other categories.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline" className="glass border-glass-border">
                  <Link to="/courses">Browse All Courses</Link>
                </Button>
                <Button asChild className="gradient-primary text-white border-0">
                  <Link to="/">Back to Home</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCourses;