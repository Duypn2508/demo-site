import React from 'react';
import { useEditor } from '@craftjs/core';
import { 
    Monitor, 
    Tablet, 
    Smartphone, 
    Undo2, 
    Redo2, 
    Play, 
    ChevronLeft 
} from 'lucide-react';

export const Topbar = ({ device, setDevice }) => {
  const { actions, query, canUndo, canRedo } = useEditor((state, query) => ({
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));

  return (
    <div className="topbar">
      <div className="topbar-left">
          <button className="history-btn"><ChevronLeft size={18} /></button>
          <div className="site-name">
              Site Name 
              <span className="draft-badge">Draft</span>
          </div>
          <div className="history-controls">
              <button 
                className="history-btn" 
                onClick={() => actions.history.undo()}
                disabled={!canUndo}
              >
                  <Undo2 size={18} />
              </button>
              <button 
                className="history-btn" 
                onClick={() => actions.history.redo()}
                disabled={!canRedo}
              >
                  <Redo2 size={18} />
              </button>
          </div>
      </div>

      <div className="topbar-center">
          <div className="device-toggles-wrapper">
              <button 
                className={`device-btn ${device === 'desktop' ? 'active' : ''}`}
                onClick={() => setDevice('desktop')}
              >
                  <Monitor size={18} />
              </button>
              <button 
                className={`device-btn ${device === 'tablet' ? 'active' : ''}`}
                onClick={() => setDevice('tablet')}
              >
                  <Tablet size={18} />
              </button>
              <button 
                className={`device-btn ${device === 'mobile' ? 'active' : ''}`}
                onClick={() => setDevice('mobile')}
              >
                  <Smartphone size={18} />
              </button>
          </div>
      </div>

      <div className="topbar-right">
          <button className="history-btn" style={{marginRight: 10, fontSize: 13}}>
              Preview <Play size={14} style={{marginLeft: 5, fill: 'currentColor'}} />
          </button>
          <button className="btn-save" style={{marginRight: 10}} onClick={() => console.log(query.serialize())}>Save</button>
          <button className="btn-publish">Publish</button>
      </div>
    </div>
  );
};
