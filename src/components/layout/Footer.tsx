import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-sm mt-auto transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center text-gray-600 dark:text-gray-300 text-sm">
          <div className="flex items-center mb-2 sm:mb-0">
            <span>© {new Date().getFullYear()} FitPlanner</span>
            <Heart className="h-4 w-4 text-red-500 mx-1" />
            <span>All rights reserved</span>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-green-500 transition-colors duration-200">Privacy</a>
            <a href="#" className="hover:text-green-500 transition-colors duration-200">Terms</a>
            <a href="#" className="hover:text-green-500 transition-colors duration-200">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;