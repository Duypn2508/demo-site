import React from 'react';
import { Editor, Frame, Element } from '@craftjs/core';
import { Container, Text, UserImage, Button } from './components/user';
import { Viewport } from './components/editor/Viewport';
import { RenderNode } from './components/editor/RenderNode';

function App() {
  return (
    <div className="app">
      <Editor 
        resolver={{Container, Text, UserImage, Button}}
        onRender={RenderNode}
      > 
          <Viewport>
             <Frame>
                <Element is={Container} canvas width="100%" height="auto" background="#ffffff" padding={[0,0,0,0]} flexDirection="column">
                    
                    {/* Header Simulation */}
                    <Element is={Container} canvas background="#f9f9f9" padding={[20,20,20,20]} width="100%" flexDirection="row" justifyContent="space-between" alignItems="center">
                        <Text text="Restaurant" fontSize={18} fontWeight="bold" />
                        <Text text="Menu" fontSize={14} color="#666" />
                    </Element>

                    {/* Hero Section */}
                    <Element is={Container} canvas background="#fff" padding={[0,0,0,0]} width="100%">
                         <UserImage src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" height="250px" width="100%" objectFit="cover" />
                         <Element is={Container} canvas padding={[20,20,20,20]}>
                             <Text text="Authentic Italian Pizza" fontSize={24} fontWeight="bold" margin={[10,0,10,0]} textAlign="center" />
                             <Text text="Experience the taste of Naples in every slice. Traditional wood-fired oven." fontSize={14} color="#555" textAlign="center" />
                         </Element>
                    </Element>

                </Element>
             </Frame>
          </Viewport>
      </Editor>
    </div>
  );
}

export default App;
