import { useEffect, useCallback } from "react";

/**
 * Custom hook to handle emitting and listening to custom events
 * @param {string} eventName - Name of the custom event
 * @param {function} eventHandler - Callback function to handle the event when it is triggered
 */
function useCustomEvent(eventName, eventHandler) {
  // Function to dispatch (emit) the custom event
  const emitEvent = useCallback(
    (detail = {}) => {
      const event = new CustomEvent(eventName, { detail });
      window.dispatchEvent(event);
    },
    [eventName],
  );

  useEffect(() => {
    // Attach the event listener when the component mounts
    if (eventHandler) {
      window.addEventListener(eventName, eventHandler);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (eventHandler) {
        window.removeEventListener(eventName, eventHandler);
      }
    };
  }, [eventName, eventHandler]);

  return emitEvent;
}

export default useCustomEvent;
