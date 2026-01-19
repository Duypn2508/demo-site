import React from 'react';
import { useEditor } from '@craftjs/core';

export const SettingsPanel = () => {
  const { actions, selected } = useEditor((state, query) => {
    const [currentNodeId] = state.events.selected;
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.displayName || state.nodes[currentNodeId].data.type.name,
        settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected
    };
  });

  return (
    <div className="right-panel">
      {selected ? (
        <>
            <div className="settings-header">
                {selected.name === 'Text' ? 'Edit Text in Image Block' : `${selected.name} Settings`}
            </div>
            <div className="settings-container">
                {selected.settings && React.createElement(selected.settings)}
            </div>
        </>
      ) : (
          <div className="empty-state">
               <div style={{marginTop: 50}}>
                    <p>Select a block</p>
                    <p>to edit</p>
               </div>
          </div>
      )}
    </div>
  );
};
