import React from 'react';
import { useNode } from '@craftjs/core';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

const getSpacing = (spacing) => {
    if (Array.isArray(spacing) && spacing.length === 4) return `${spacing[0]}px ${spacing[1]}px ${spacing[2]}px ${spacing[3]}px`;
    if (typeof spacing === 'number') return `${spacing}px`; 
    return '0px';
}

export const Text = ({ text, fontSize, textAlign, color, fontWeight, margin = [0,0,0,0], padding = [0,0,0,0] }) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      style={{
        fontSize: `${fontSize}px`,
        textAlign,
        color,
        fontWeight,
        margin: getSpacing(margin),
        padding: getSpacing(padding),
      }}
    >
      {text}
    </div>
  );
};

export const TextSettings = () => {
    const { actions: { setProp }, fontSize, textAlign, color, text, fontWeight, margin } = useNode((node) => ({
        text: node.data.props.text,
        fontSize: node.data.props.fontSize,
        textAlign: node.data.props.textAlign,
        color: node.data.props.color,
        fontWeight: node.data.props.fontWeight,
        margin: node.data.props.margin,
    }));

    const handleSpacingChange = (index, value) => {
        setProp(props => {
            props.margin[index] = value;
        });
    }

    return (
    <div>
      <div className="settings-section-title">Text Content</div>
      <div className="settings-control">
          <textarea 
            className="input-field" 
            rows={2} 
            value={text} 
            onChange={(e) => setProp(props => props.text = e.target.value)} 
          />
      </div>

      <div className="settings-control">
          <div className="input-row">
              <input 
                type="number" 
                className="input-field" 
                style={{maxWidth: 80}}
                value={fontSize} 
                onChange={(e) => setProp(props => props.fontSize = parseInt(e.target.value))} 
              />
              <span style={{fontSize: 12, color: '#888'}}>px</span>
              <select 
                className="select-field" 
                style={{flex: 1}}
                value={fontWeight} 
                onChange={(e) => setProp(props => props.fontWeight = e.target.value)}
              >
                  <option value="normal">Regular</option>
                  <option value="bold">Bold</option>
              </select>
          </div>
      </div>

      <div className="settings-control">
          <div className="input-row">
              <div className="color-input-wrapper">
                  <div className="color-swatch" style={{background: color}}>
                      <input type="color" value={color} onChange={(e) => setProp(props => props.color = e.target.value)} />
                  </div>
                  <input type="text" className="input-field" style={{background: 'none', padding: 0}} value={color.toUpperCase()} readOnly />
                  <div className="opacity-input">100%</div>
              </div>
          </div>
      </div>

      <div className="settings-control">
          <div className="toggle-group">
               <button className={`toggle-item ${textAlign === 'left' ? 'active' : ''}`} onClick={() => setProp(props => props.textAlign = 'left')}><AlignLeft size={16} /></button>
               <button className={`toggle-item ${textAlign === 'center' ? 'active' : ''}`} onClick={() => setProp(props => props.textAlign = 'center')}><AlignCenter size={16} /></button>
               <button className={`toggle-item ${textAlign === 'right' ? 'active' : ''}`} onClick={() => setProp(props => props.textAlign = 'right')}><AlignRight size={16} /></button>
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
               <div className="spacing-box">
                   <label>Bottom</label>
                   <input type="number" value={margin[2]} onChange={(e) => handleSpacingChange(2, parseInt(e.target.value) || 0)} />
               </div>
               <div className="spacing-box">
                   <label>Left</label>
                   <input type="number" value={margin[3]} onChange={(e) => handleSpacingChange(3, parseInt(e.target.value) || 0)} />
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
    color: '#333333',
    fontWeight: 'normal',
    margin: [0, 0, 0, 0],
    padding: [0, 0, 0, 0]
  },
  related: {
    settings: TextSettings,
  },
};
