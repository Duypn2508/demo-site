import React from 'react';
import { useEditor, Element } from '@craftjs/core';
import { Container, Text, UserImage, Button } from '../user';

const ToolboxCard = ({ label, icon, createAction }) => {
    const { connectors } = useEditor();
    return (
        <div 
            ref={ref => connectors.create(ref, createAction)}
            className="toolbox-card"
        >
            <div className="toolbox-card-preview">
                {icon}
            </div>
            <div className="toolbox-card-label">{label}</div>
        </div>
    )
}

const LayoutPreview = ({ dark }) => (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ height: 6, width: '70%', background: dark ? '#555' : '#ddd', borderRadius: 3 }}></div>
        <div style={{ display: 'flex', gap: 4 }}>
             <div style={{ height: 4, width: '20%', background: dark ? '#444' : '#eee', borderRadius: 2 }}></div>
             <div style={{ height: 4, width: '20%', background: dark ? '#444' : '#eee', borderRadius: 2 }}></div>
             <div style={{ height: 4, width: '20%', background: dark ? '#444' : '#eee', borderRadius: 2 }}></div>
        </div>
    </div>
)

const TextPreview = ({ title }) => (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ height: 6, width: title ? '40%' : '80%', background: '#333', borderRadius: 3 }}></div>
        {!title && <div style={{ height: 4, width: '70%', background: '#ddd', borderRadius: 2 }}></div>}
        {!title && <div style={{ height: 4, width: '90%', background: '#ddd', borderRadius: 2 }}></div>}
    </div>
)

export const Toolbox = () => {
  return (
    <div className="left-panel">
      <div className="toolbox-header">Add Block</div>
      
      <div className="toolbox-category">
          <div className="toolbox-category-title">Layout</div>
          <div className="toolbox-grid">
              <ToolboxCard 
                label="Header" 
                icon={<LayoutPreview />}
                createAction={<Element is={Container} padding={[20,20,20,20]} background="#f8f8f8" canvas />}
              />
              <ToolboxCard 
                label="Footer" 
                icon={<div style={{width: '100%', height: 40, background: '#333', borderRadius: 4, display: 'flex', alignItems: 'center', padding: 8}}><LayoutPreview dark /></div>}
                createAction={<Element is={Container} padding={[20,20,20,20]} background="#333" canvas />}
              />
          </div>
      </div>

      <div className="toolbox-category">
          <div className="toolbox-category-title">Text</div>
          <div className="toolbox-grid">
              <ToolboxCard 
                label="Text" 
                icon={<TextPreview />}
                createAction={<Text text="Enter text here" fontSize={14} />}
              />
              <ToolboxCard 
                label="Title" 
                icon={<TextPreview title />}
                createAction={<Text text="Title" fontSize={24} fontWeight="bold" />}
              />
          </div>
      </div>

      <div className="toolbox-category">
          <div className="toolbox-category-title">Link</div>
          <div className="toolbox-grid">
              <ToolboxCard 
                label="Link" 
                icon={<div style={{width: '60%', height: 6, background: '#00CBFF', borderRadius: 3}}></div>}
                createAction={<Button text="Link" backgroundColor="#00CBFF" />}
              />
          </div>
      </div>

      <div className="toolbox-category">
          <div className="toolbox-category-title">Image</div>
          <div className="toolbox-grid">
              <ToolboxCard 
                label="Image" 
                icon={<div style={{width: '100%', height: '100%', background: '#eee', borderRadius: 4}}></div>}
                createAction={<UserImage />}
              />
              <ToolboxCard 
                label="Image with Text" 
                icon={<div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: 4}}>
                    <div style={{width: '100%', height: 30, background: '#eee', borderRadius: 4}}></div>
                    <TextPreview />
                </div>}
                createAction={
                    <Element is={Container} padding={[10,10,10,10]} canvas>
                        <UserImage width="100%" />
                        <Text text="Enter text here" margin={[10,0,0,0]} />
                    </Element>
                }
              />
          </div>
      </div>
    </div>
  );
};
