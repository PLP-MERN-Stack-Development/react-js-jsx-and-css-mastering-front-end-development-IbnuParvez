import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Layout component that incorporates Navbar and Footer
 * @param {Object} props - Component props
 * @param {Object} props.navbarProps - Props to pass to Navbar
 * @param {Object} props.footerProps - Props to pass to Footer
 * @param {React.ReactNode} props.children - Main content
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} - Layout component
 */
const Layout = ({ navbarProps, footerProps, children, className = '', ...rest }) => {
  return (
    <div className={`min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ${className}`} {...rest}>
      <Navbar {...navbarProps} />
      <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
      <Footer {...footerProps} />
    </div>
  );
};

Layout.propTypes = {
  navbarProps: PropTypes.object,
  footerProps: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Layout;