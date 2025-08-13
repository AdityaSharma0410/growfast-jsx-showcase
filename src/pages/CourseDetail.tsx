import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Star, Users, Clock, Play, BookOpen, 
  Award, Globe, Smartphone, Download, Share 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CourseCard } from '@/components/CourseCard';
import coursesData from '@/data/courses.json';

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);

  useEffect(() => {
    if (id) {
      const foundCourse = coursesData.find(c => c.id === parseInt(id));
      setCourse(foundCourse);
      
      // Get related courses from same category
      if (foundCourse) {
        const related = coursesData
          .filter(c => c.category === foundCourse.category && c.id !== foundCourse.id)
          .slice(0, 3);
        setRelatedCourses(related);
      }
    }
  }, [id]);

  if (!course) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Course not found</h1>
          <Button asChild variant="outline">
            <Link to="/courses">Browse All Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatStudents = (students: number) => {
    if (students >= 1000) {
      return `${(students / 1000).toFixed(1)}k`;
    }
    return students.toString();
  };

  const courseFeatures = [
    { icon: Clock, label: course.duration, text: 'Total duration' },
    { icon: Users, label: `${formatStudents(course.students)} students`, text: 'Enrolled' },
    { icon: Award, label: 'Certificate', text: 'Upon completion' },
    { icon: Globe, label: 'Online access', text: 'Learn anywhere' },
    { icon: Smartphone, label: 'Mobile friendly', text: 'Any device' },
    { icon: Download, label: 'Resources', text: 'Downloadable' },
  ];

  const curriculum = [
    { title: 'Getting Started', lessons: 5, duration: '45 min' },
    { title: 'Core Concepts', lessons: 8, duration: '2h 15min' },
    { title: 'Practical Projects', lessons: 12, duration: '4h 30min' },
    { title: 'Advanced Techniques', lessons: 10, duration: '3h 20min' },
    { title: 'Final Project', lessons: 3, duration: '1h 30min' },
  ];

  const requirements = [
    'Basic computer skills',
    'Stable internet connection',
    'Willingness to learn and practice',
    'No prior experience required'
  ];

  const whatYouWillLearn = [
    'Master the fundamentals and advanced concepts',
    'Build real-world projects from scratch',
    'Understand best practices and industry standards',
    'Develop problem-solving skills',
    'Create a portfolio of work',
    'Prepare for career opportunities'
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="text-muted-foreground hover:text-primary mb-4">
            <Link to="/courses" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Courses</span>
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Course Header */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="glass border-glass-border">
                  {course.category}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-foreground">{course.rating}</span>
                  <span className="text-muted-foreground text-sm">
                    ({formatStudents(course.students)} students)
                  </span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                {course.title}
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {course.description}
              </p>

              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>by <strong className="text-foreground">{course.instructor}</strong></span>
                <span>•</span>
                <span>Last updated: November 2024</span>
              </div>
            </div>

            {/* Course Video */}
            <div className="glass-card border border-card-border overflow-hidden">
              <div className="aspect-video bg-muted/10 relative rounded-xl overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Button
                    size="lg"
                    className="w-20 h-20 rounded-full gradient-primary text-white border-0 hover:scale-110 transition-transform duration-300"
                  >
                    <Play className="h-8 w-8 ml-1" fill="white" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Course Features */}
            <div className="glass-card border border-card-border">
              <h3 className="text-xl font-bold text-foreground mb-6">Course Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {courseFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{feature.label}</p>
                      <p className="text-sm text-muted-foreground">{feature.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 glass border border-glass-border">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="glass-card border border-card-border">
                  <h3 className="text-xl font-bold text-foreground mb-4">What you'll learn</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {whatYouWillLearn.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card border border-card-border">
                  <h3 className="text-xl font-bold text-foreground mb-4">Requirements</h3>
                  <div className="space-y-3">
                    {requirements.map((req, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="curriculum">
                <div className="glass-card border border-card-border">
                  <h3 className="text-xl font-bold text-foreground mb-6">Course Curriculum</h3>
                  <div className="space-y-4">
                    {curriculum.map((section, index) => (
                      <div key={index} className="border border-glass-border rounded-lg p-4 hover:bg-muted/20 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-foreground">{section.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {section.lessons} lessons • {section.duration}
                            </p>
                          </div>
                          <Play className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="instructor">
                <div className="glass-card border border-card-border">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                      {course.instructor.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">{course.instructor}</h3>
                      <p className="text-muted-foreground mb-4">
                        Expert instructor with 10+ years of experience in the field. 
                        Passionate about teaching and helping students achieve their goals.
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>⭐ 4.9 instructor rating</span>
                        <span>• 25,000+ students</span>
                        <span>• 15 courses</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="glass-card border border-card-border">
                  <h3 className="text-xl font-bold text-foreground mb-6">Student Reviews</h3>
                  <div className="space-y-6">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b border-glass-border pb-6 last:border-b-0 last:pb-0">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                            S
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="font-semibold text-foreground">Student {review}</span>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-muted-foreground">
                              Excellent course! The instructor explains everything clearly and the projects are very practical. 
                              I learned so much and feel confident applying these skills.
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              {/* Purchase Card */}
              <div className="glass-card border border-card-border">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {formatPrice(course.price)}
                  </div>
                  <p className="text-muted-foreground">One-time payment</p>
                </div>

                <div className="space-y-4">
                  <Button className="w-full gradient-primary text-white font-semibold py-3 border-0 hover:shadow-glow hover:scale-[1.02] transition-all duration-300">
                    Enroll Now
                  </Button>
                  
                  <Button variant="outline" className="w-full glass border-glass-border">
                    Add to Cart
                  </Button>

                  <div className="flex items-center justify-center space-x-4 pt-4">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>

              {/* Course Includes */}
              <div className="glass-card border border-card-border">
                <h3 className="font-bold text-foreground mb-4">This course includes:</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{course.duration} on-demand video</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">15 articles</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Download className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Downloadable resources</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Certificate of completion</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Access on mobile and TV</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Courses */}
        {relatedCourses.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">More courses in {course.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCourses.map((relatedCourse) => (
                <CourseCard key={relatedCourse.id} course={relatedCourse} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;