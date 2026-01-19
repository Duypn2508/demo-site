import React, { useEffect, useRef, useCallback } from 'react';
import { useEditor, useNode } from '@craftjs/core';
import { Move, Settings, Trash2 } from 'lucide-react';
import ReactDOM from 'react-dom';

export const RenderNode = ({ render }) => {
  const { id } = useNode();
  const { actions, query, isActive } = useEditor((state, query) => ({
    isActive: query.getEvent('selected').contains(id),
  }));

  const {
    isHovered,
    dom,
    name,
    connectors: { drag },
    actions: { setProp },
  } = useNode((node) => ({
    isHovered: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName || node.data.type.name,
  }));

  const currentRef = useRef(null);

  useEffect(() => {
    if (dom) {
      if (isActive || isHovered) {
        dom.classList.add('component-hover');
      } else {
          dom.classList.remove('component-hover');
      }
      if (isActive) {
          dom.classList.add('component-selected');
      } else {
          dom.classList.remove('component-selected');
      }
    }
  }, [dom, isActive, isHovered]);

  const getPos = useCallback((dom) => {
    const { top, right, bottom } = dom ? dom.getBoundingClientRect() : { top: 0, right: 0, bottom: 0 };
    return {
      top: `${top > 0 ? top : bottom}px`,
      left: `${right}px`,
    };
  }, []);

  const scrollParent = useRef(null);

  return (
    <>
      {(isHovered || isActive) && dom
        ? ReactDOM.createPortal(
            <div
              className="hover-toolbar"
              style={{
                left: getPos(dom).left,
                top: getPos(dom).top,
                transform: 'translate(-100%, -100%)',
              }}
            >
              <div style={{ flex: 1, marginRight: 2, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', opacity: 0.7 }}>
                  {name}
              </div>
              <button 
                className="toolbar-btn" 
                ref={drag}
                style={{ cursor: 'move' }}
              >
                  <Move size={14} />
              </button>
              <button 
                className="toolbar-btn"
                onClick={() => actions.selectNode(id)}
              >
                  <Settings size={14} />
              </button>
              {id !== 'ROOT' && (
                <button 
                    className="toolbar-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        actions.delete(id);
                    }}
                >
                    <Trash2 size={14} />
                </button>
              )}
            </div>,
            document.body
          )
        : null}
      {render}
    </>
  );
};
