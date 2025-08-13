import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import growFastLogo from '@/assets/growfast-logo.png';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Courses', path: '/courses' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const categories = [
    { name: 'Programming', path: '/categories/programming' },
    { name: 'Design', path: '/categories/design' },
    { name: 'Marketing', path: '/categories/marketing' },
    { name: 'Business', path: '/categories/business' },
  ];

  const socialLinks = [
    { Icon: Facebook, href: '#', label: 'Facebook' },
    { Icon: Twitter, href: '#', label: 'Twitter' },
    { Icon: Instagram, href: '#', label: 'Instagram' },
    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative mt-20">
      {/* Background with gradient */}
      <div className="absolute inset-0 gradient-primary opacity-5"></div>
      
      <div className="relative glass border-t border-glass-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Brand Section */}
            <div className="space-y-6">
              <Link to="/" className="flex items-center space-x-3 group">
                <img 
                  src={growFastLogo} 
                  alt="GrowFast Logo" 
                  className="h-10 w-auto transition-transform duration-200 group-hover:scale-105"
                />
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  GrowFast
                </span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Unlock your potential with expert-led courses. Master new skills and accelerate your career with our comprehensive learning platform.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="
                      w-10 h-10 rounded-full glass border-glass-border
                      flex items-center justify-center
                      text-muted-foreground hover:text-primary
                      transition-all duration-200 hover:scale-110 hover:shadow-glow
                    "
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-foreground">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="
                        text-muted-foreground hover:text-primary
                        transition-colors duration-200 text-sm
                        hover:translate-x-1 transform transition-transform
                        block
                      "
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-foreground">Categories</h3>
              <ul className="space-y-3">
                {categories.map((category) => (
                  <li key={category.path}>
                    <Link
                      to={category.path}
                      className="
                        text-muted-foreground hover:text-primary
                        transition-colors duration-200 text-sm
                        hover:translate-x-1 transform transition-transform
                        block
                      "
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-foreground">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">support@growfast.com</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">
                    123 Learning Street<br />
                    Education City, EC 12345
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-glass-border mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-muted-foreground text-sm">
                © {currentYear} GrowFast. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <Link 
                  to="/privacy" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
                <Link 
                  to="/terms" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Terms of Service
                </Link>
                <Link 
                  to="/cookies" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};