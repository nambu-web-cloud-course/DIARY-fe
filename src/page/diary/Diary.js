
import React, { useState } from "react";
function Diary() {
    return (
        <>
        {/* diary */}
        <div className="page-diary">
            <div className="data-day">2023.11.10(금) <a href="javascript:" className="btn-calen">달력아이콘</a></div>
            <div class="page-title">
                내가 쓴 일기
            </div>
            <div className="wrap-box">
                {/* Box */}
                <div className="box-diary">
                    <div className="box-title">
                        <span className="data-category">[카테고리명] </span>
                        
                        <span className="data-name">
                        일기 제목일기 제목일기 제목일기 제목일기 제목일기 제목일기 제목
                        </span>
                    </div>
                    <div className="data-image">
                        내 일기 1
                        커버 이미지
                    </div>
                    
                </div>
                    {/* Box */}
                    <div className="box-diary">
                    <div className="box-title">
                        <span className="data-category">[카테고리명] </span>
                        
                        <span className="data-name">
                            일기 제목일기 
                        </span>
                    </div>
                    <div className="data-image">
                        내 일기 1
                        커버 이미지
                    </div>
                    
                </div>
            </div>

            <div className="fix-buttons">

                <a href="javascript:" className="form-button">새 일기 쓰기</a>
            </div>
        </div>
      </>
    )
}

export default Diary;
