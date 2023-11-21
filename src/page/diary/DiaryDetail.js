
import React, { useState } from "react";
import EditorForm from "../editor/EditorForm";

function DiaryDetail() {
    return (
        <div className="wrap-page">
            {/* Header */}
          <div className="layout-header">
            {/* Header Top */}
            <div className="header-top">
                <a href="javascript:" className="btn-back">뒤로가기 버튼</a>
              <a href="javascript:" className="txt-logo">D.I.A.R.Y</a>
              <div className="ui-right">
                <div className="data-id">User id</div>
                <a href="javascript:" className="link-login">로그인</a>
                
              </div>
            </div>
            <div className="header-menu">
              <a href="javascript:">Todo 리스트</a>
              <a href="javascript:">다이어리</a>
              <a href="javascript:">캘린더</a>
              <a href="javascript:">갤러리</a>
            </div>
          </div>

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
                <div className="edit-detail">
                    <EditorForm></EditorForm>
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
