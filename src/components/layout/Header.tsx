import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dumbbell, Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useFitnessApp } from '../../context/FitnessAppContext';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { resetForm, formSubmitted } = useFitnessApp();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const handleLogoClick = () => {
    if (formSubmitted) {
      resetForm();
    }
    navigate('/');
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'pt' : 'en';
    i18n.changeLanguage(newLang);
  };

  // Don't show header on landing page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div 
            onClick={handleLogoClick}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80"
          >
            <Dumbbell className="h-8 w-8 text-green-500" strokeWidth={2} />
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">FitPlanner</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle language"
            >
              <Globe className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label={t(`header.theme.${theme === 'light' ? 'dark' : 'light'}`)}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-700" />
              ) : (
                <Sun className="h-5 w-5 text-yellow-300" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header