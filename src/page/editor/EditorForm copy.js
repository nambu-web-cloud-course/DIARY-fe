
import React, { useState } from "react";
import { Editor } from 'primereact/editor';
function EditorForm() {
  const [text, setText] = useState('');
    return (
        <div>
           <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '900px' }} />
        </div>
    )
}

export default EditorForm;
