
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from 'react-router-dom';

function DiaryDetail() {
    const location = useLocation();
  const{ diaryContent, selectedTheme, themeImages, selectedText1 } = location.state || {};
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // 뒤로가기
    console.log('뒤로');
  };
    return (
        <div className="wrap-page"> 
            {/* TodoList */}
            <div className="page-diary">
                <div class="page-title">
                    내가 쓴 일기
                </div>
                {/* Top Diary */}
                <div className="top-diary">
                    <span className="data-category">[{selectedText1?.cate_data}] </span>
                    
                    <span className="data-name">
                        {diaryContent?.diary_title}
                        
                    </span>
                </div>
                <div className="ui-day">
                    <div className="data-day">2023.11.10(금) 
                      <Link to="/calendar" className="btn-calen"></Link>
                    </div>
                </div>

                <div className="wrap-detail">
                    <img
                        key={selectedTheme.id}
                        src={selectedTheme?.themeimg_path}
                        alt={selectedTheme.themeimg_title}/>
               
                    <div className="diary-contents" dangerouslySetInnerHTML={{ __html: diaryContent?.diary_content }} />
                </div>



                <div className="ui-buttons">
                    <button type="button" className="form-button" onClick={handleGoBack}>수정</button>
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