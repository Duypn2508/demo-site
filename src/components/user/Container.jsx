import React from 'react';
import { useNode } from '@craftjs/core';

const getSpacing = (spacing) => {
    if (Array.isArray(spacing) && spacing.length === 4) return `${spacing[0]}px ${spacing[1]}px ${spacing[2]}px ${spacing[3]}px`;
    if (typeof spacing === 'number') return `${spacing}px`; 
    return '0px';
}

export const Container = ({ background, padding = [0,0,0,0], width, height, flexDirection, alignItems, justifyContent, children, margin = [0,0,0,0], borderRadius, shadow, backgroundImage }) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      style={{
        background: backgroundImage ? `url(${backgroundImage}) center/cover no-repeat` : background,
        padding: getSpacing(padding),
        margin: getSpacing(margin),
        width: width === '100%' ? '100%' : `${width}px`,
        height: height === 'auto' ? 'auto' : `${height}px`,
        display: 'flex',
        flexDirection,
        alignItems,
        justifyContent,
        borderRadius: `${borderRadius}px`,
        boxShadow: shadow === 'none' ? 'none' : '0px 3px 6px rgba(0,0,0,0.1)',
        minHeight: '20px',
      }}
    >
      {children}
    </div>
  );
};

export const ContainerSettings = () => {
    const { actions: { setProp }, background, padding, width, flexDirection, margin, borderRadius, backgroundImage } = useNode((node) => ({
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
            <div className="settings-section-title">Container Settings</div>
            
            <div className="settings-control">
                 <div className="settings-section-title" style={{padding: '0 0 8px 0', fontSize: 11}}>Background</div>
                 <div className="color-input-wrapper">
                      <div className="color-swatch" style={{background: background}}>
                          <input type="color" value={background} onChange={(e) => setProp(props => props.background = e.target.value)} />
                      </div>
                      <input type="text" className="input-field" style={{background: 'none', padding: 0}} value={background.toUpperCase()} readOnly />
                      <div className="opacity-input">100%</div>
                  </div>
            </div>

            <div className="settings-section-title">Block Style</div>
            
            <div className="settings-section-title" style={{paddingTop: 0, fontSize: 11}}>Margin</div>
            <div className="settings-control">
                <div className="spacing-grid">
                    <div className="spacing-box">
                        <label>Top</label>
                        <input type="number" value={margin[0]} onChange={(e) => handleSpacingChange('margin', 0, parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="spacing-box">
                        <label>Right</label>
                        <input type="number" value={margin[1]} onChange={(e) => handleSpacingChange('margin', 1, parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="spacing-box">
                        <label>Bottom</label>
                        <input type="number" value={margin[2]} onChange={(e) => handleSpacingChange('margin', 2, parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="spacing-box">
                        <label>Left</label>
                        <input type="number" value={margin[3]} onChange={(e) => handleSpacingChange('margin', 3, parseInt(e.target.value) || 0)} />
                    </div>
                </div>
            </div>

            <div className="settings-section-title" style={{paddingTop: 0, fontSize: 11}}>Padding</div>
             <div className="settings-control">
                <div className="spacing-grid">
                    <div className="spacing-box">
                        <label>Top</label>
                        <input type="number" value={padding[0]} onChange={(e) => handleSpacingChange('padding', 0, parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="spacing-box">
                        <label>Right</label>
                        <input type="number" value={padding[1]} onChange={(e) => handleSpacingChange('padding', 1, parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="spacing-box">
                        <label>Bottom</label>
                        <input type="number" value={padding[2]} onChange={(e) => handleSpacingChange('padding', 2, parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="spacing-box">
                        <label>Left</label>
                        <input type="number" value={padding[3]} onChange={(e) => handleSpacingChange('padding', 3, parseInt(e.target.value) || 0)} />
                    </div>
                </div>
            </div>

            <div className="settings-section-title" style={{paddingTop: 0, fontSize: 11}}>Direction</div>
            <div className="settings-control">
                 <select className="select-field" style={{width: '100%'}} value={flexDirection} onChange={(e) => setProp(props => props.flexDirection = e.target.value)}>
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
