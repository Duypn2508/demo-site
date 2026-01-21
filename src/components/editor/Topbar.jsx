import React, { useState } from 'react';
import { useEditor } from '@craftjs/core';
import { 
    Monitor, 
    Tablet, 
    Smartphone, 
    Undo2, 
    Redo2, 
    Play, 
    ChevronLeft,
    X,
    Copy,
    Check,
    Eye
} from 'lucide-react';
import { PageRenderer } from '../../renderer';

export const Topbar = ({ device, setDevice }) => {
  const { actions, query, canUndo, canRedo } = useEditor((state, query) => ({
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));

  const [showDataModal, setShowDataModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [serializedData, setSerializedData] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSave = () => {
    const data = query.serialize();
    setSerializedData(data);
    setShowDataModal(true);
    console.log('Serialized Data:', data);
    console.log('Parsed:', JSON.parse(data));
  };

  const handlePreview = () => {
    const data = query.serialize();
    setSerializedData(data);
    setShowPreviewModal(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(serializedData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToAPI = async () => {
    // Example API call structure
    const payload = {
      pageId: 'page-demo-123',
      title: 'My Page',
      content: serializedData, // JSON string
      updatedAt: new Date().toISOString(),
    };

    console.log('=== API REQUEST PAYLOAD ===');
    console.log(JSON.stringify(payload, null, 2));
    
    // Uncomment to actually call API:
    // await fetch('/api/pages/save', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload)
    // });

    alert('Check console for API payload structure!');
  };

  return (
    <>
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
            <button className="history-btn" style={{marginRight: 10, fontSize: 13}} onClick={handlePreview}>
                Preview <Play size={14} style={{marginLeft: 5, fill: 'currentColor'}} />
            </button>
            <button className="btn-save" style={{marginRight: 10}} onClick={handleSave}>Save</button>
            <button className="btn-publish">Publish</button>
        </div>
      </div>

      {/* Data Modal - Show JSON Structure */}
      {showDataModal && (
        <div className="modal-overlay" onClick={() => setShowDataModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Serialized Data (JSON)</h3>
              <button className="modal-close" onClick={() => setShowDataModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="modal-actions">
                <button className="modal-btn" onClick={handleCopy}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy JSON'}
                </button>
                <button className="modal-btn modal-btn-primary" onClick={handleSaveToAPI}>
                  Save to API (Demo)
                </button>
              </div>
              
              <div className="code-block">
                <pre>{JSON.stringify(JSON.parse(serializedData), null, 2)}</pre>
              </div>

              <div className="api-example">
                <h4>API Request Example:</h4>
                <pre>{`POST /api/pages/save
Content-Type: application/json

{
  "pageId": "page-123",
  "title": "My Page",
  "content": "<serialized JSON string>",
  "updatedAt": "2024-01-21T10:00:00Z"
}`}</pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal - Show Rendered Output */}
      {showPreviewModal && (
        <div className="modal-overlay" onClick={() => setShowPreviewModal(false)}>
          <div className="modal-content modal-preview" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <Eye size={18} style={{marginRight: 8}} />
                Preview Rendered Output
              </h3>
              <div className="preview-device-toggle">
                {['mobile', 'tablet', 'desktop'].map(bp => (
                  <button 
                    key={bp}
                    className={`preview-device-btn ${device === bp ? 'active' : ''}`}
                    onClick={() => setDevice(bp)}
                  >
                    {bp === 'mobile' && <Smartphone size={14} />}
                    {bp === 'tablet' && <Tablet size={14} />}
                    {bp === 'desktop' && <Monitor size={14} />}
                  </button>
                ))}
              </div>
              <button className="modal-close" onClick={() => setShowPreviewModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body preview-body">
              <div className={`preview-frame preview-${device}`}>
                <PageRenderer data={serializedData} forceBreakpoint={device} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
