import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserCircle, Menu, X, LogOut, LogIn, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '../hooks/useIsMobile';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';

type NavbarProps = {
  user?: any;
  onLogin?: () => void;
  onLogout?: () => void;
};

const Navbar = ({ user, onLogin, onLogout }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

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
          <div className="grid place-content-center size-8 bg-yellow-500 mr-2 rounded">
            <Lightbulb className=" size-6 text-white" />
          </div>
          <p className="border-b-2 border-yellow-500">Give Me Something</p>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              {t('common.home')}
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              {t('common.about')}
            </Link>
            <Link to="/saved" className="text-sm font-medium hover:text-primary transition-colors">
              {t('common.saved')}
            </Link>
            <LanguageSelector
              currentLanguage={language}
              onLanguageChange={(lang) => {
                // Language change will be handled by the context
                setLanguage(lang);
                window.location.reload();
              }}
            />
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="text-sm font-medium hover:text-primary transition-colors flex items-center"
                >
                  <UserCircle className="h-4 w-4 mr-1" />
                  {t('common.profile')}
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  {t('common.logout')}
                </Button>
              </div>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={onLogin}
              >
                <LogIn className="h-4 w-4 mr-1" />
                {t('common.login')}
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
            "fixed inset-x-0 top-[57px] z-50 bg-background/95 backdrop-blur-lg border-b border-border",
            "transition-all duration-300 ease-in-out",
            isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
          )}
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              to="/"
              className="px-4 py-2 hover:bg-secondary rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('common.home')}
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 hover:bg-secondary rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('common.about')}
            </Link>
            <Link
              to="/saved"
              className="px-4 py-2 hover:bg-secondary rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('common.saved')}
            </Link>
            <div className="px-4 py-2">
              <LanguageSelector
                currentLanguage={language}
                onLanguageChange={(lang) => {
                  setLanguage(lang);
                  // Language change will be handled by the context
                  window.location.reload();
                }}
              />
            </div>

            {user ? (
              <div className="border-t border-border pt-4 flex flex-col space-y-4">
                <Link
                  to="/profile"
                  className="px-4 py-2 hover:bg-secondary rounded-md transition-colors flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <UserCircle className="h-4 w-4 mr-2" />
                  <span>{t('common.profile')}</span>
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
                  <span>{t('common.logout')}</span>
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
                <LogIn className="h-4 w-4 mr-2" />
                <span>{t('common.login')}</span>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
