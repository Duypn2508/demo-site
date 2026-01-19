import React from 'react';
import { useNode } from '@craftjs/core';

const getSpacing = (spacing) => {
    if (Array.isArray(spacing) && spacing.length === 4) return `${spacing[0]}px ${spacing[1]}px ${spacing[2]}px ${spacing[3]}px`;
    if (typeof spacing === 'number') return `${spacing}px`; 
    return '0px';
}

export const Button = ({ text, color, backgroundColor, margin = [0,0,0,0], padding = [10,20,10,20], borderRadius }) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <button
      ref={(ref) => connect(drag(ref))}
      style={{
        color,
        backgroundColor,
        padding: getSpacing(padding),
        margin: getSpacing(margin),
        borderRadius: `${borderRadius}px`,
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
  const { actions: { setProp }, text, color, backgroundColor, margin, borderRadius } = useNode((node) => ({
    text: node.data.props.text,
    color: node.data.props.color,
    backgroundColor: node.data.props.backgroundColor,
    margin: node.data.props.margin,
    borderRadius: node.data.props.borderRadius
  }));

  const handleSpacingChange = (index, value) => {
      setProp(props => {
          props.margin[index] = value;
      });
  }

  return (
    <div>
      <div className="settings-section-title">Link Button</div>
      <div className="settings-control">
          <input 
            type="text" 
            className="input-field" 
            value={text} 
            onChange={(e) => setProp(props => props.text = e.target.value)} 
          />
      </div>

      <div className="settings-control">
          <div className="input-row">
              <div className="color-input-wrapper">
                  <div className="color-swatch" style={{background: backgroundColor}}>
                      <input type="color" value={backgroundColor} onChange={(e) => setProp(props => props.backgroundColor = e.target.value)} />
                  </div>
                  <input type="text" className="input-field" style={{background: 'none', padding: 0}} value={backgroundColor.toUpperCase()} readOnly />
              </div>
          </div>
      </div>

      <div className="settings-section-title">Block Style</div>
      <div className="settings-section-title" style={{paddingTop: 0, fontSize: 11}}>Margin</div>
      <div className="settings-control">
          <div className="spacing-grid">
               <div className="spacing-box">
                   <label>Top</label>
                   <input type="number" value={margin[0]} onChange={(e) => handleSpacingChange(0, parseInt(e.target.value) || 0)} />
               </div>
               <div className="spacing-box">
                    <label>Right</label>
                    <input type="number" value={margin[1]} onChange={(e) => handleSpacingChange(1, parseInt(e.target.value) || 0)} />
                </div>
          </div>
      </div>

       <div className="settings-section-title" style={{paddingTop: 0, fontSize: 11}}>Border Radius</div>
       <div className="settings-control">
            <input type="number" className="input-field" value={borderRadius} onChange={(e) => setProp(props => props.borderRadius = parseInt(e.target.value))} />
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
