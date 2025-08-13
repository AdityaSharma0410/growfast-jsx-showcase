import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBar } from './SearchBar';
import { DarkModeToggle } from './DarkModeToggle';
import growFastLogo from '@/assets/growfast-logo.png';

interface NavbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export const Navbar = ({ searchValue, onSearchChange }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'About', path: '/about' },
    { name: 'Explore', path: '/explore' },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${isScrolled ? 'glass backdrop-blur-xl border-b border-glass-border' : 'bg-transparent'}
    `}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src={growFastLogo} 
              alt="GrowFast Logo" 
              className="h-8 w-auto transition-transform duration-200 group-hover:scale-105"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              GrowFast
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  relative px-3 py-2 text-sm font-medium transition-all duration-200
                  ${isActivePath(item.path) 
                    ? 'text-primary' 
                    : 'text-foreground hover:text-primary'
                  }
                  after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 
                  after:bg-gradient-to-r after:from-primary after:to-secondary
                  after:transform after:scale-x-0 after:transition-transform after:duration-200
                  ${isActivePath(item.path) ? 'after:scale-x-100' : 'hover:after:scale-x-100'}
                `}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchBar
              value={searchValue}
              onChange={onSearchChange}
              placeholder="Search courses..."
            />
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden glass border-glass-border"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`
          lg:hidden transition-all duration-300 overflow-hidden
          ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="glass rounded-2xl border-glass-border p-6 mt-4 space-y-4">
            {/* Mobile Search */}
            <div className="md:hidden">
              <SearchBar
                value={searchValue}
                onChange={onSearchChange}
                placeholder="Search courses..."
              />
            </div>
            
            {/* Mobile Navigation */}
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActivePath(item.path)
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-foreground hover:bg-muted/50'
                    }
                  `}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};