import React from 'react';
import { useNode } from '@craftjs/core';


const getSpacing = (spacing) => {
    if (Array.isArray(spacing) && spacing.length === 4) return `${spacing[0]}px ${spacing[1]}px ${spacing[2]}px ${spacing[3]}px`;
    if (typeof spacing === 'number') return `${spacing}px`; 
    return '0px';
}

export const UserImage = ({ src, width, height, objectFit, borderRadius, margin = [0,0,0,0], padding = [0,0,0,0] }) => {
     const { connectors: { connect, drag }, selected } = useNode((state) => ({
    selected: state.events.selected,
  }));

  return (
      <div 
        ref={ref => connect(drag(ref))} 
        style={{
            display: 'inline-block',
            margin: getSpacing(margin),
            padding: getSpacing(padding),
            border: selected ? '2px solid #2684FF' : '2px solid transparent', // Highlight container
            lineHeight: 0 // fixes weird image spacing
        }}
    >
        <img 
            src={src || 'https://via.placeholder.com/150'} 
            style={{
                width: width, 
                height: height, 
                objectFit, 
                borderRadius: `${borderRadius}px`,
                maxWidth: '100%',
                display: 'block'
            }} 
        />
      </div>
  )
}

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

export const ImageSettings = () => {
     const { actions: { setProp }, src, width, height, borderRadius, objectFit, margin, padding } = useNode((node) => ({
        src: node.data.props.src,
        width: node.data.props.width,
        height: node.data.props.height,
        borderRadius: node.data.props.borderRadius,
        objectFit: node.data.props.objectFit,
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
        <div>
             <div className="panel-section">
                <label>Image URL</label>
                 <input type="text" value={src} onChange={(e) => setProp(props => props.src = e.target.value)} />
            </div>
             <div className="panel-section">
                 <label>Width</label>
                 <input type="text" value={width} onChange={(e) => setProp(props => props.width = e.target.value)} />
            </div>
             <div className="panel-section">
                 <label>Height</label>
                 <input type="text" value={height} onChange={(e) => setProp(props => props.height = e.target.value)} />
            </div>
             <div className="panel-section">
                <label>Fit</label>
                 <select value={objectFit} onChange={(e) => setProp(props => props.objectFit = e.target.value)}>
                    <option value="cover">Cover</option>
                    <option value="contain">Contain</option>
                    <option value="fill">Fill</option>
                 </select>
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
        </div>
    )
}

UserImage.craft = {
    props: {
        src: 'https://via.placeholder.com/300x200',
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        borderRadius: 0,
        margin: [0, 0, 0, 0],
        padding: [0, 0, 0, 0]
    },
    related: {
        settings: ImageSettings
    }
}
