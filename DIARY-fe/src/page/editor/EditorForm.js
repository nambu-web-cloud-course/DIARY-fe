import React, { useRef, useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Modal from 'react-modal';
import { useNavigate,  useLocation} from "react-router-dom";
import instance from "../../api";

// import MyButton from "./MyButton";
const Editor = () => {
  
  let subtitle;
  const token = localStorage.getItem("token");

  const [modal1IsOpen, setModal1IsOpen] = React.useState(false);
  const [modal2IsOpen, setModal2IsOpen] = React.useState(false);
  const [selectedText1, setSelectedText1] = useState(); // 선택된 카테고리 정보 저장
  const [selectedTheme, setSelectedTheme] = useState(); // 선택된 테마이미지 정보 저장
  const [baseText1, setBaseText1] = useState(''); //기본텍스트 상태 추가
  const [baseImage, setBaseImage] = useState([]); //기본테마 상태 추가
  const modalContentRef1 = useRef(null);
  const modalContentRef2 = useRef(null);
  const [themeImages, setThemeImages] = useState([]);
  const [cateInfo, setCateInfo] = useState([]);

  const [selectedImage, setSelectedImage] = useState();
  const [uploadImages, setUploadImages] = useState([]);
  const fileContentRef = useRef(null);
 
  const navigate = useNavigate();
  const [diaryContent, setDiaryContent] = useState({
    diary_title:'',
    diary_content: ''
  });


  const location = useLocation();
  const [diaries, setDiaries] = useState({});

  useEffect(() => {
    console.log("useEffect---------------------------------------------------");

    if(location.search) {
      console.log("location.search", location.search);

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
    }
    
  }, [location.search] );


  // 다이어리 정보 가져오기 - 수정을 위한
  function getDiary(diary_no) {

    console.log("getDiary",diary_no);
    const token = localStorage.getItem('token'); // 저장된 JWT 토큰 가져오기


    if (token) {
    
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
                setDiaries(response.data.data[0])
                
                // 다이어리 데이터 적용
                console.log('diaries.Cate_datum :', response.data.data[0].Cate_datum);
                setSelectedText1(response.data.data[0].Cate_datum);

                console.log('diaries.Themeimg :', response.data.data[0].Themeimg);
                setSelectedTheme(response.data.data[0].Themeimg);

                setDiaryContent({ diary_title : response.data.data[0].diary_title, diary_content : response.data.data[0].diary_content});

                // setSelectedImage(response.data.data[0].Galleries[0]?.image_path);
                setSelectedImage({image_path : response.data.data[0].Galleries[0]?.image_path, id : response.data.data[0].Galleries[0]?.id });


            } else {
                alert('가져올 diary가 없습니다.');
                setDiaries();
                setSelectedText1();
                setSelectedTheme();
                return;
            }
        })
        .catch((error) => {
            console.log("심각한 에러 발생 : ",error);
            console.error('GET diary error ', error );
        })
    }
}

  // 파일첨부 포함한 일기 내용 저장
  const submitReview = () => {
    const formData = new FormData();
    Object.values(uploadImages).forEach((file) => formData.append("image_path", file));
    formData.append('diary_title', diaryContent.diary_title);
    formData.append('diary_content', diaryContent.diary_content);
    formData.append('theme_no', selectedTheme.id);
    formData.append('cate_data_no', selectedText1.id);
    
    console.log("다이어리 저장 중----------------------------------------");

    if(diaries?.id) {
      console.log("다이어리 수정 중----------------------------------------");

      // 다이어리 수정 시 키값 추가 설정
      formData.append('id', diaries.id);

      // 다이어리 로드 시 업데이트
      instance.put(
        '/mydiaries',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // alert(res.data.data);
        alert('등록성공');
        navigate('/diaryview?id=' + diaries.id );

      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      console.log("다이어리 추가 중----------------------------------------");

      // 다이어리 신규 등록
      instance.post(
        '/mydiaries',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          // alert(res.data.data);
          alert('등록성공');
          navigate('/diaryview?id=' + res.data.data );

        })
        .catch((error) => {
          console.log(error);
        });
    
    }
  };

  // 페이지 기초 데이터 초기화
  function iniPage() {

    console.log("Run iniPage");

    //이미지 데이터 불러오기

    if (token) {
        // 테마 데이터 가져오기
        instance
        .get(
          '/themeimgs',
            { 
                validateStatus: false
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
        instance
        .get('/cate_data',
            { 
                validateStatus: false
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


  const handleImageChange = (e) => {
    // const selectedFiles = e.target.files[0];
    const imageFiles = e.target.files;
  
    if (imageFiles) {
      console.log(imageFiles);

      // const nowUrl = URL.createObjectURL(selectedFiles);  
      setUploadImages(imageFiles);

      // 이미지 파일이 선택된 경우
      const reader = new FileReader();

      reader.onloadend = () => {
        // 파일 읽기 완료 후 미리보기를 위해 상태 업데이트
        setSelectedImage({image_path : reader.result, id : 0 });
      };

      reader.readAsDataURL(imageFiles[0]); // 파일을 Data URL로 읽기
    }
  };

  function handleImageDelete() {
    if (selectedImage) {

          // 수정 상태의 이미지 삭제의 경우 서버 데이터 삭제 처리
          if(selectedImage.id > 0) {
            try {
             instance.delete(`/gallery/${selectedImage.id}`);

              alert("이미지가 삭제되었습니다.");

            } catch (error) {
              console.error("이미지 삭제 오류:", error);
              return;
            }
          }

      // 이미지 파일이 선택된 경우
      setSelectedImage();
      fileContentRef.current.value = "";
    }
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

                    <div ref={modalContentRef1}> {/* 모달 내부 마우스 클릭 시 텍스트 전체 선택 */}\
                    {/* 카테고리 내용 */}
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
                    <p></p>
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

                    <div ref={modalContentRef2}>{/* 모달 내부 마우스 클릭 시 텍스트 전체 선택 */}
                    
                    {/* 배경테마 이미지 */}
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
            value={diaryContent.diary_title}
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
              <p></p>
          )}
        
        <CKEditor
          editor={ClassicEditor}
          data={diaryContent.diary_content}
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
          accept='.png, .jpg, image/*'
         
        />
      </section>
      <div className="ui-buttons">
        <button type="button" className="form-button" onClick={submitReview}>저장</button>
        <a className="form-button" href="javascript:history.back();">취소</a>
      </div>


      {/* <div>
        <h2>Saved Diary Content</h2>
        <p>{diaryContent.diary_content}</p>
      </div> */}

      <div>
        <input type="file" onChange={handleImageChange}  ref={fileContentRef}/>
        {selectedImage && selectedImage.image_path && (
          <div>
            <img src={selectedImage.image_path} alt="Selected" style={{ maxWidth: '300px' }} />
            <button className="form-button" onClick={handleImageDelete}>Delete</button>
          </div>
        )}
      </div>
    </div>



  );
};

export default Editor;
