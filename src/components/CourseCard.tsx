import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, Clock, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Course {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  instructor: string;
  description: string;
  image: string;
  videoPreview?: string;
  duration: string;
  students: number;
}

interface CourseCardProps {
  course: Course;
  className?: string;
}

export const CourseCard = ({ course, className = "" }: CourseCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

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

  return (
    <div 
      className={`group relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card */}
      <div className="
        glass-card h-full
        transition-all duration-300 ease-out
        hover-lift
        border border-card-border
      ">
        {/* Course Image */}
        <div className="relative overflow-hidden rounded-xl mb-4">
          <div className="aspect-video bg-muted/20 rounded-xl overflow-hidden">
            {!imageError ? (
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                    <Play className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-sm font-medium">{course.title}</p>
                </div>
              </div>
            )}
          </div>

          {/* Category Badge */}
          <Badge 
            variant="secondary" 
            className="absolute top-3 left-3 glass border-glass-border text-xs font-medium"
          >
            {course.category}
          </Badge>

          {/* Play Button Overlay */}
          <div className={`
            absolute inset-0 bg-black/20 rounded-xl
            flex items-center justify-center
            transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className="
              w-16 h-16 rounded-full glass border-white/20
              flex items-center justify-center
              transform transition-transform duration-300
              hover:scale-110
            ">
              <Play className="h-8 w-8 text-white ml-1" fill="white" />
            </div>
          </div>

          {/* Price Tag */}
          <div className="absolute top-3 right-3">
            <div className="glass rounded-full px-3 py-1 border-glass-border">
              <span className="text-sm font-bold text-primary">
                {formatPrice(course.price)}
              </span>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="space-y-4">
          {/* Title */}
          <Link to={`/course/${course.id}`}>
            <h3 className="
              text-lg font-bold text-foreground
              group-hover:text-primary transition-colors duration-200
              line-clamp-2 leading-tight
            ">
              {course.title}
            </h3>
          </Link>

          {/* Instructor */}
          <p className="text-sm text-muted-foreground font-medium">
            by {course.instructor}
          </p>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {course.description}
          </p>

          {/* Stats Row */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{course.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>{formatStudents(course.students)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{course.duration}</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Button 
            asChild
            className="
              w-full mt-4 gradient-primary text-white font-medium
              transform transition-all duration-200
              hover:shadow-glow hover:scale-[1.02]
              border-0
            "
          >
            <Link to={`/course/${course.id}`}>
              View Course
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};