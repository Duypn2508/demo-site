import React from 'react';
import { useEditor } from '@craftjs/core';

export const SettingsPanel = () => {
  const { actions, selected, isEnabled } = useEditor((state, query) => {
    const [currentNodeId] = state.events.selected;
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
      isEnabled: state.options.enabled,
    };
  });

  if (!isEnabled) return null;

  return (
    <div className="settings-panel">
      <div className="settings-header">
        <h3>{selected ? 'Edit Component' : 'Page Settings'}</h3>
      </div>
      
      {selected ? (
        <div className="settings-content">
          {selected.settings && React.createElement(selected.settings)}
          
          {selected.isDeletable && (
            <button 
                className="delete-btn"
                onClick={() => {
                    actions.delete(selected.id);
                }}
            >
                Delete Component
            </button>
          )}
        </div>
      ) : (
          <div className="empty-state">
              Click an element to edit styles.
          </div>
      )}
    </div>
  );
};
