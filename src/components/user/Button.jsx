import React from 'react';
import { useNode } from '@craftjs/core';
import { useBreakpoint, getResponsiveValue, setResponsiveValue } from '../../contexts/BreakpointContext';

const getSpacing = (spacing) => {
    if (Array.isArray(spacing) && spacing.length === 4) return `${spacing[0]}px ${spacing[1]}px ${spacing[2]}px ${spacing[3]}px`;
    if (typeof spacing === 'number') return `${spacing}px`; 
    return '0px';
}

export const Button = ({ text, color, backgroundColor, margin = [0,0,0,0], padding = [10,20,10,20], borderRadius }) => {
  const { connectors: { connect, drag } } = useNode();
  const breakpoint = useBreakpoint();

  // Get responsive values
  const currentColor = getResponsiveValue(color, breakpoint);
  const currentBackgroundColor = getResponsiveValue(backgroundColor, breakpoint);
  const currentMargin = getResponsiveValue(margin, breakpoint);
  const currentPadding = getResponsiveValue(padding, breakpoint);
  const currentBorderRadius = getResponsiveValue(borderRadius, breakpoint);

  return (
    <button
      ref={(ref) => connect(drag(ref))}
      style={{
        color: currentColor,
        backgroundColor: currentBackgroundColor,
        padding: getSpacing(currentPadding),
        margin: getSpacing(currentMargin),
        borderRadius: `${currentBorderRadius}px`,
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 500,
        border: 'none',
        display: 'inline-block'
      }}
    >
      {text}
    </button>
  );
};

export const ButtonSettings = () => {
  const breakpoint = useBreakpoint();
  
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props,
  }));

  const { text, color, backgroundColor, margin, borderRadius, padding } = props;

  // Get current breakpoint values
  const currentColor = getResponsiveValue(color, breakpoint) || '#ffffff';
  const currentBackgroundColor = getResponsiveValue(backgroundColor, breakpoint) || '#00CBFF';
  const currentMargin = getResponsiveValue(margin, breakpoint) || [0, 0, 0, 0];
  const currentPadding = getResponsiveValue(padding, breakpoint) || [10, 20, 10, 20];
  const currentBorderRadius = getResponsiveValue(borderRadius, breakpoint) || 5;

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
        <span>Link Button</span>
        <span className="breakpoint-badge">{breakpoint.toUpperCase()}</span>
      </div>
      
      <div className="settings-control">
          <input 
            type="text" 
            className="input-field" 
            value={text} 
            onChange={(e) => setProp(props => props.text = e.target.value)} 
          />
      </div>

      <div className="settings-section-title" style={{paddingTop: 8, fontSize: 11}}>Background Color (responsive)</div>
      <div className="settings-control">
          <div className="input-row">
              <div className="color-input-wrapper">
                  <div className="color-swatch" style={{background: currentBackgroundColor}}>
                      <input type="color" value={currentBackgroundColor} onChange={(e) => updateResponsiveProp('backgroundColor', e.target.value)} />
                  </div>
                  <input type="text" className="input-field" style={{background: 'none', padding: 0}} value={currentBackgroundColor.toUpperCase()} readOnly />
              </div>
          </div>
      </div>

      <div className="settings-section-title" style={{paddingTop: 8, fontSize: 11}}>Text Color (responsive)</div>
      <div className="settings-control">
          <div className="input-row">
              <div className="color-input-wrapper">
                  <div className="color-swatch" style={{background: currentColor}}>
                      <input type="color" value={currentColor} onChange={(e) => updateResponsiveProp('color', e.target.value)} />
                  </div>
                  <input type="text" className="input-field" style={{background: 'none', padding: 0}} value={currentColor.toUpperCase()} readOnly />
              </div>
          </div>
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
            <input type="number" className="input-field" value={currentBorderRadius} onChange={(e) => updateResponsiveProp('borderRadius', parseInt(e.target.value) || 0)} />
       </div>

      <button className="btn-save-settings">Save</button>
    </div>
  );
};

Button.craft = {
  props: {
    text: 'Link',
    color: '#ffffff',
    backgroundColor: '#00CBFF',
    margin: [0, 0, 0, 0],
    padding: [10, 20, 10, 20],
    borderRadius: 5
  },
  related: {
    settings: ButtonSettings,
  },
};
