
//import React, { useState } from "react";
import EditorForm from "../editor/EditorForm";

function DiaryEdit() {
    return (
        <div className="wrap-page">
         

            {/* TodoList */}
            <div className="page-diary">
                <div class="page-title">
                    내가 쓴 일기
                </div>
                {/* Top Diary */}
                <div className="top-diary">
                    <span className="data-category">[카테고리명] </span>
                    
                    <span className="data-name">
                    일기 제목일기 제목일기 제목일기 제목일기 제목일기 제목일기 제목
                    </span>
                </div>
                <div className="ui-day">
                    <div className="data-day">2023.11.10(금) <a href="javascript:" className="btn-calen">달력아이콘</a></div>
                </div>

                {/* Editor */}
                  <EditorForm></EditorForm>

                <div className="ui-buttons">
                    <a href="javascript:" className="form-button">저장</a>
                    <a href="javascript:" className="form-button type-dark">삭제</a>
                </div>
            </div>
         
      </div>
    )
}

export default DiaryEdit;
