
// export default DiaryEdit;
import React, { useState } from "react";
import EditorForm from "../editor/EditorForm";
import AddFile from "../editor/AddFile"
import { Link } from 'react-router-dom';

function DiaryEdit() {
    return (
        <div className="wrap-page">
           <div className="page-diary">
             <div><Link to="/diaryhome" className="btn-back">Home</Link> {' '}</div> 
              {/* <Link to="/diaryhome" className="form-button">뒤로가기</Link> {' '} */}

              {/* Top Diary */}
              <div class="page-title">새 일기 쓰기</div>
             
              <div className="top-diary">
                  <span className="data-category">[카테고리 선택] </span>
              </div>
              <div className="ui-day">
                  <div className="data-day">2023.11.10(금)
                    <a href="javascript:" className="btn-calen"></a></div>
              </div>

                {/* Editor */}
                  <EditorForm></EditorForm>
                  <AddFile></AddFile>
                 

               
            </div>
           
      </div>
    )
}

export default DiaryEdit;