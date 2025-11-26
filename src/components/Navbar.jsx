import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Navbar component for navigation
 * @param {Object} props - Component props
 * @param {string} props.brand - Brand name or logo
 * @param {Array} props.links - Array of link objects { label, href }
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} - Navbar component
 */
const Navbar = ({ brand, links = [], className = '', ...rest }) => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`bg-blue-600 dark:bg-blue-800 text-white p-4 shadow-lg transition-all duration-300 ${className}`} {...rest}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl sm:text-2xl font-bold transition-transform duration-200 hover:scale-105">{brand}</div>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-6">
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.href} className="hover:underline transition-all duration-200 hover:text-blue-200 transform hover:scale-110">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Theme toggle and mobile menu button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-blue-700 dark:bg-blue-900 hover:bg-blue-800 dark:hover:bg-blue-700 transition-all duration-200 transform hover:scale-110"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-blue-500 pt-4 animate-fade-in">
          <ul className="flex flex-col space-y-2">
            {links.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="block py-2 px-4 hover:bg-blue-700 rounded transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  brand: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ),
  className: PropTypes.string,
};

export default Navbar;