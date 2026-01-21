/**
 * Page Renderer - Best Practices Implementation
 * 
 * This module renders serialized Craft.js data with responsive breakpoint support.
 * Can be used in a separate viewer/frontend repo without Craft.js dependency.
 * 
 * USAGE:
 * ```jsx
 * import { PageRenderer } from './renderer/PageRenderer';
 * 
 * // Fetch serialized data from API
 * const pageData = await fetch('/api/pages/123').then(r => r.json());
 * 
 * // Render
 * <PageRenderer data={pageData.content} />
 * ```
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

// ============================================
// BREAKPOINT CONFIGURATION
// ============================================

export const BREAKPOINTS = {
  mobile: 0,      // 0 - 767px
  tablet: 768,    // 768 - 1023px
  desktop: 1024,  // 1024px+
};

export const BREAKPOINT_ORDER = ['mobile', 'tablet', 'desktop'];

// ============================================
// BREAKPOINT CONTEXT & HOOK
// ============================================

const BreakpointContext = createContext('mobile');

/**
 * Hook to detect current viewport breakpoint
 * Automatically updates when window resizes
 */
export const useResponsiveBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState('mobile');

  useEffect(() => {
    const getBreakpoint = () => {
      const width = window.innerWidth;
      if (width >= BREAKPOINTS.desktop) return 'desktop';
      if (width >= BREAKPOINTS.tablet) return 'tablet';
      return 'mobile';
    };

    const handleResize = () => {
      setBreakpoint(getBreakpoint());
    };

    // Set initial
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
};

/**
 * Use breakpoint from context (for nested components)
 */
export const useBreakpoint = () => useContext(BreakpointContext);

// ============================================
// RESPONSIVE VALUE HELPERS
// ============================================

/**
 * Get value for current breakpoint with fallback chain
 * 
 * Fallback order: current -> mobile -> first available -> default
 * 
 * @param {any} prop - Can be: primitive, array, or responsive object {mobile, tablet, desktop}
 * @param {string} breakpoint - Current breakpoint
 * @param {any} defaultValue - Default if no value found
 */
export const getResponsiveValue = (prop, breakpoint, defaultValue = undefined) => {
  // Null/undefined check
  if (prop === null || prop === undefined) {
    return defaultValue;
  }

  // Primitive values (string, number, boolean)
  if (typeof prop !== 'object') {
    return prop;
  }

  // Arrays are not responsive objects (e.g., margin: [10, 20, 10, 20])
  if (Array.isArray(prop)) {
    return prop;
  }

  // Check if it's a responsive object
  const hasBreakpointKeys = BREAKPOINT_ORDER.some(bp => prop.hasOwnProperty(bp));
  
  if (!hasBreakpointKeys) {
    // Regular object, return as-is
    return prop;
  }

  // Responsive object - get value with fallback chain
  if (prop[breakpoint] !== undefined) {
    return prop[breakpoint];
  }
  
  // Fallback to mobile
  if (prop.mobile !== undefined) {
    return prop.mobile;
  }
  
  // Fallback to first available
  for (const bp of BREAKPOINT_ORDER) {
    if (prop[bp] !== undefined) {
      return prop[bp];
    }
  }

  return defaultValue;
};

/**
 * Convert spacing array to CSS string
 * @param {number[] | number} spacing - [top, right, bottom, left] or single number
 */
export const getSpacing = (spacing) => {
  if (Array.isArray(spacing) && spacing.length === 4) {
    return `${spacing[0]}px ${spacing[1]}px ${spacing[2]}px ${spacing[3]}px`;
  }
  if (typeof spacing === 'number') {
    return `${spacing}px`;
  }
  return '0px';
};

// ============================================
// RENDER COMPONENTS
// ============================================

// Text position options for background image mode
const TEXT_POSITIONS = {
  'top-left': { alignItems: 'flex-start', justifyContent: 'flex-start' },
  'top-center': { alignItems: 'flex-start', justifyContent: 'center' },
  'top-right': { alignItems: 'flex-start', justifyContent: 'flex-end' },
  'center-left': { alignItems: 'center', justifyContent: 'flex-start' },
  'center': { alignItems: 'center', justifyContent: 'center' },
  'center-right': { alignItems: 'center', justifyContent: 'flex-end' },
  'bottom-left': { alignItems: 'flex-end', justifyContent: 'flex-start' },
  'bottom-center': { alignItems: 'flex-end', justifyContent: 'center' },
  'bottom-right': { alignItems: 'flex-end', justifyContent: 'flex-end' },
};

/**
 * Text Renderer
 */
const TextRenderer = ({ props }) => {
  const breakpoint = useBreakpoint();

  const text = props.text || '';
  const fontSize = getResponsiveValue(props.fontSize, breakpoint, 16);
  const textAlign = getResponsiveValue(props.textAlign, breakpoint, 'left');
  const color = getResponsiveValue(props.color, breakpoint, '#333333');
  const fontWeight = getResponsiveValue(props.fontWeight, breakpoint, 'normal');
  const margin = getResponsiveValue(props.margin, breakpoint, [0, 0, 0, 0]);
  const padding = getResponsiveValue(props.padding, breakpoint, [0, 0, 0, 0]);
  const backgroundImage = getResponsiveValue(props.backgroundImage, breakpoint, '');
  const width = getResponsiveValue(props.width, breakpoint, 'auto');
  const height = getResponsiveValue(props.height, breakpoint, 'auto');
  const textPosition = getResponsiveValue(props.textPosition, breakpoint, 'center');

  const hasBackground = backgroundImage && backgroundImage.trim() !== '';
  const positionStyles = TEXT_POSITIONS[textPosition] || TEXT_POSITIONS['center'];

  const style = {
    fontSize: `${fontSize}px`,
    textAlign,
    color,
    fontWeight,
    margin: getSpacing(margin),
    padding: getSpacing(padding),
    ...(hasBackground && {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: width === 'auto' ? 'auto' : `${width}px`,
      height: height === 'auto' ? 'auto' : `${height}px`,
      minHeight: height === 'auto' ? '100px' : undefined,
      display: 'flex',
      alignItems: positionStyles.alignItems,
      justifyContent: positionStyles.justifyContent,
      padding: '16px',
    }),
  };

  if (hasBackground) {
    return (
      <div style={style}>
        <span style={{
          backgroundColor: 'rgba(0,0,0,0.4)',
          padding: '8px 16px',
          borderRadius: '4px',
          textAlign,
        }}>
          {text}
        </span>
      </div>
    );
  }

  return <div style={style}>{text}</div>;
};

/**
 * Container Renderer
 */
const ContainerRenderer = ({ props, nodes, allNodes }) => {
  const breakpoint = useBreakpoint();

  const background = getResponsiveValue(props.background, breakpoint, '#ffffff');
  const backgroundImage = getResponsiveValue(props.backgroundImage, breakpoint, '');
  const padding = getResponsiveValue(props.padding, breakpoint, [0, 0, 0, 0]);
  const margin = getResponsiveValue(props.margin, breakpoint, [0, 0, 0, 0]);
  const width = getResponsiveValue(props.width, breakpoint, '100%');
  const height = getResponsiveValue(props.height, breakpoint, 'auto');
  const flexDirection = getResponsiveValue(props.flexDirection, breakpoint, 'column');
  const alignItems = getResponsiveValue(props.alignItems, breakpoint, 'flex-start');
  const justifyContent = getResponsiveValue(props.justifyContent, breakpoint, 'flex-start');
  const borderRadius = getResponsiveValue(props.borderRadius, breakpoint, 0);

  const style = {
    background: backgroundImage ? `url(${backgroundImage}) center/cover no-repeat` : background,
    padding: getSpacing(padding),
    margin: getSpacing(margin),
    width: width === '100%' ? '100%' : `${width}px`,
    height: height === 'auto' ? 'auto' : `${height}px`,
    display: 'flex',
    flexDirection,
    alignItems,
    justifyContent,
    borderRadius: `${borderRadius}px`,
    minHeight: '20px',
  };

  return (
    <div style={style}>
      {nodes && nodes.map(nodeId => (
        <NodeRenderer key={nodeId} nodeId={nodeId} allNodes={allNodes} />
      ))}
    </div>
  );
};

/**
 * Button Renderer
 */
const ButtonRenderer = ({ props }) => {
  const breakpoint = useBreakpoint();

  const text = props.text || 'Button';
  const color = getResponsiveValue(props.color, breakpoint, '#ffffff');
  const backgroundColor = getResponsiveValue(props.backgroundColor, breakpoint, '#00CBFF');
  const margin = getResponsiveValue(props.margin, breakpoint, [0, 0, 0, 0]);
  const padding = getResponsiveValue(props.padding, breakpoint, [10, 20, 10, 20]);
  const borderRadius = getResponsiveValue(props.borderRadius, breakpoint, 5);

  const style = {
    color,
    backgroundColor,
    padding: getSpacing(padding),
    margin: getSpacing(margin),
    borderRadius: `${borderRadius}px`,
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    border: 'none',
    display: 'inline-block',
  };

  return <button style={style}>{text}</button>;
};

/**
 * Image Renderer
 */
const ImageRenderer = ({ props }) => {
  const breakpoint = useBreakpoint();

  const src = props.src || 'https://via.placeholder.com/400x300?text=Image';
  const width = getResponsiveValue(props.width, breakpoint, '100%');
  const height = getResponsiveValue(props.height, breakpoint, 'auto');
  const margin = getResponsiveValue(props.margin, breakpoint, [0, 0, 0, 0]);
  const padding = getResponsiveValue(props.padding, breakpoint, [0, 0, 0, 0]);
  const borderRadius = getResponsiveValue(props.borderRadius, breakpoint, 0);
  const objectFit = getResponsiveValue(props.objectFit, breakpoint, 'cover');

  const containerStyle = {
    display: 'inline-block',
    margin: getSpacing(margin),
    padding: getSpacing(padding),
    lineHeight: 0,
    width: width === '100%' ? '100%' : `${width}px`,
  };

  const imgStyle = {
    width: '100%',
    height: height === 'auto' ? 'auto' : `${height}px`,
    objectFit,
    borderRadius: `${borderRadius}px`,
  };

  return (
    <div style={containerStyle}>
      <img src={src} style={imgStyle} alt="" />
    </div>
  );
};

// ============================================
// NODE RENDERER (Recursive)
// ============================================

/**
 * Component registry - maps type names to render components
 */
const COMPONENT_MAP = {
  Container: ContainerRenderer,
  Text: TextRenderer,
  Button: ButtonRenderer,
  UserImage: ImageRenderer,
};

/**
 * Render a single node by ID
 */
const NodeRenderer = ({ nodeId, allNodes }) => {
  console.log("🚀 ~ NodeRenderer ~ nodeId:", nodeId)
  console.log("🚀 ~ NodeRenderer ~ allNodes:", allNodes)
  const node = allNodes[nodeId];
  
  if (!node) {
    console.warn(`Node not found: ${nodeId}`);
    return null;
  }

  // Get component type
  const typeName = node.type?.resolvedName || node.type;
  const Component = COMPONENT_MAP[typeName];

  if (!Component) {
    console.warn(`Unknown component type: ${typeName}`);
    return null;
  }

  return (
    <Component 
      props={node.props || {}} 
      nodes={node.nodes || []}
      allNodes={allNodes}
    />
  );
};

// ============================================
// MAIN PAGE RENDERER
// ============================================

/**
 * Main PageRenderer Component
 * 
 * @param {string | object} data - Serialized Craft.js data (JSON string or parsed object)
 * @param {string} forceBreakpoint - Optional: force a specific breakpoint (for testing)
 * 
 * @example
 * // Basic usage
 * <PageRenderer data={serializedJson} />
 * 
 * // Force mobile view
 * <PageRenderer data={serializedJson} forceBreakpoint="mobile" />
 */
export const PageRenderer = ({ data, forceBreakpoint = null }) => {
  const autoBreakpoint = useResponsiveBreakpoint();
  const breakpoint = forceBreakpoint || autoBreakpoint;

  // Parse data if string
  const parsedData = typeof data === 'string' ? JSON.parse(data) : data;

  if (!parsedData || !parsedData.ROOT) {
    return (
      <div style={{ padding: 20, textAlign: 'center', color: '#999' }}>
        No content to display
      </div>
    );
  }

  return (
    <BreakpointContext.Provider value={breakpoint}>
      <NodeRenderer nodeId="ROOT" allNodes={parsedData} />
    </BreakpointContext.Provider>
  );
};

// ============================================
// EXPORTS
// ============================================

export default PageRenderer;

// Export individual components for custom usage
export {
  TextRenderer,
  ContainerRenderer,
  ButtonRenderer,
  ImageRenderer,
  NodeRenderer,
  COMPONENT_MAP,
};
