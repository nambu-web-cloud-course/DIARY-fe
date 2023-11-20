import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


export default function Diary(){
    const [diaries, setDiaries] = useState([]);
    const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    
    const today = new Date().toISOString().split('T')[0];
    setCurrentDate(today);

    // 사용자 정보 불러오는 로직 (로그인 정보가 state에 있다고 가정)
    const userId = 'member_id'; 
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('refresh_token')}`, // 로그인 후 저장된 토큰 사용
      },
    };

    //사용자가 저장한 일기 불러오기
    axios.get(`http://localhost:8080/mydiaries/${userId}`, config)
      .then(response => {
        setDiaries(response.data.data); // 서버에서 받아온 일기 목록을 state에 저장
      })
      .catch(error => {
        console.error('일기를 불러오는데 오류 발생:', error);
      });
  }, []); // 빈 배열을 넣어 한 번만 실행되도록 설정






    return (
        <>
        {/* diary */}
        {diaries.length > 0 ? (diaries.map((diary) => (
            <div key={diary.id}>
              {/* image URL */}
              <img src={diary.image_url} alt={`이미지 - ${diary.diary_title}`} />
            </div>
          ))
        ) : (
          <p>일기가 없습니다.</p>
        )}

        

        <div className="page-diary" >
            <div className="data-day">{currentDate} <a href="/calendar" className="btn-calen">달력아이콘</a></div>
            <div class="page-title">
                내가 쓴 일기
            </div>
             <div className="wrap-box">
                 {/* Box */}
                 <div className="box-diary">
                     <div className="box-title" key={diaries.id}>
                         <span className="data-category">[카테고리명] </span>
                        
                         <span className="data-name">
                         {diaries.diary_title}
                         일기 제목일기 제목일기 제목일기 제목일기 제목일기 제목일기 제목
                         </span>
                     </div>
                     <div className="data-image">
                         {diaries.diary_content}
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
                 <Link to="/mydiaries" className="form-button">새 일기 쓰기</Link>
                 {/* <a href="/mydiaries" className="form-button">새 일기 쓰기</a> */}
             </div>
         </div>
       </>
     )
}
