
// export default DiaryEdit;
import React, { useState } from "react";
import EditorForm from "../editor/EditorForm";
import AddFile from "../editor/AddFile"
import { Link } from 'react-router-dom';

function DiaryEdit() {

      // 날짜 포맷 함수
    const formatDate = (dateString) => {
        // 월, 일을 2자리 숫자로 표시하는 함수
        const formatNumber = (num) => (num < 10 ? `0${num}` : num);

        // 요일 배열
        const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

        // 년, 월, 일, 요일을 추출합니다.
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = formatNumber(date.getMonth() + 1);
        const day = formatNumber(date.getDate());
        const dayOfWeek = daysOfWeek[date.getDay()];

        // 최종적인 형식으로 조합하여 반환합니다.
        return `${year}.${month}.${day}(${dayOfWeek})`;
    };


    return (
        <div className="wrap-page">
           <div className="page-diary">
             <div className="ui-back"><Link to="/diaryhome" className="btn-back">뒤로가기</Link> {' '}</div> 
              {/* <Link to="/diaryhome" className="form-button">뒤로가기</Link> {' '} */}

              {/* Top Diary */}
              <div class="page-title">일기 쓰기</div>
             
              {/* <div className="top-diary">
                  <span className="data-category">[카테고리 선택] </span>
              </div> */}
              <div className="ui-day">
                  <div className="data-day">{formatDate(new Date())} 
                    <Link to="/calendar" className="btn-calen"></Link></div>
              </div>

                {/* Editor */}
                  <EditorForm></EditorForm>
                  {/* <AddFile></AddFile> */}
                 

               
            </div>
           
      </div>
    )
}

export default DiaryEdit;