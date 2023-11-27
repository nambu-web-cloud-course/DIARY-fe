import React, { useRef, useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


// import MyButton from "./MyButton";
const Editor = () => {
  
  let subtitle;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
 
  const [diaryContent, setDiaryContent] = useState({
    diary_title:'',
    diary_content: '',
    cate_data_no:''
  });
  
  const submitReview = () => {
    navigate('/diarydetail', { state: { diaryContent } });
    axios.post(
      'https://diary-be.azurewebsites.net/mydiaries',
      {
        diary_title: diaryContent.diary_title,
        diary_content: diaryContent.diary_content,
        cate_data_no:'1',


        theme_no : selectedTheme.id,
        cate_data_no : selectedText1.id,
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        alert('등록성공');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 페이지 기초 데이터 초기화
  function iniPage() {

    console.log("Run iniPage");

    //이미지 데이터 불러오기

    if (token) {
        // 테마 데이터 가져오기
        axios
        .get('https://diary-be.azurewebsites.net/themeimgs',
            { 
                validateStatus: false ,
                headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((response) => {
            console.log('GET themeimgs :', response.data.data)

            if (response.data.data && response.data.data.length > 0 ){
                console.log('GET themeimgs length :', response.data.data.length)
                setThemeImages({
                    data: response.data.data,
                })
            } else {
                alert('가져올 테마가 없습니다.');
            }
          })
          .catch((error) => {
            console.log("심각한 에러 발생 : ",error);
            console.error('GET themeimgs error ', error );
          });


          // 카테 데이터 가져오기
          axios
        .get('https://diary-be.azurewebsites.net/cate_data',
            { 
                validateStatus: false ,
                headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((response) => {
            console.log('GET cate_data :', response.data)

            if (response.data.data && response.data.data.length > 0 ){
                console.log('GET cate_data length :', response.data.length)
                setCateInfo({
                    data: response.data.data,
                })
            } else {
                alert('가져올 카테고리가 없습니다.');
            }
          })
          .catch((error) => {
            console.log("심각한 에러 발생 : ",error);
            console.error('GET cate_data error ', error );
          });
      }

}


const [modal1IsOpen, setModal1IsOpen] = React.useState(false);
const [modal2IsOpen, setModal2IsOpen] = React.useState(false);
const [selectedText1, setSelectedText1] = useState();
const [selectedTheme, setSelectedTheme] = useState(); // 선택된 테마이미지 정보 저장
const [baseText1, setBaseText1] = useState(''); //기본텍스트 상태 추가
const [baseImage, setBaseImage] = useState([]); //기본테마 상태 추가
const modalContentRef1 = useRef(null);
const modalContentRef2 = useRef(null);
const [themeImages, setThemeImages] = useState([]);
const [cateInfo, setCateInfo] = useState([]);

function openModal1() {
  iniPage();
  setModal1IsOpen(true);
  console.log("OpenMoal1");
}

function closeModal1(){
  setModal1IsOpen(false);
  // closeModalHandler1(selectedText1);
  console.log("CloseMoal1");
}

function openModal2() {
  iniPage();
  setModal2IsOpen(true);
  console.log("OpenMoal2");
}

function closeModal2(){
  setModal2IsOpen(false);
  // closeModalHandler2(images);
  console.log("CloseMoal2");
};

function handleTextClick1(text){
  console.log("handleTextClick1 : "+ text.themeimg_path)
  setSelectedText1(text);
  closeModal1();//클릭 시 모달을 닫도록 추가
};

function handleImageClick(image){
  console.log("handleImageClick : "+ image.cate_data)
  setSelectedTheme(image);
  closeModal2();//클릭 시 모달을 닫도록 추가
};
  return (
    <div className="Editor">
      <section>
        <div className="top-diary">
            <button onClick={openModal1} className="data-category">카테고리</button>
                <span>&nbsp;</span>
                
                <Modal
                    id="cate-modal"
                    isOpen={modal1IsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal1}
                    contentLabel="Modal 1"
                >
                {/* 모달내용 */}
                
                    {/* 모달창 스크롤기능*/}
                    <div id ="modal-scrollable" className="modal-scrollable">

                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
                    <span>&nbsp;</span>
                    <span>&nbsp;</span>
                    <p><h3>카테고리를 선택하세요.</h3></p>
                    <span>&nbsp;</span>
                    <span>&nbsp;</span>
                    <span>&nbsp;</span>
                    <span>&nbsp;</span>

                    {/* 모달 내부 마우스 클릭 시 텍스트 전체 선택 */}
                    <div ref={modalContentRef1}>
                        
                        {/* 모달창 내용 table */}
                        {cateInfo.data && cateInfo.data.map((cate)=>(
                            <div
                            key={cate.id}
                            alt={cate.cate_data}
                            onClick={()=>{handleTextClick1(cate)}} >{cate.cate_data}</div>
                        ))}
                    </div>
                    
                    {/* 'close'버튼은 모달 외부로 이동 */}
                    <button onClick={closeModal1} className="modal-close" style={{
                        position:'absolute',
                        top:'20px',
                        right:'20px'
                    }}>close</button>

                </div> 
                </Modal>

                {/* 모달이 닫힌 후에 선택한 텍스트를 표시 */}
                {selectedText1 ? (
                    <div>
                    <p>{selectedText1.cate_data}</p>
                    </div>
                ) : (
                    <p>🌞카테고리를 선택해 주세요</p>
                )}

                {/* 모달이 닫힌 후에 기본텍스트 업데이트 */}
                <div>
                    <p>{baseText1}</p>
                </div>
                
            <div className="top-diary">
              <button onClick={openModal2}>
                  <span className="data-category">배경 선택</span>
              </button>

              <Modal
                id="cate-modal2"
                isOpen={modal2IsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal2}
                contentLabel="Modal 2"
                >

                {/* 모달내용 */}
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>

                    {/* 모달창 스크롤기능 */}
                    <div id ="modal-scrollable" className="modal-scrollable">

                    <div ref={modalContentRef2} >
                        <p><h3>배경테마를 선택하세요.</h3></p>
                        <div className="image-gallery">
                        {themeImages.data && themeImages.data.map((image)=>(
                            <img
                            width={400}
                            height={200}
                            key={image.id}
                            src={image.themeimg_path}
                            alt={image.themeimg_title}
                            onClick={()=>{handleImageClick(image)}} />
                        ))}
                        
                    </div>

                        {/* 'close'버튼은 모달 외부로 이동 */}
                        <button onClick={closeModal2} className="modal-close" style={{
                        position:'absolute',
                        top:'20px',
                        right:'20px'
                        }}>close</button>
                    </div>
                </div> 
                </Modal>
             
            </div>
        </div>
      </section>
      <section>
        <div className="title-wrapper">
        <input
            className="form-input"
            type="text"
            placeholder="제목"
            onChange={(e) => setDiaryContent({ ...diaryContent, diary_title: e.target.value })}
            name="diary_title"
          />
        </div>
      </section>
      <section className="wrap-ckeditor">
        {/* 모달이 닫힌 후에 선택한 이미지를 표시 */}
        {selectedTheme ? (
          <div className="bg-editor">
              {
                  <img
                  width={100}
                  height={30}
                  key={selectedTheme.id}
                  src={selectedTheme.themeimg_path}
                  alt={selectedTheme.themeimg_title}/>
              }
          </div>
          ) : (
              <p>🌞배경을 선택해 주세요~~</p>
          )}
        
        <CKEditor
          editor={ClassicEditor}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            setDiaryContent({
              ...diaryContent,
              diary_content: data,
            });
         
          }}
          accept="image/*"
         
        />
      </section>
      <div className="ui-buttons">
      <button type="button" className="form-button" onClick={submitReview}>저장</button>
          <button type="button" className="form-button" onClick={() => navigate(-1, { replace: true })}>취소</button>
        </div>


        <div>
        <h2>Saved Diary Content</h2>
          <p>{diaryContent.diary_content}</p>
        </div>
    </div>



  );
};

export default Editor;
