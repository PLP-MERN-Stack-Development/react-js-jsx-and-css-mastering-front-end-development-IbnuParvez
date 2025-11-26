import React from 'react';
import PropTypes from 'prop-types';

/**
 * Footer component with links and copyright
 * @param {Object} props - Component props
 * @param {Array} props.links - Array of link objects { label, href }
 * @param {string} props.copyright - Copyright text
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} - Footer component
 */
const Footer = ({ links = [], copyright, className = '', ...rest }) => {
  return (
    <footer className={`bg-gray-800 dark:bg-gray-900 text-white p-4 shadow-lg transition-all duration-300 ${className}`} {...rest}>
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <ul className="flex flex-wrap justify-center sm:justify-start space-x-4 sm:space-x-6">
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.href} className="hover:underline transition-all duration-200 hover:text-gray-300 transform hover:scale-105">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        {copyright && <div className="text-sm sm:text-base transition-opacity duration-200 hover:opacity-80">{copyright}</div>}
      </div>
    </footer>
  );
};

Footer.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ),
  copyright: PropTypes.string,
  className: PropTypes.string,
};

export default Footer;