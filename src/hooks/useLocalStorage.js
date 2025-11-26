import { useState, useEffect } from 'react';

/**
 * Custom hook for managing localStorage persistence
 * @param {string} key - The localStorage key
 * @param {*} initialValue - The initial value if not found in localStorage
 * @returns {[any, function]} - [current value, setter function]
 */
const useLocalStorage = (key, initialValue) => {
  // Initialize state from localStorage or with initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;