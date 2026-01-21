import React, { createContext, useContext } from 'react';

// Available breakpoints
export const BREAKPOINTS = ['mobile', 'tablet', 'desktop'];

// Context for current breakpoint
export const BreakpointContext = createContext('mobile');

// Hook to use breakpoint
export const useBreakpoint = () => useContext(BreakpointContext);

// Helper: Get value for current breakpoint (with fallback)
export const getResponsiveValue = (prop, breakpoint) => {
  if (prop === null || prop === undefined) return undefined;
  
  // If prop is not an object with breakpoint keys, return as-is (legacy support)
  if (typeof prop !== 'object' || Array.isArray(prop)) {
    return prop;
  }
  
  // Check if it's a responsive object
  const hasBreakpointKeys = BREAKPOINTS.some(bp => prop.hasOwnProperty(bp));
  if (!hasBreakpointKeys) {
    return prop; // Regular object (like margin array stored as object)
  }
  
  // Return value for current breakpoint, fallback to mobile, then first available
  return prop[breakpoint] ?? prop.mobile ?? Object.values(prop)[0];
};

// Helper: Create responsive prop object
export const createResponsiveProp = (value) => ({
  mobile: value,
  tablet: value,
  desktop: value,
});

// Helper: Set value for specific breakpoint
export const setResponsiveValue = (currentProp, breakpoint, newValue) => {
  // If current prop is not responsive yet, convert it
  if (typeof currentProp !== 'object' || Array.isArray(currentProp)) {
    return {
      mobile: breakpoint === 'mobile' ? newValue : currentProp,
      tablet: breakpoint === 'tablet' ? newValue : currentProp,
      desktop: breakpoint === 'desktop' ? newValue : currentProp,
    };
  }
  
  // Check if it's a responsive object
  const hasBreakpointKeys = BREAKPOINTS.some(bp => currentProp.hasOwnProperty(bp));
  if (!hasBreakpointKeys) {
    // Not a responsive object, convert it
    return {
      mobile: breakpoint === 'mobile' ? newValue : currentProp,
      tablet: breakpoint === 'tablet' ? newValue : currentProp,
      desktop: breakpoint === 'desktop' ? newValue : currentProp,
    };
  }
  
  // Update the specific breakpoint
  return {
    ...currentProp,
    [breakpoint]: newValue,
  };
};

// Helper: Check if a prop is responsive
export const isResponsiveProp = (prop) => {
  if (typeof prop !== 'object' || Array.isArray(prop) || prop === null) {
    return false;
  }
  return BREAKPOINTS.some(bp => prop.hasOwnProperty(bp));
};
