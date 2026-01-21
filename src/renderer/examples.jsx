/**
 * Page Renderer - Usage Examples & Best Practices
 * 
 * This file demonstrates how to use PageRenderer in different scenarios.
 */

import React, { useState, useEffect } from 'react';
import { PageRenderer, useResponsiveBreakpoint, BREAKPOINTS } from './PageRenderer';

// ============================================
// EXAMPLE 1: Basic Usage
// ============================================

export const BasicExample = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch from your API
    fetch('/api/pages/123')
      .then(res => res.json())
      .then(data => {
        setPageData(data.content);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load page:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!pageData) return <div>Page not found</div>;

  return <PageRenderer data={pageData} />;
};

// ============================================
// EXAMPLE 2: With Breakpoint Preview Controls
// ============================================

export const PreviewExample = () => {
  const [pageData, setPageData] = useState(null);
  const [forceBreakpoint, setForceBreakpoint] = useState(null);
  const autoBreakpoint = useResponsiveBreakpoint();

  // Sample data for testing
  useEffect(() => {
    // In real app, fetch from API
    const sampleData = {
      "ROOT": {
        "type": { "resolvedName": "Container" },
        "props": {
          "background": "#ffffff",
          "padding": [20, 20, 20, 20],
          "flexDirection": "column"
        },
        "nodes": ["text-1", "button-1"]
      },
      "text-1": {
        "type": { "resolvedName": "Text" },
        "props": {
          "text": "Hello Responsive World!",
          "fontSize": { "mobile": 18, "tablet": 24, "desktop": 32 },
          "textAlign": { "mobile": "center", "tablet": "left", "desktop": "left" },
          "color": "#333333"
        },
        "nodes": []
      },
      "button-1": {
        "type": { "resolvedName": "Button" },
        "props": {
          "text": "Click Me",
          "backgroundColor": { "mobile": "#FF6B6B", "tablet": "#4ECDC4", "desktop": "#45B7D1" },
          "padding": { "mobile": [8, 16, 8, 16], "tablet": [10, 20, 10, 20], "desktop": [12, 24, 12, 24] }
        },
        "nodes": []
      }
    };
    setPageData(sampleData);
  }, []);

  if (!pageData) return <div>Loading...</div>;

  return (
    <div>
      {/* Preview Controls */}
      <div style={{
        position: 'fixed',
        top: 10,
        right: 10,
        background: '#fff',
        padding: 10,
        borderRadius: 8,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        zIndex: 1000,
        display: 'flex',
        gap: 8,
        alignItems: 'center'
      }}>
        <span style={{ fontSize: 12, color: '#666' }}>Preview:</span>
        {['mobile', 'tablet', 'desktop'].map(bp => (
          <button
            key={bp}
            onClick={() => setForceBreakpoint(forceBreakpoint === bp ? null : bp)}
            style={{
              padding: '4px 12px',
              borderRadius: 4,
              border: 'none',
              background: forceBreakpoint === bp ? '#667eea' : '#eee',
              color: forceBreakpoint === bp ? '#fff' : '#333',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600
            }}
          >
            {bp.toUpperCase()}
          </button>
        ))}
        <span style={{ fontSize: 10, color: '#999', marginLeft: 8 }}>
          Current: {forceBreakpoint || autoBreakpoint}
        </span>
      </div>

      {/* Page Content */}
      <PageRenderer data={pageData} forceBreakpoint={forceBreakpoint} />
    </div>
  );
};

// ============================================
// EXAMPLE 3: Server-Side Rendering (SSR)
// ============================================

/**
 * For SSR (Next.js, etc.), you can pass a default breakpoint
 * since window is not available on server.
 * 
 * Use `forceBreakpoint` prop and detect device from user-agent.
 */
export const SSRExample = ({ pageData, userAgent }) => {
  // Detect device from user-agent (simplified)
  const getDeviceFromUA = (ua) => {
    if (/mobile/i.test(ua)) return 'mobile';
    if (/tablet|ipad/i.test(ua)) return 'tablet';
    return 'desktop';
  };

  const serverBreakpoint = getDeviceFromUA(userAgent);

  return (
    <PageRenderer 
      data={pageData} 
      forceBreakpoint={serverBreakpoint}
    />
  );
};

// ============================================
// EXAMPLE 4: Extending with Custom Components
// ============================================

/**
 * To add custom components:
 * 
 * 1. Create a renderer component following the pattern:
 * ```jsx
 * const MyCustomRenderer = ({ props, nodes, allNodes }) => {
 *   const breakpoint = useBreakpoint();
 *   const value = getResponsiveValue(props.myProp, breakpoint, 'default');
 *   return <div>{value}</div>;
 * };
 * ```
 * 
 * 2. Add to COMPONENT_MAP in PageRenderer.jsx:
 * ```jsx
 * const COMPONENT_MAP = {
 *   ...existingComponents,
 *   MyCustomComponent: MyCustomRenderer,
 * };
 * ```
 */

// ============================================
// BEST PRACTICES
// ============================================

/**
 * BEST PRACTICES:
 * 
 * 1. DATA STRUCTURE:
 *    - Store serialized data as-is from Craft.js (JSON string)
 *    - Don't transform/compress unless necessary
 *    - Version your data format for future migrations
 * 
 * 2. RESPONSIVE VALUES:
 *    - Use object format: { mobile: x, tablet: y, desktop: z }
 *    - Always provide mobile value as fallback
 *    - Only override values that differ from mobile
 * 
 * 3. PERFORMANCE:
 *    - Memoize PageRenderer if data doesn't change often
 *    - Use React.memo for individual renderers if needed
 *    - Consider lazy loading images
 * 
 * 4. CACHING:
 *    - Cache parsed JSON on client
 *    - Use CDN for static assets (images)
 *    - Consider edge caching for SSR
 * 
 * 5. ERROR HANDLING:
 *    - Wrap PageRenderer in ErrorBoundary
 *    - Validate data structure before rendering
 *    - Provide meaningful fallback UI
 * 
 * 6. ACCESSIBILITY:
 *    - Add alt text to images
 *    - Ensure color contrast
 *    - Use semantic HTML where possible
 */

// ============================================
// TYPESCRIPT DEFINITIONS (for TS projects)
// ============================================

/**
 * TypeScript type definitions:
 * 
 * ```typescript
 * type Breakpoint = 'mobile' | 'tablet' | 'desktop';
 * 
 * type ResponsiveValue<T> = T | {
 *   mobile?: T;
 *   tablet?: T;
 *   desktop?: T;
 * };
 * 
 * interface NodeData {
 *   type: { resolvedName: string } | string;
 *   props: Record<string, any>;
 *   nodes?: string[];
 *   parent?: string | null;
 * }
 * 
 * interface SerializedData {
 *   ROOT: NodeData;
 *   [nodeId: string]: NodeData;
 * }
 * 
 * interface PageRendererProps {
 *   data: string | SerializedData;
 *   forceBreakpoint?: Breakpoint | null;
 * }
 * ```
 */

export default PreviewExample;
