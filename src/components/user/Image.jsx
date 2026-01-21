import React from 'react';
import { useNode } from '@craftjs/core';
import { Image as ImageIcon, X } from 'lucide-react';
import { useBreakpoint, getResponsiveValue, setResponsiveValue } from '../../contexts/BreakpointContext';

const getSpacing = (spacing) => {
    if (Array.isArray(spacing) && spacing.length === 4) return `${spacing[0]}px ${spacing[1]}px ${spacing[2]}px ${spacing[3]}px`;
    if (typeof spacing === 'number') return `${spacing}px`; 
    return '0px';
}

export const UserImage = ({ src, width, height, objectFit, borderRadius, margin = [0,0,0,0], padding = [0,0,0,0] }) => {
  const { connectors: { connect, drag } } = useNode();
  const breakpoint = useBreakpoint();

  // Get responsive values
  const currentWidth = getResponsiveValue(width, breakpoint);
  const currentHeight = getResponsiveValue(height, breakpoint);
  const currentMargin = getResponsiveValue(margin, breakpoint);
  const currentPadding = getResponsiveValue(padding, breakpoint);
  const currentBorderRadius = getResponsiveValue(borderRadius, breakpoint);
  const currentObjectFit = getResponsiveValue(objectFit, breakpoint);

  return (
      <div 
        ref={ref => connect(drag(ref))} 
        style={{
            display: 'inline-block',
            margin: getSpacing(currentMargin),
            padding: getSpacing(currentPadding),
            lineHeight: 0,
            width: currentWidth === '100%' ? '100%' : `${currentWidth}px`,
        }}
      >
        <img 
            src={src || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400'} 
            style={{
                width: '100%',
                height: currentHeight === 'auto' ? 'auto' : `${currentHeight}px`,
                objectFit: currentObjectFit,
                borderRadius: `${currentBorderRadius}px`,
            }} 
            alt="user"
        />
      </div>
  );
};

export const ImageSettings = () => {
    const breakpoint = useBreakpoint();
    
    const { actions: { setProp }, props } = useNode((node) => ({
        props: node.data.props,
    }));

    const { src, width, height, borderRadius, margin, objectFit } = props;

    // Get current breakpoint values
    const currentWidth = getResponsiveValue(width, breakpoint) || '100%';
    const currentHeight = getResponsiveValue(height, breakpoint) || 'auto';
    const currentBorderRadius = getResponsiveValue(borderRadius, breakpoint) || 0;
    const currentMargin = getResponsiveValue(margin, breakpoint) || [0, 0, 0, 0];
    const currentObjectFit = getResponsiveValue(objectFit, breakpoint) || 'cover';

    // Helper to update responsive prop
    const updateResponsiveProp = (propName, value) => {
      setProp(props => {
        props[propName] = setResponsiveValue(props[propName], breakpoint, value);
      });
    };

    const handleSpacingChange = (index, value) => {
        const newMargin = [...currentMargin];
        newMargin[index] = value;
        updateResponsiveProp('margin', newMargin);
    };

    return (
        <div>
            {/* Breakpoint Indicator */}
            <div className="settings-section-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>Image</span>
                <span className="breakpoint-badge">{breakpoint.toUpperCase()}</span>
            </div>
            
            <div className="settings-control">
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Image URL..."
                  value={src || ''} 
                  onChange={(e) => setProp(props => props.src = e.target.value)} 
                />
            </div>
            
            {src && (
                <div className="settings-control" style={{position: 'relative'}}>
                    <img src={src} style={{width: '100%', borderRadius: 12, height: 100, objectFit: 'cover'}} alt="preview" />
                    <button 
                        onClick={() => setProp(props => props.src = '')}
                        style={{position: 'absolute', top: 12, right: 20, background: 'white', borderRadius: '50%', padding: 4, display: 'flex', border: '1px solid #ddd'}}
                    >
                        <X size={12} />
                    </button>
                </div>
            )}

            <div className="settings-section-title">Dimensions (responsive)</div>
            <div className="settings-control">
                <div className="spacing-grid">
                    <div className="spacing-box">
                        <label>W</label>
                        <input 
                          type="number" 
                          value={currentWidth === '100%' ? '' : currentWidth} 
                          placeholder="100%"
                          onChange={(e) => updateResponsiveProp('width', e.target.value ? parseInt(e.target.value) : '100%')} 
                        />
                    </div>
                    <div className="spacing-box">
                        <label>H</label>
                        <input 
                          type="number" 
                          value={currentHeight === 'auto' ? '' : currentHeight} 
                          placeholder="auto"
                          onChange={(e) => updateResponsiveProp('height', e.target.value ? parseInt(e.target.value) : 'auto')} 
                        />
                    </div>
                </div>
            </div>

            <div className="settings-section-title" style={{paddingTop: 0, fontSize: 11}}>Object Fit (responsive)</div>
            <div className="settings-control">
                <select 
                  className="select-field" 
                  style={{width: '100%'}} 
                  value={currentObjectFit} 
                  onChange={(e) => updateResponsiveProp('objectFit', e.target.value)}
                >
                    <option value="cover">Cover</option>
                    <option value="contain">Contain</option>
                    <option value="fill">Fill</option>
                    <option value="none">None</option>
                </select>
            </div>

            <div className="settings-section-title" style={{paddingTop: 0, fontSize: 11}}>Border Radius (responsive)</div>
            <div className="settings-control">
                <input 
                  type="number" 
                  className="input-field" 
                  value={currentBorderRadius} 
                  onChange={(e) => updateResponsiveProp('borderRadius', parseInt(e.target.value) || 0)} 
                />
            </div>

            <div className="settings-section-title">Block Style</div>
            <div className="settings-section-title" style={{paddingTop: 0, fontSize: 11}}>Margin (responsive)</div>
            <div className="settings-control">
                <div className="spacing-grid">
                    <div className="spacing-box">
                        <label>Top</label>
                        <input type="number" value={currentMargin[0]} onChange={(e) => handleSpacingChange(0, parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="spacing-box">
                        <label>Right</label>
                        <input type="number" value={currentMargin[1]} onChange={(e) => handleSpacingChange(1, parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="spacing-box">
                        <label>Bottom</label>
                        <input type="number" value={currentMargin[2]} onChange={(e) => handleSpacingChange(2, parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="spacing-box">
                        <label>Left</label>
                        <input type="number" value={currentMargin[3]} onChange={(e) => handleSpacingChange(3, parseInt(e.target.value) || 0)} />
                    </div>
                </div>
            </div>

            <button className="btn-save-settings">Save</button>
        </div>
    );
}

UserImage.craft = {
    props: {
        src: '',
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        borderRadius: 0,
        margin: [0,0,0,0],
        padding: [0,0,0,0],
    },
    related: {
        settings: ImageSettings
    }
}
