import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card component for content display
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.image - Image URL for the card
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} - Card component
 */
const Card = ({ title, children, image, className = '', ...rest }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl dark:hover:shadow-2xl hover:scale-105 ${className}`} {...rest}>
      {image && <img src={image} alt={title} className="w-full h-32 sm:h-48 object-cover transition-transform duration-300 hover:scale-110" />}
      <div className="p-3 sm:p-4">
        {title && <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h3>}
        <div className="text-gray-700 dark:text-gray-300">{children}</div>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  image: PropTypes.string,
  className: PropTypes.string,
};

export default Card;