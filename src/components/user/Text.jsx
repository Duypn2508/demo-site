import React from 'react';
import { useNode } from '@craftjs/core';


const getSpacing = (spacing) => {
    if (Array.isArray(spacing) && spacing.length === 4) return `${spacing[0]}px ${spacing[1]}px ${spacing[2]}px ${spacing[3]}px`;
    if (typeof spacing === 'number') return `${spacing}px`; 
    return '0px';
}

export const Text = ({ text, fontSize, textAlign, color, fontWeight, margin = [0,0,0,0], padding = [0,0,0,0] }) => {
  const { connectors: { connect, drag }, selected } = useNode((state) => ({
    selected: state.events.selected,
  }));

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
        border: selected ? '2px solid #2684FF' : '2px solid transparent', // Highlight on select
      }}
    >
      {text}
    </div>
  );
};

const SpacingInput = ({ label, value, onChange }) => (
    <div className="spacing-control">
         <div style={{fontSize: 10, color: '#888', marginBottom: 2}}>{label}</div>
         <input 
            type="number" 
            value={value} 
            onChange={(e) => onChange(parseInt(e.target.value) || 0)}
            style={{width: '100%', padding: '4px', fontSize: 12}}
        />
    </div>
)

export const TextSettings = () => {
    const { actions: { setProp }, fontSize, textAlign, color, text, fontWeight, margin, padding } = useNode((node) => ({
        text: node.data.props.text,
        fontSize: node.data.props.fontSize,
        textAlign: node.data.props.textAlign,
        color: node.data.props.color,
        fontWeight: node.data.props.fontWeight,
        margin: node.data.props.margin,
        padding: node.data.props.padding,
    }));

    const handleSpacingChange = (type, index, value) => {
        setProp(props => {
            if (!props[type]) props[type] = [0,0,0,0]; // Ensure array exists
            props[type][index] = value;
        });
    }

    return (
    <>
      <div className="panel-section">
        <label>Text</label>
        <input 
            type="text" 
            value={text} 
            onChange={(e) => setProp(props => props.text = e.target.value)} 
        />
      </div>
      <div className="panel-section">
        <label>Font Size</label>
        <input 
            type="range" 
            min="10" max="50" 
            value={fontSize || 14} 
            onChange={(e) => setProp(props => props.fontSize = e.target.value)} 
        />
        <span>{fontSize}px</span>
      </div>
      <div className="panel-section">
        <label>Color</label>
        <input 
            type="color" 
            value={color || '#000000'} 
            onChange={(e) => setProp(props => props.color = e.target.value)} 
        />
      </div>
      <div className="panel-section">
        <label>Weight</label>
        <select value={fontWeight || 'normal'} onChange={(e) => setProp(props => props.fontWeight = e.target.value)}>
             <option value="normal">Normal</option>
             <option value="bold">Bold</option>
             <option value="500">Medium</option>
        </select>
      </div>
      <div className="panel-section">
        <label>Align</label>
        <div className="radio-group">
            <button className={textAlign === 'left' ? 'active' : ''} onClick={() => setProp(props => props.textAlign = 'left')}>L</button>
            <button className={textAlign === 'center' ? 'active' : ''} onClick={() => setProp(props => props.textAlign = 'center')}>C</button>
            <button className={textAlign === 'right' ? 'active' : ''} onClick={() => setProp(props => props.textAlign = 'right')}>R</button>
        </div>
      </div>
      
       <div className="panel-section">
        <label>Padding (T-R-B-L)</label>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 5}}>
            <SpacingInput label="Top" value={padding?.[0] || 0} onChange={(val) => handleSpacingChange('padding', 0, val)} />
            <SpacingInput label="Right" value={padding?.[1] || 0} onChange={(val) => handleSpacingChange('padding', 1, val)} />
            <SpacingInput label="Bottom" value={padding?.[2] || 0} onChange={(val) => handleSpacingChange('padding', 2, val)} />
            <SpacingInput label="Left" value={padding?.[3] || 0} onChange={(val) => handleSpacingChange('padding', 3, val)} />
        </div>
      </div>

       <div className="panel-section">
        <label>Margin (T-R-B-L)</label>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 5}}>
            <SpacingInput label="Top" value={margin?.[0] || 0} onChange={(val) => handleSpacingChange('margin', 0, val)} />
            <SpacingInput label="Right" value={margin?.[1] || 0} onChange={(val) => handleSpacingChange('margin', 1, val)} />
            <SpacingInput label="Bottom" value={margin?.[2] || 0} onChange={(val) => handleSpacingChange('margin', 2, val)} />
            <SpacingInput label="Left" value={margin?.[3] || 0} onChange={(val) => handleSpacingChange('margin', 3, val)} />
        </div>
      </div>
    </>
  );
};

Text.craft = {
  props: {
    text: 'Hi there',
    fontSize: 16,
    textAlign: 'left',
    color: '#000000',
    fontWeight: 'normal',
    margin: [0, 0, 0, 0],
    padding: [0, 0, 0, 0]
  },
  related: {
    settings: TextSettings,
  },
};
