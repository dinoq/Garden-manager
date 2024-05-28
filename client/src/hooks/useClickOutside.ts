import { useEffect, useRef } from 'react';

/**
 * Custom hook to handle click outside of a specified element.
 *
 * @param {function} handler - The function to call when a click outside is detected.
 */
function useClickOutside(handler: (event: MouseEvent) => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Check if the clicked element is outside the referenced element
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handler]);

  return ref;
}

export default useClickOutside;
