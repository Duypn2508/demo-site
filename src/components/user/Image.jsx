import React from 'react';
import { useNode } from '@craftjs/core';
import { Image as ImageIcon, X } from 'lucide-react';

const getSpacing = (spacing) => {
    if (Array.isArray(spacing) && spacing.length === 4) return `${spacing[0]}px ${spacing[1]}px ${spacing[2]}px ${spacing[3]}px`;
    if (typeof spacing === 'number') return `${spacing}px`; 
    return '0px';
}

export const UserImage = ({ src, width, height, objectFit, borderRadius, margin = [0,0,0,0], padding = [0,0,0,0] }) => {
  const { connectors: { connect, drag } } = useNode();

  return (
      <div 
        ref={ref => connect(drag(ref))} 
        style={{
            display: 'inline-block',
            margin: getSpacing(margin),
            padding: getSpacing(padding),
            lineHeight: 0,
            width: width === '100%' ? '100%' : `${width}px`,
        }}
      >
        <img 
            src={src || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400'} 
            style={{
                width: '100%',
                height: height === 'auto' ? 'auto' : `${height}px`,
                objectFit,
                borderRadius: `${borderRadius}px`,
            }} 
            alt="user"
        />
      </div>
  );
};

export const ImageSettings = () => {
    const { actions: { setProp }, src, width, borderRadius, margin } = useNode((node) => ({
        src: node.data.props.src,
        width: node.data.props.width,
        borderRadius: node.data.props.borderRadius,
        margin: node.data.props.margin,
    }));

    const handleSpacingChange = (index, value) => {
        setProp(props => {
            props.margin[index] = value;
        });
    }

    return (
        <div>
            <div className="settings-section-title">Image</div>
            <div className="settings-control">
                <button className="btn-save" style={{width: '100%', borderRadius: 12, padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8}}>
                    Select Image <ImageIcon size={16} />
                </button>
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

            <div className="settings-section-title" style={{paddingTop: 0, fontSize: 11}}>Width</div>
            <div className="settings-control">
                <div className="input-row">
                    <input 
                        type="number" 
                        className="input-field" 
                        value={width === '100%' ? 100 : width} 
                        onChange={(e) => setProp(props => props.width = parseInt(e.target.value))} 
                    />
                    <span style={{fontSize: 12, color: '#888'}}>px</span>
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
