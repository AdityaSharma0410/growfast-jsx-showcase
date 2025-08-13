import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Trophy, Star, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/CourseCard';
import coursesData from '@/data/courses.json';

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);

  useEffect(() => {
    // Get top 6 highest rated courses
    const topCourses = coursesData
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
    setFeaturedCourses(topCourses);
  }, []);

  const stats = [
    { icon: BookOpen, label: 'Courses', value: '25+' },
    { icon: Users, label: 'Students', value: '50K+' },
    { icon: Trophy, label: 'Certificates', value: '100K+' },
    { icon: Star, label: 'Rating', value: '4.8' },
  ];

  const categories = [
    { name: 'Programming', count: '8 courses', color: 'from-blue-500 to-cyan-500' },
    { name: 'Design', count: '5 courses', color: 'from-purple-500 to-pink-500' },
    { name: 'Marketing', count: '4 courses', color: 'from-green-500 to-emerald-500' },
    { name: 'Business', count: '3 courses', color: 'from-orange-500 to-red-500' },
    { name: 'Creative', count: '4 courses', color: 'from-indigo-500 to-purple-500' },
    { name: 'Health', count: '2 courses', color: 'from-pink-500 to-rose-500' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 video-overlay"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="space-y-8">
            <h1 className="text-reveal text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Master New Skills
              <span className="block bg-gradient-to-r from-primary-glow to-secondary bg-clip-text text-transparent">
                Accelerate Growth
              </span>
            </h1>
            
            <p className="text-reveal text-reveal-delay text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Unlock your potential with expert-led courses. Join thousands of learners 
              mastering programming, design, marketing, and more.
            </p>

            <div className="text-reveal text-reveal-delay flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild
                size="lg"
                className="gradient-primary text-white font-semibold px-8 py-4 text-lg border-0 hover:shadow-glow hover:scale-105 transition-all duration-300"
              >
                <Link to="/courses" className="flex items-center space-x-2">
                  <span>Explore Courses</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                asChild
                className="glass border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg"
              >
                <Link to="/about" className="flex items-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>Watch Demo</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="glass-card border border-card-border text-center group-hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 gradient-primary rounded-2xl flex items-center justify-center">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-2">{stat.value}</h3>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Explore by Category
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover courses across various domains and find the perfect learning path for your goals.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/categories/${category.name.toLowerCase()}`}
                className="group"
              >
                <div className="glass-card border border-card-border text-center hover-lift">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{category.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Featured Courses
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked courses from our top-rated instructors to jumpstart your learning journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="text-center">
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="glass border-glass-border hover:bg-primary/10"
            >
              <Link to="/courses" className="flex items-center space-x-2">
                <span>View All Courses</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 gradient-primary opacity-10"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card border border-card-border max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students already learning on GrowFast. 
              Access expert instructors, interactive content, and certificates.
            </p>
            <Button 
              asChild
              size="lg"
              className="gradient-primary text-white font-semibold px-8 py-4 text-lg border-0 hover:shadow-glow hover:scale-105 transition-all duration-300"
            >
              <Link to="/courses">
                Get Started Today
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;