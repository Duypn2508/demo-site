import React from 'react';
import { useNode } from '@craftjs/core';
import { AlignLeft, AlignCenter, AlignRight, Image as ImageIcon, X } from 'lucide-react';
import { useBreakpoint, getResponsiveValue, setResponsiveValue } from '../../contexts/BreakpointContext';

const getSpacing = (spacing) => {
    if (Array.isArray(spacing) && spacing.length === 4) return `${spacing[0]}px ${spacing[1]}px ${spacing[2]}px ${spacing[3]}px`;
    if (typeof spacing === 'number') return `${spacing}px`; 
    return '0px';
}

// Text position options for background image mode
const TEXT_POSITIONS = [
  { value: 'top-left', label: '↖', alignItems: 'flex-start', justifyContent: 'flex-start' },
  { value: 'top-center', label: '↑', alignItems: 'flex-start', justifyContent: 'center' },
  { value: 'top-right', label: '↗', alignItems: 'flex-start', justifyContent: 'flex-end' },
  { value: 'center-left', label: '←', alignItems: 'center', justifyContent: 'flex-start' },
  { value: 'center', label: '●', alignItems: 'center', justifyContent: 'center' },
  { value: 'center-right', label: '→', alignItems: 'center', justifyContent: 'flex-end' },
  { value: 'bottom-left', label: '↙', alignItems: 'flex-end', justifyContent: 'flex-start' },
  { value: 'bottom-center', label: '↓', alignItems: 'flex-end', justifyContent: 'center' },
  { value: 'bottom-right', label: '↘', alignItems: 'flex-end', justifyContent: 'flex-end' },
];

const getPositionStyles = (position) => {
  const pos = TEXT_POSITIONS.find(p => p.value === position) || TEXT_POSITIONS[4]; // default: center
  return { alignItems: pos.alignItems, justifyContent: pos.justifyContent };
};

export const Text = ({ 
  text, 
  fontSize, 
  textAlign, 
  color, 
  fontWeight, 
  margin = [0,0,0,0], 
  padding = [0,0,0,0],
  backgroundImage = '',
  width = 'auto',
  height = 'auto',
  textPosition = 'center'
}) => {
  const { connectors: { connect, drag } } = useNode();
  const breakpoint = useBreakpoint();
  
  // Get responsive values
  const currentFontSize = getResponsiveValue(fontSize, breakpoint);
  const currentTextAlign = getResponsiveValue(textAlign, breakpoint);
  const currentColor = getResponsiveValue(color, breakpoint);
  const currentFontWeight = getResponsiveValue(fontWeight, breakpoint);
  const currentMargin = getResponsiveValue(margin, breakpoint);
  const currentPadding = getResponsiveValue(padding, breakpoint);
  const currentBackgroundImage = getResponsiveValue(backgroundImage, breakpoint);
  const currentWidth = getResponsiveValue(width, breakpoint);
  const currentHeight = getResponsiveValue(height, breakpoint);
  const currentTextPosition = getResponsiveValue(textPosition, breakpoint);

  const hasBackground = currentBackgroundImage && currentBackgroundImage.trim() !== '';
  const positionStyles = getPositionStyles(currentTextPosition);

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      style={{
        fontSize: `${currentFontSize}px`,
        textAlign: currentTextAlign,
        color: currentColor,
        fontWeight: currentFontWeight,
        margin: getSpacing(currentMargin),
        padding: getSpacing(currentPadding),
        ...(hasBackground && {
          backgroundImage: `url(${currentBackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: currentWidth === 'auto' ? 'auto' : `${currentWidth}px`,
          height: currentHeight === 'auto' ? 'auto' : `${currentHeight}px`,
          minHeight: currentHeight === 'auto' ? '100px' : undefined,
          display: 'flex',
          alignItems: positionStyles.alignItems,
          justifyContent: positionStyles.justifyContent,
          padding: '16px', // Add some padding for text visibility
        }),
      }}
    >
      {hasBackground ? (
        <span style={{
          backgroundColor: 'rgba(0,0,0,0.4)',
          padding: '8px 16px',
          borderRadius: '4px',
          textAlign: currentTextAlign,
        }}>
          {text}
        </span>
      ) : (
        text
      )}
    </div>
  );
};

export const TextSettings = () => {
    const breakpoint = useBreakpoint();
    
    const { actions: { setProp }, props } = useNode((node) => ({
        props: node.data.props,
    }));

    const { 
      text, 
      fontSize, 
      textAlign, 
      color, 
      fontWeight, 
      margin,
      backgroundImage,
      width,
      height,
      textPosition
    } = props;

    // Get current breakpoint values
    const currentFontSize = getResponsiveValue(fontSize, breakpoint) || 16;
    const currentTextAlign = getResponsiveValue(textAlign, breakpoint) || 'left';
    const currentColor = getResponsiveValue(color, breakpoint) || '#333333';
    const currentFontWeight = getResponsiveValue(fontWeight, breakpoint) || 'normal';
    const currentMargin = getResponsiveValue(margin, breakpoint) || [0, 0, 0, 0];
    const currentBackgroundImage = getResponsiveValue(backgroundImage, breakpoint) || '';
    const currentWidth = getResponsiveValue(width, breakpoint) || 'auto';
    const currentHeight = getResponsiveValue(height, breakpoint) || 'auto';
    const currentTextPosition = getResponsiveValue(textPosition, breakpoint) || 'center';

    const hasBackground = currentBackgroundImage && currentBackgroundImage.trim() !== '';

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
        <span>Text Content</span>
        <span className="breakpoint-badge">{breakpoint.toUpperCase()}</span>
      </div>
      
      <div className="settings-control">
          <textarea 
            className="input-field" 
            rows={2} 
            value={text} 
            onChange={(e) => setProp(props => props.text = e.target.value)} 
          />
      </div>

      <div className="settings-section-title" style={{paddingTop: 8, fontSize: 11}}>Font Size (responsive)</div>
      <div className="settings-control">
          <div className="input-row">
              <input 
                type="number" 
                className="input-field" 
                style={{maxWidth: 80}}
                value={currentFontSize} 
                onChange={(e) => updateResponsiveProp('fontSize', parseInt(e.target.value) || 16)} 
              />
              <span style={{fontSize: 12, color: '#888'}}>px</span>
              <select 
                className="select-field" 
                style={{flex: 1}}
                value={currentFontWeight} 
                onChange={(e) => updateResponsiveProp('fontWeight', e.target.value)}
              >
                  <option value="normal">Regular</option>
                  <option value="bold">Bold</option>
              </select>
          </div>
      </div>

      <div className="settings-section-title" style={{paddingTop: 8, fontSize: 11}}>Text Color</div>
      <div className="settings-control">
          <div className="input-row">
              <div className="color-input-wrapper">
                  <div className="color-swatch" style={{background: currentColor}}>
                      <input type="color" value={currentColor} onChange={(e) => updateResponsiveProp('color', e.target.value)} />
                  </div>
                  <input type="text" className="input-field" style={{background: 'none', padding: 0}} value={currentColor.toUpperCase()} readOnly />
                  <div className="opacity-input">100%</div>
              </div>
          </div>
      </div>

      <div className="settings-section-title" style={{paddingTop: 8, fontSize: 11}}>Text Alignment (responsive)</div>
      <div className="settings-control">
          <div className="toggle-group">
               <button className={`toggle-item ${currentTextAlign === 'left' ? 'active' : ''}`} onClick={() => updateResponsiveProp('textAlign', 'left')}><AlignLeft size={16} /></button>
               <button className={`toggle-item ${currentTextAlign === 'center' ? 'active' : ''}`} onClick={() => updateResponsiveProp('textAlign', 'center')}><AlignCenter size={16} /></button>
               <button className={`toggle-item ${currentTextAlign === 'right' ? 'active' : ''}`} onClick={() => updateResponsiveProp('textAlign', 'right')}><AlignRight size={16} /></button>
          </div>
      </div>

      {/* Background Image Section */}
      <div className="settings-section-title">Background Image</div>
      <div className="settings-control">
          <input 
            type="text" 
            className="input-field" 
            placeholder="Image URL..."
            value={currentBackgroundImage} 
            onChange={(e) => updateResponsiveProp('backgroundImage', e.target.value)} 
          />
      </div>
      
      {hasBackground && (
        <>
          <div className="settings-control" style={{position: 'relative'}}>
              <img src={currentBackgroundImage} style={{width: '100%', borderRadius: 12, height: 80, objectFit: 'cover'}} alt="preview" />
              <button 
                  onClick={() => updateResponsiveProp('backgroundImage', '')}
                  style={{position: 'absolute', top: 12, right: 20, background: 'white', borderRadius: '50%', padding: 4, display: 'flex', border: '1px solid #ddd'}}
              >
                  <X size={12} />
              </button>
          </div>

          <div className="settings-section-title" style={{paddingTop: 8, fontSize: 11}}>Dimensions (responsive)</div>
          <div className="settings-control">
              <div className="spacing-grid">
                  <div className="spacing-box">
                      <label>W</label>
                      <input 
                        type="number" 
                        value={currentWidth === 'auto' ? '' : currentWidth} 
                        placeholder="auto"
                        onChange={(e) => updateResponsiveProp('width', e.target.value ? parseInt(e.target.value) : 'auto')} 
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

          {/* Text Position Grid */}
          <div className="settings-section-title" style={{paddingTop: 8, fontSize: 11}}>Text Position (responsive)</div>
          <div className="settings-control">
              <div className="position-grid">
                  {TEXT_POSITIONS.map(pos => (
                    <button 
                      key={pos.value}
                      className={`position-btn ${currentTextPosition === pos.value ? 'active' : ''}`}
                      onClick={() => updateResponsiveProp('textPosition', pos.value)}
                      title={pos.value}
                    >
                      {pos.label}
                    </button>
                  ))}
              </div>
          </div>
        </>
      )}

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
};

Text.craft = {
  props: {
    text: 'Enter text here',
    fontSize: 16,
    textAlign: 'left',
    color: '#ffffff',
    fontWeight: 'normal',
    margin: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    backgroundImage: '',
    width: 'auto',
    height: 'auto',
    textPosition: 'center'
  },
  related: {
    settings: TextSettings,
  },
};
