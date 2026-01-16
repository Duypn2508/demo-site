import React from 'react';
import { useNode } from '@craftjs/core';


const getSpacing = (spacing) => {
    if (Array.isArray(spacing) && spacing.length === 4) return `${spacing[0]}px ${spacing[1]}px ${spacing[2]}px ${spacing[3]}px`;
    if (typeof spacing === 'number') return `${spacing}px`; 
    return '0px';
}

export const Button = ({ text, color, backgroundColor, margin = [0,0,0,0], padding = [10,20,10,20], borderRadius }) => {
  const { connectors: { connect, drag }, selected } = useNode((state) => ({
    selected: state.events.selected,
  }));

  return (
    <button
      ref={(ref) => connect(drag(ref))}
      style={{
        color,
        backgroundColor,
        padding: getSpacing(padding),
        margin: getSpacing(margin),
        borderRadius: `${borderRadius}px`,
        border: selected ? '2px solid #2684FF' : 'none',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 500
      }}
    >
      {text}
    </button>
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

export const ButtonSettings = () => {
  const { actions: { setProp }, text, color, backgroundColor, margin, padding, borderRadius } = useNode((node) => ({
    text: node.data.props.text,
    color: node.data.props.color,
    backgroundColor: node.data.props.backgroundColor,
    margin: node.data.props.margin,
    padding: node.data.props.padding,
    borderRadius: node.data.props.borderRadius
  }));

  const handleSpacingChange = (type, index, value) => {
      setProp(props => {
          if (!props[type]) props[type] = [0,0,0,0];
          props[type][index] = value;
      });
  }

  return (
    <div>
      <div className="panel-section">
        <label>Text</label>
        <input type="text" value={text} onChange={(e) => setProp(props => props.text = e.target.value)} />
      </div>
      <div className="panel-section">
        <label>Text Color</label>
        <input type="color" value={color} onChange={(e) => setProp(props => props.color = e.target.value)} />
      </div>
      <div className="panel-section">
        <label>Background</label>
        <input type="color" value={backgroundColor} onChange={(e) => setProp(props => props.backgroundColor = e.target.value)} />
      </div>
       <div className="panel-section">
        <label>Radius</label>
        <input type="number" value={borderRadius} onChange={(e) => setProp(props => props.borderRadius = e.target.value)} />
      </div>
      
       <div className="panel-section">
        <label>Padding</label>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 5}}>
            <SpacingInput label="Top" value={padding?.[0] || 0} onChange={(val) => handleSpacingChange('padding', 0, val)} />
            <SpacingInput label="Right" value={padding?.[1] || 0} onChange={(val) => handleSpacingChange('padding', 1, val)} />
            <SpacingInput label="Bottom" value={padding?.[2] || 0} onChange={(val) => handleSpacingChange('padding', 2, val)} />
            <SpacingInput label="Left" value={padding?.[3] || 0} onChange={(val) => handleSpacingChange('padding', 3, val)} />
        </div>
      </div>

       <div className="panel-section">
        <label>Margin</label>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 5}}>
            <SpacingInput label="Top" value={margin?.[0] || 0} onChange={(val) => handleSpacingChange('margin', 0, val)} />
            <SpacingInput label="Right" value={margin?.[1] || 0} onChange={(val) => handleSpacingChange('margin', 1, val)} />
            <SpacingInput label="Bottom" value={margin?.[2] || 0} onChange={(val) => handleSpacingChange('margin', 2, val)} />
            <SpacingInput label="Left" value={margin?.[3] || 0} onChange={(val) => handleSpacingChange('margin', 3, val)} />
        </div>
      </div>
    </div>
  );
};

Button.craft = {
  props: {
    text: 'Click Me',
    color: '#ffffff',
    backgroundColor: '#00bf63',
    margin: [0, 0, 0, 0],
    padding: [10, 20, 10, 20],
    borderRadius: 5
  },
  related: {
    settings: ButtonSettings,
  },
};
