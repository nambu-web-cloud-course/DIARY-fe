
import React, { useState } from "react";
import { Editor } from 'primereact/editor';
function Editor_test() {
  const [text, setText] = useState('');
    return (
        <div>
           <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '320px' }} />
        </div>
    )
}

export default Editor_test;
