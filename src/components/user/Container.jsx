import React from 'react';
import { useNode } from '@craftjs/core';
import { useBreakpoint, getResponsiveValue, setResponsiveValue } from '../../contexts/BreakpointContext';

const getSpacing = (spacing) => {
    if (Array.isArray(spacing) && spacing.length === 4) return `${spacing[0]}px ${spacing[1]}px ${spacing[2]}px ${spacing[3]}px`;
    if (typeof spacing === 'number') return `${spacing}px`; 
    return '0px';
}

export const Container = ({ 
  background, 
  padding = [0,0,0,0], 
  width, 
  height, 
  flexDirection, 
  alignItems, 
  justifyContent, 
  children, 
  margin = [0,0,0,0], 
  borderRadius, 
  shadow, 
  backgroundImage 
}) => {
  const { connectors: { connect, drag } } = useNode();
  const breakpoint = useBreakpoint();

  // Get responsive values
  const currentBackground = getResponsiveValue(background, breakpoint);
  const currentPadding = getResponsiveValue(padding, breakpoint);
  const currentMargin = getResponsiveValue(margin, breakpoint);
  const currentWidth = getResponsiveValue(width, breakpoint);
  const currentHeight = getResponsiveValue(height, breakpoint);
  const currentFlexDirection = getResponsiveValue(flexDirection, breakpoint);
  const currentAlignItems = getResponsiveValue(alignItems, breakpoint);
  const currentJustifyContent = getResponsiveValue(justifyContent, breakpoint);
  const currentBorderRadius = getResponsiveValue(borderRadius, breakpoint);
  const currentBackgroundImage = getResponsiveValue(backgroundImage, breakpoint);

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      style={{
        background: currentBackgroundImage ? `url(${currentBackgroundImage}) center/cover no-repeat` : currentBackground,
        padding: getSpacing(currentPadding),
        margin: getSpacing(currentMargin),
        width: currentWidth === '100%' ? '100%' : `${currentWidth}px`,
        height: currentHeight === 'auto' ? 'auto' : `${currentHeight}px`,
        display: 'flex',
        flexDirection: currentFlexDirection,
        alignItems: currentAlignItems,
        justifyContent: currentJustifyContent,
        borderRadius: `${currentBorderRadius}px`,
        boxShadow: shadow === 'none' ? 'none' : '0px 3px 6px rgba(0,0,0,0.1)',
        minHeight: '20px',
      }}
    >
      {children}
    </div>
  );
};

export const ContainerSettings = () => {
    const breakpoint = useBreakpoint();
    
    const { actions: { setProp }, props } = useNode((node) => ({
        props: node.data.props,
    }));

    const { background, padding, margin, flexDirection, borderRadius, backgroundImage } = props;

    // Get current breakpoint values
    const currentBackground = getResponsiveValue(background, breakpoint) || '#ffffff';
    const currentPadding = getResponsiveValue(padding, breakpoint) || [20, 20, 20, 20];
    const currentMargin = getResponsiveValue(margin, breakpoint) || [0, 0, 0, 0];
    const currentFlexDirection = getResponsiveValue(flexDirection, breakpoint) || 'column';
    const currentBorderRadius = getResponsiveValue(borderRadius, breakpoint) || 0;
    const currentBackgroundImage = getResponsiveValue(backgroundImage, breakpoint) || '';

    // Helper to update responsive prop
    const updateResponsiveProp = (propName, value) => {
      setProp(props => {
        props[propName] = setResponsiveValue(props[propName], breakpoint, value);
      });
    };
    
    const handleSpacingChange = (type, index, value) => {
        const currentValue = type === 'padding' ? currentPadding : currentMargin;
        const newValue = [...currentValue];
        newValue[index] = value;
        updateResponsiveProp(type, newValue);
    };

    return (
        <div>
            {/* Breakpoint Indicator */}
            <div className="settings-section-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>Container Settings</span>
                <span className="breakpoint-badge">{breakpoint.toUpperCase()}</span>
            </div>
            
            <div className="settings-control">
                 <div className="settings-section-title" style={{padding: '0 0 8px 0', fontSize: 11}}>Background (responsive)</div>
                 <div className="color-input-wrapper">
                      <div className="color-swatch" style={{background: currentBackground}}>
                          <input type="color" value={currentBackground} onChange={(e) => updateResponsiveProp('background', e.target.value)} />
                      </div>
                      <input type="text" className="input-field" style={{background: 'none', padding: 0}} value={currentBackground.toUpperCase()} readOnly />
                      <div className="opacity-input">100%</div>
                  </div>
            </div>

            <div className="settings-section-title" style={{paddingTop: 8, fontSize: 11}}>Background Image</div>
            <div className="settings-control">
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Image URL..."
                  value={currentBackgroundImage} 
                  onChange={(e) => updateResponsiveProp('backgroundImage', e.target.value)} 
                />
            </div>

            <div className="settings-section-title">Block Style</div>
            
            <div className="settings-section-title" style={{paddingTop: 0, fontSize: 11}}>Margin (responsive)</div>
            <div className="settings-control">
                <div className="spacing-grid">
                    <div className="spacing-box">
                        <label>Top</label>
                        <input type="number" value={currentMargin[0]} onChange={(e) => handleSpacingChange('margin', 0, parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="spacing-box">
                        <label>Right</label>
                        <input type="number" value={currentMargin[1]} onChange={(e) => handleSpacingChange('margin', 1, parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="spacing-box">
                        <label>Bottom</label>
                        <input type="number" value={currentMargin[2]} onChange={(e) => handleSpacingChange('margin', 2, parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="spacing-box">
                        <label>Left</label>
                        <input type="number" value={currentMargin[3]} onChange={(e) => handleSpacingChange('margin', 3, parseInt(e.target.value) || 0)} />
                    </div>
                </div>
            </div>

            <div className="settings-section-title" style={{paddingTop: 0, fontSize: 11}}>Padding (responsive)</div>
             <div className="settings-control">
                <div className="spacing-grid">
                    <div className="spacing-box">
                        <label>Top</label>
                        <input type="number" value={currentPadding[0]} onChange={(e) => handleSpacingChange('padding', 0, parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="spacing-box">
                        <label>Right</label>
                        <input type="number" value={currentPadding[1]} onChange={(e) => handleSpacingChange('padding', 1, parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="spacing-box">
                        <label>Bottom</label>
                        <input type="number" value={currentPadding[2]} onChange={(e) => handleSpacingChange('padding', 2, parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="spacing-box">
                        <label>Left</label>
                        <input type="number" value={currentPadding[3]} onChange={(e) => handleSpacingChange('padding', 3, parseInt(e.target.value) || 0)} />
                    </div>
                </div>
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

            <div className="settings-section-title" style={{paddingTop: 0, fontSize: 11}}>Direction (responsive)</div>
            <div className="settings-control">
                 <select className="select-field" style={{width: '100%'}} value={currentFlexDirection} onChange={(e) => updateResponsiveProp('flexDirection', e.target.value)}>
                    <option value="column">Vertical (Column)</option>
                    <option value="row">Horizontal (Row)</option>
                 </select>
            </div>

            <button className="btn-save-settings">Save</button>
        </div>
    )
}

Container.craft = {
  props: {
    background: '#ffffff',
    backgroundImage: '',
    padding: [20, 20, 20, 20],
    margin: [0, 0, 0, 0],
    width: '100%',
    height: 'auto',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 0,
    shadow: 'none'
  },
  related: {
      settings: ContainerSettings
  }
};
