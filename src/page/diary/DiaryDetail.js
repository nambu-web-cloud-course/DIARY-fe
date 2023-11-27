
import React, { useState } from "react";
import EditorForm from "../editor/EditorForm";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function DiaryDetail() {
    const location = useLocation();
  const { diaryContent, selectedTheme, selectedText1} = location.state || {};

    return (
        <div className="wrap-page">
            {/* TodoList */}
            <div className="page-diary">
                <div class="page-title">
                    내가 쓴 일기
                </div>
                {/* Top Diary */}
                <div className="top-diary">
                    <span className="data-category">[] </span>
                    
                    <span className="data-name">
                        {diaryContent?.diary_title}
                    </span>
                </div>
                <div className="ui-day">
                    <div className="data-day">2023.11.10(금) 
                      <Link to="/calendar" className="btn-calen"></Link>
                    </div>
                </div>

                <div className="">
                    <p>{diaryContent?.diary_content}</p>
                    <p>{}</p>
                
                </div>



                <div className="ui-buttons">
                    <a href="javascript:" className="form-button">수정</a>
                    <a href="javascript:" className="form-button type-dark">삭제</a>
                    <div className="type-right">
                        <a href="javascript:" className="form-button">다운로드</a>
                    </div>
                </div>
            </div>
         
      </div>
    )
}

export default DiaryDetail;