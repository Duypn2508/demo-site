import React, { useState } from 'react';
import { Topbar } from './Topbar';
import { Toolbox } from './Toolbox';
import { SettingsPanel } from './SettingsPanel';
import { useEditor } from '@craftjs/core';

export const Viewport = ({ children }) => {
  const { connectors, actions } = useEditor();
  const [device, setDevice] = useState('mobile');

  return (
    <div className="viewport">
      <Topbar setDevice={setDevice} device={device} />
      <div className="editor-container">
        <Toolbox />
        
        <div className="center-panel" onClick={(e) => {
            if (e.target === e.currentTarget) {
                actions.selectNode(null);
            }
        }}>
            <div className={`frame-${device}`}>
                 <div 
                    className="craftjs-canvas-host"
                    ref={(ref) => connectors.select(connectors.hover(ref, null), null)}
                 >
                    {children}
                 </div>
            </div>
        </div>

        <SettingsPanel />
      </div>
    </div>
  );
};
