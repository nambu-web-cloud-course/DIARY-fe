
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate} from 'react-router-dom';
import instance from "../../api";

function DiaryView() {
     const navigate = useNavigate();
    
    // const searchParams = useLocation();
    // const diary_no = searchParams.search.split('?')[1];

    const location = useLocation();
    const [searchParams, setSearchParams] = useState({});

    console.log("searchParams",searchParams.id);

    const [diaries, setDiaries] = useState(); // diaries 목록

    function getDiary(diary_no) {

        console.log("getDiary",diary_no);
        const token = localStorage.getItem('token'); // 저장된 JWT 토큰 가져오기


        if (token) {
        
        console.log('/mydiaries/'+ diary_no);
       
        // 갤러리 데이터 가져오기
        instance.get(
            '/mydiaries/'+ diary_no,   
                { 
                    validateStatus: false 
                }
            )
            .then((response) => {
                console.log('GET diary :', response.data.data[0])

                if (response.data.data && response.data.data.length > 0 ) {
                    console.log('GET diary length :', response.data.length)
                    setDiaries(
                        response.data.data[0]
                    )
                    // navigate('/diarydetail', { submitReview });

                } else {
                    alert('가져올 diary가 없습니다.');
                    setDiaries()
                    return;
                }
            })
            .catch((error) => {
                console.error('GET diary error ', error );
            })
        }
    }

    useEffect(() => {
        // URL의 검색 매개변수 문자열을 URLSearchParams 객체로 변환
        const params = new URLSearchParams(location.search);

        // URLSearchParams 객체를 plain object로 변환
        const paramsObject = {};
        for (const [key, value] of params.entries()) {
            paramsObject[key] = value;
        }

        // 변환된 객체를 state에 저장
        // setSearchParams(paramsObject);

        getDiary(paramsObject.id);
        
    }, [location.search] );

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

    function handleModify(){
        navigate('/diaryedit?id=' + diaries.id );
    };

    function handleDelete(){
        try {
            instance.delete(`/mydiaries/${diaries.id}`);

            alert("다이어리가 삭제되었습니다.");
        } catch (error) {
            console.error("다이어리 삭제 오류:", error);
        }

        navigate('/diaryhome');
    };

    function handleFinish(){
        navigate('/diaryhome');
    }

  
    return (
        <div className="wrap-page"> 
            {/* TodoList */}
            <div className="page-diary">
                <div className="ui-back"><Link to="/diaryhome" className="btn-back">뒤로가기</Link> {' '}</div> 
              
                <div class="page-title">
                    내가 쓴 일기
                </div>
                {/* Top Diary */}
                <div className="top-diary type-diary">
                    <span className="data-category">[{diaries?.Cate_datum?.cate_data}] </span>
                    
                    <span className="data-name">
                        {diaries?.diary_title}
                        
                    </span>
                </div>
                 <div className="ui-day">
                    <div className="data-day">{formatDate(diaries?.created_at)} 
                      <Link to="/calendar" className="btn-calen"></Link>
                    </div>
                </div>

                <div className="wrap-detail">
                    {/* 테마 이미지를 나타내는 부분 */}
                    {/* <img
                        key={diaries?.Themeimg?.id}
                        src={diaries?.Themeimg?.themeimg_path}
                        alt={diaries?.Themeimg?.themeimg_title} className="bg-image"/> */}
               
                    <div className="diary-contents" dangerouslySetInnerHTML={{ __html: diaries?.diary_content }} style={{backgroundImage: `url("${diaries?.Themeimg?.themeimg_path}")`}}/>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                 {/* 갤러리 이미지를 나타내는 부분 */}
                 {
                   diaries?.Galleries && diaries?.Galleries?.map((image)=>(
                             <img
                             key={image.diary_no}
                             src={image.image_path}
                             alt={image.image_path}
                             style={{ width: 'calc(33.333% - 16px)', marginBottom: '16px' }}
                             />
                         )
                   )
                 }
               
               </div>

                <div className="ui-buttons">
                    <a href="javascript:" className="form-button" onClick={handleModify}>수정</a>
                    <a href="javascript:" className="form-button type-dark"  onClick={handleDelete}>삭제</a>
                    <a href="javascript:" className="form-button" onClick={handleFinish}>완료</a>
                    <div className="type-right">
                        <a href="javascript:" className="form-button">다운로드</a>
                    </div>
                </div>
            </div>
         
      </div>
    )
}

export default DiaryView;