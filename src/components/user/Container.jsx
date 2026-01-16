import React from 'react';
import { useNode } from '@craftjs/core';

const getSpacing = (spacing) => {
    if (Array.isArray(spacing) && spacing.length === 4) return `${spacing[0]}px ${spacing[1]}px ${spacing[2]}px ${spacing[3]}px`;
    if (typeof spacing === 'number') return `${spacing}px`; 
    // console.warn('Invalid spacing prop:', spacing); // Useful for debug
    return '0px';
}

export const Container = ({ background, padding = [0,0,0,0], width, height, flexDirection, alignItems, justifyContent, children, margin = [0,0,0,0], borderRadius, shadow, backgroundImage }) => {
  const { connectors: { connect, drag }, selected } = useNode((state) => ({
    selected: state.events.selected,
  }));

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      style={{
        background: backgroundImage ? `url(${backgroundImage}) center/cover no-repeat` : background,
        padding: getSpacing(padding),
        margin: getSpacing(margin),
        width: width,
        height: height === 'auto' ? 'auto' : `${height}px`,
        display: 'flex',
        flexDirection,
        alignItems,
        justifyContent,
        borderRadius: `${borderRadius}px`,
        boxShadow: shadow === 'none' ? 'none' : '0px 3px 6px rgba(0,0,0,0.1)',
        border: selected ? '2px solid #2684FF' : '1px dashed #e0e0e0',
        minHeight: '50px',
      }}
    >
      {children}
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

export const ContainerSettings = () => {
    const { actions: { setProp }, background, padding, width, height, flexDirection, margin, borderRadius, backgroundImage } = useNode((node) => ({
        background: node.data.props.background,
        padding: node.data.props.padding,
        width: node.data.props.width,
        height: node.data.props.height,
        flexDirection: node.data.props.flexDirection,
        margin: node.data.props.margin,
        borderRadius: node.data.props.borderRadius,
        backgroundImage: node.data.props.backgroundImage,
    }));
    
    const handleSpacingChange = (type, index, value) => {
        setProp(props => {
            props[type][index] = value;
        });
    }

    return (
        <div>
            <div className="panel-section">
                <label>Background Color</label>
                 <input type="color" value={background} onChange={(e) => setProp(props => props.background = e.target.value)} />
            </div>
             <div className="panel-section">
                <label>Background Image</label>
                 <input type="text" placeholder="Image URL" value={backgroundImage || ''} onChange={(e) => setProp(props => props.backgroundImage = e.target.value)} />
            </div>
             
             <div className="panel-section">
                <label>Padding (T-R-B-L)</label>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 5}}>
                    <SpacingInput label="Top" value={padding[0]} onChange={(val) => handleSpacingChange('padding', 0, val)} />
                    <SpacingInput label="Right" value={padding[1]} onChange={(val) => handleSpacingChange('padding', 1, val)} />
                    <SpacingInput label="Bottom" value={padding[2]} onChange={(val) => handleSpacingChange('padding', 2, val)} />
                    <SpacingInput label="Left" value={padding[3]} onChange={(val) => handleSpacingChange('padding', 3, val)} />
                </div>
            </div>

             <div className="panel-section">
                <label>Margin (T-R-B-L)</label>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 5}}>
                    <SpacingInput label="Top" value={margin[0]} onChange={(val) => handleSpacingChange('margin', 0, val)} />
                    <SpacingInput label="Right" value={margin[1]} onChange={(val) => handleSpacingChange('margin', 1, val)} />
                    <SpacingInput label="Bottom" value={margin[2]} onChange={(val) => handleSpacingChange('margin', 2, val)} />
                    <SpacingInput label="Left" value={margin[3]} onChange={(val) => handleSpacingChange('margin', 3, val)} />
                </div>
            </div>

             <div className="panel-section">
                 <label>Direction</label>
                 <select value={flexDirection} onChange={(e) => setProp(props => props.flexDirection = e.target.value)}>
                    <option value="column">Column</option>
                    <option value="row">Row</option>
                 </select>
            </div>
             <div className="panel-section">
                <label>Radius</label>
                 <input type="number" value={borderRadius} onChange={(e) => setProp(props => props.borderRadius = e.target.value)} />
            </div>
        </div>
    )
}

Container.craft = {
  props: {
    background: '#ffffff',
    backgroundImage: '', // Default no image
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
