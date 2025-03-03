
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SignIn, UserCircle, Menu, X, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

type NavbarProps = {
  user?: any;
  onLogin?: () => void;
  onLogout?: () => void;
};

const Navbar = ({ user, onLogin, onLogout }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-semibold tracking-tight flex items-center"
        >
          give<span className="text-primary font-bold">me</span>what
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/saved" className="text-sm font-medium hover:text-primary transition-colors">
              Saved Ideas
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  className="text-sm font-medium flex items-center space-x-2"
                  onClick={onLogout}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
                <Link to="/profile">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserCircle className="h-5 w-5" />
                  </div>
                </Link>
              </div>
            ) : (
              <Button 
                variant="default" 
                size="sm" 
                className="flex items-center space-x-2"
                onClick={onLogin}
              >
                <SignIn className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
            )}
          </nav>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <div 
          className={cn(
            "fixed inset-x-0 bg-background/80 backdrop-blur-lg border-b border-border",
            "transition-all duration-300 ease-in-out",
            isMenuOpen ? "top-[57px] opacity-100" : "top-[-100%] opacity-0"
          )}
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="px-4 py-2 hover:bg-secondary rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="px-4 py-2 hover:bg-secondary rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/saved" 
              className="px-4 py-2 hover:bg-secondary rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Saved Ideas
            </Link>
            
            {user ? (
              <div className="border-t border-border pt-4 flex flex-col space-y-4">
                <Link 
                  to="/profile" 
                  className="px-4 py-2 hover:bg-secondary rounded-md transition-colors flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <UserCircle className="h-4 w-4 mr-2" />
                  <span>Profile</span>
                </Link>
                <Button 
                  variant="ghost" 
                  className="justify-start"
                  onClick={() => {
                    if (onLogout) onLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <Button 
                variant="default" 
                className="mt-2"
                onClick={() => {
                  if (onLogin) onLogin();
                  setIsMenuOpen(false);
                }}
              >
                <SignIn className="h-4 w-4 mr-2" />
                <span>Sign In</span>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
