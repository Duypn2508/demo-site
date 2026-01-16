import React from 'react';
import { useEditor, Element } from '@craftjs/core';
import { Container, Text, UserImage, Button } from '../user';

export const Toolbox = () => {
  const { connectors } = useEditor();

  return (
    <div className="toolbox">
      <div className="toolbox-section">
        <h3>Layout</h3>
        <div className="toolbox-grid">
            {/* We must wrap Container in Element with canvas={true} to make it a dropzone */}
            <button ref={ref => connectors.create(ref, <Element is={Container} style={{}} background="#f0f0f0" width="100%" height="auto" canvas />)} className="toolbox-item">
                <div className="icon-box header-icon"></div>
                <span>Container</span>
            </button>
            <button ref={ref => connectors.create(ref, <Element is={Container} style={{}} flexDirection="row" width="100%" height="auto" canvas />)} className="toolbox-item">
                <div className="icon-box footer-icon"></div>
                <span>Row</span>
            </button>
        </div>
      </div>

       <div className="toolbox-section">
        <h3>Text</h3>
        <div className="toolbox-grid">
            <button ref={ref => connectors.create(ref, <Text text="Title" fontSize={24} fontWeight="bold" />)} className="toolbox-item">
                <div className="icon-box text-icon"></div>
                <span>Title</span>
            </button>
            <button ref={ref => connectors.create(ref, <Text text="Start typing..." fontSize={14} />)} className="toolbox-item">
                 <div className="icon-box text-icon"></div>
                <span>Text</span>
            </button>
        </div>
      </div>

      <div className="toolbox-section">
        <h3>Media</h3>
        <div className="toolbox-grid">
            <button ref={ref => connectors.create(ref, <UserImage />)} className="toolbox-item">
                <div className="icon-box image-icon"></div>
                <span>Image</span>
            </button>
             <button ref={ref => connectors.create(ref, <Button />)} className="toolbox-item">
                <div className="icon-box button-icon" style={{background: '#00bf63'}}></div>
                <span>Button</span>
            </button>
        </div>
      </div>
    </div>
  );
};
