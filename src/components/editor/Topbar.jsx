import React from 'react';
import { useEditor } from '@craftjs/core';
import { Play, Square, Save, Smartphone } from 'lucide-react';

export const Topbar = () => {
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <div className="topbar">
      <div className="logo">
         <span style={{fontWeight:'bold'}}>Craft Demo</span>
      </div>
      
      <div className="device-toggles">
          <button className="device-btn active"><Smartphone size={18} /></button>
          {/* Add more device icons if needed */}
      </div>

      <div className="actions" style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
        <button 
            className={`action-btn ${enabled ? 'preview-mode' : 'edit-mode'}`}
            onClick={() => {
                actions.setOptions(options => options.enabled = !enabled);
            }}
        >
          {enabled ? <Play size={16} style={{marginRight: 5}} /> : <Square size={16} fill="currentColor" style={{marginRight: 5}} />}
          {enabled ? 'Preview' : 'Edit'}
        </button>
        <button className="action-btn save-btn" onClick={() => {
            const json = query.serialize();
            console.log(json);
            alert('State logged to console');
        }}>
            <Save size={16} style={{marginRight: 5}} />
            Save
        </button>
      </div>
    </div>
  );
};
