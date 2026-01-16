import React from 'react';
import { Topbar } from './Topbar';
import { Toolbox } from './Toolbox';
import { SettingsPanel } from './SettingsPanel';

export const Viewport = ({ children }) => {
  return (
    <div className="viewport">
      <Topbar />
      <div className="editor-container">
        <div className="left-panel">
           <Toolbox />
        </div>
        
        <div className="center-panel">
            <div className="mobile-view-wrapper">
                <div className="mobile-notch"></div>
                <div className="craftjs-canvas-host">
                    {children}
                </div>
            </div>
        </div>

        <div className="right-panel">
            <SettingsPanel />
        </div>
      </div>
    </div>
  );
};
