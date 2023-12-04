import React, { useRef, useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Modal from "react-modal";
import { useNavigate, useLocation } from "react-router-dom";
import instance from "../../api";

// import MyButton from "./MyButton";
const Editor = () => {
  let subtitle;
  const token = localStorage.getItem("token");

  const [modal1IsOpen, setModal1IsOpen] = React.useState(false);
  const [modal2IsOpen, setModal2IsOpen] = React.useState(false);
  const [selectedText1, setSelectedText1] = useState(); // 선택된 카테고리 정보 저장
  const [selectedTheme, setSelectedTheme] = useState(); // 선택된 테마이미지 정보 저장
  const [baseText1, setBaseText1] = useState(""); //기본텍스트 상태 추가
  //const [baseImage, setBaseImage] = useState([]); //기본테마 상태 추가
  const modalContentRef1 = useRef(null);
  const modalContentRef2 = useRef(null);
  const [themeImages, setThemeImages] = useState([]);
  const [cateInfo, setCateInfo] = useState([]);

  const [selectedImage, setSelectedImage] = useState();
  const [uploadImages, setUploadImages] = useState([]);
  const fileContentRef = useRef(null);

  const navigate = useNavigate();
  const [diaryContent, setDiaryContent] = useState({
    diary_title: "",
    diary_content: "",
  });

  const location = useLocation();
  const [diaries, setDiaries] = useState({});

  const [selectedImageTitle, setSelectedImageTitle] = useState("");

  useEffect(() => {
    console.log("useEffect---------------------------------------------------");

    // 페이지 첫 진입 시, 기본 카테고리와 배경 테마 설정
    if (
      !location.search &&
      cateInfo.data &&
      cateInfo.data[0] &&
      themeImages.data &&
      themeImages.data[0]
    ) {
      setSelectedText1(cateInfo.data[0]);
      setSelectedTheme(themeImages.data[0]);
      setSelectedImageTitle(themeImages.data[0].themeimg_title);
    } else if (location.search) {
      console.log("location.search", location.search);

      // URL의 검색 매개변수 문자열을 URLSearchParams 객체로 변환
      const params = new URLSearchParams(location.search);

      // URLSearchParams 객체를 plain object로 변환
      const paramsObject = {};
      for (const [key, value] of params.entries()) {
        paramsObject[key] = value;
      }

      getDiary(paramsObject.id);
    }
  }, [location.search, cateInfo.data, themeImages.data]);

  useEffect(() => {
    iniPage();
  }, []);

  // 다이어리 정보 가져오기 - 수정을 위한
  function getDiary(diary_no) {
    console.log("getDiary", diary_no);
    const token = localStorage.getItem("token"); // 저장된 JWT 토큰 가져오기

    if (token) {
      // 갤러리 데이터 가져오기
      instance
        .get("/mydiaries/" + diary_no, {
          validateStatus: false,
        })
        .then((response) => {
          console.log("GET diary :", response.data.data[0]);

          if (response.data.data && response.data.data.length > 0) {
            setDiaries(response.data.data[0]);

            // 다이어리 데이터 적용
            console.log(
              "diaries.Cate_datum :",
              response.data.data[0].Cate_datum
            );
            setSelectedText1(response.data.data[0].Cate_datum);

            console.log("diaries.Themeimg :", response.data.data[0].Themeimg);
            setSelectedTheme(response.data.data[0].Themeimg);

            setDiaryContent({
              diary_title: response.data.data[0].diary_title,
              diary_content: response.data.data[0].diary_content,
            });

            // setSelectedImage(response.data.data[0].Galleries[0]?.image_path);
            setSelectedImage({
              image_path: response.data.data[0].Galleries[0]?.image_path,
              id: response.data.data[0].Galleries[0]?.id,
            });
          } else {
            alert("가져올 diary가 없습니다.");
            setDiaries();
            setSelectedText1();
            setSelectedTheme();
            return;
          }
        })
        .catch((error) => {
          console.log("심각한 에러 발생 : ", error);
          console.error("GET diary error ", error);
        });
    }
  }

  // 파일첨부 포함한 일기 내용 저장
  const submitReview = () => {
    // 필수 입력 필드 확인
    if (!diaryContent.diary_title) {
      alert("제목을 입력하세요.");
      return;
    }

    if (!diaryContent.diary_content) {
      alert("내용을 입력하세요.");
      return;
    }

    const formData = new FormData();
    Object.values(uploadImages).forEach((file) =>
      formData.append("image_path", file)
    );
    formData.append("diary_title", diaryContent.diary_title);
    formData.append("diary_content", diaryContent.diary_content);
    formData.append("theme_no", selectedTheme.id);
    formData.append("cate_data_no", selectedText1.id);

    console.log("다이어리 저장 중----------------------------------------");

    if (diaries?.id) {
      console.log("다이어리 수정 중----------------------------------------");

      // 다이어리 수정 시 키값 추가 설정
      formData.append("id", diaries.id);

      // 다이어리 로드 시 업데이트
      instance
        .put("/mydiaries", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // alert(res.data.data);
          alert("등록성공");
          navigate("/diaryview?id=" + diaries.id);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("다이어리 추가 중----------------------------------------");

      // 다이어리 신규 등록
      instance
        .post("/mydiaries", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // alert(res.data.data);
          alert("등록성공");
          navigate("/diaryview?id=" + res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // 페이지 기초 데이터 초기화
  function iniPage() {
    console.log("페이지 기초 데이터 초기화");

    //이미지 데이터 불러오기

    if (token) {
      // 테마 데이터 가져오기
      instance
        .get("/themeimgs", {
          validateStatus: false,
        })
        .then((response) => {
          console.log("GET themeimgs :", response.data.data);
          if (response.data.data && response.data.data.length > 0) {
            //이미지 id순으로 정렬
            const sortedThemeImages = response.data.data.sort(
              (a, b) => a.id - b.id
            );

            console.log("GET themeimgs length : ", sortedThemeImages.length);
            setThemeImages({
              data: sortedThemeImages,
            });
          } else {
            alert("가져올 테마가 없습니다.");
          }
        })
        .catch((error) => {
          console.error("GET themeimgs error ", error);
        });

      // 카테 데이터 가져오기
      instance
        .get("/cate_data", {
          validateStatus: false,
        })
        .then((response) => {
          console.log("GET cate_data :", response.data);

          if (response.data.data && response.data.data.length > 0) {
            // id를 기반으로 카테고리 정렬
            const CateOrder = response.data.data.sort((a, b) => a.id - b.id);

            console.log("GET cate_data length :", response.data.length);
            setCateInfo({
              data: CateOrder,
            });
          } else {
            alert("가져올 카테고리가 없습니다.");
          }
        })
        .catch((error) => {
          console.error("GET cate_data error ", error);
        });
    }
  }

  function openModal1() {
    iniPage();
    setModal1IsOpen(true);
    console.log("OpenMoal1");
  }

  function closeModal1() {
    setModal1IsOpen(false);
    // closeModalHandler1(selectedText1);
    console.log("CloseMoal1");
  }

  function openModal2() {
    setModal2IsOpen(true);
    console.log("OpenMoal2");
  }

  function closeModal2() {
    setModal2IsOpen(false);
    // closeModalHandler2(images);
    console.log("CloseMoal2");
  }

  function handleTextClick1(text) {
    console.log("handleTextClick1 : " + text.themeimg_path);
    setSelectedText1(text);
    closeModal1(); //클릭 시 모달을 닫도록 추가
  }

  function handleImageClick(image) {
    console.log("handleImageClick : " + image.cate_data);
    setSelectedTheme(image);
    closeModal2(); //클릭 시 모달을 닫도록 추가
    setSelectedImageTitle(image.themeimg_title); // 이미지 클릭 시 해당 이미지의 제목을 저장
  }
  const [selectedFile, setSelectedFile] = useState(null);
  const handleImageChange = (e) => {
      //파일명 가져오기
      const file = e.target.files[0];
      setSelectedFile(file);
  
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
        setSelectedImage({ image_path: reader.result, id: 0 });
      };

      reader.readAsDataURL(imageFiles[0]); // 파일을 Data URL로 읽기
    }
  };

  function handleImageDelete() {
    setSelectedFile('');
    if (selectedImage) {
      // 수정 상태의 이미지 삭제의 경우 서버 데이터 삭제 처리
      if (selectedImage.id > 0) {
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
  }
  const [wrapFileClass, setWrapFileClass] = useState('');
  useEffect(() => {
    // selectedImage가 변경될 때마다 클래스를 업데이트
    if (selectedImage && selectedImage.image_path) {
      setWrapFileClass('image-selected');
    } else {
      setWrapFileClass('');
    }
  }, [selectedImage]);
  return (
    <div className="Editor">
      <section>
        <div className="top-diary">
    
          <div className="ui-select">
            <button onClick={openModal1} className="data-category type-select">
              카테고리
            </button>

            <Modal
              id="cate-modal"
              isOpen={modal1IsOpen}
              // onAfterOpen={afterOpenModal}
              onRequestClose={closeModal1}
              contentLabel="Modal 1"
            >
              {/* 모달내용 */}

            {/* 모달창 스크롤기능*/}
            <div id="modal-scrollable" className="modal-scrollable">
              <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
      
              <p className="modal-title">카테고리를 선택하세요.</p>

              <ul className="list-modal" ref={modalContentRef1}>
                {" "}
                {/* 모달 내부 마우스 클릭 시 텍스트 전체 선택 */}
                {/* 카테고리 내용 */}
                {cateInfo.data &&
                  cateInfo.data.map((cate) => (
                    <li
                      key={cate.id}
                      alt={cate.cate_data}
                      onClick={() => {
                        handleTextClick1(cate);
                      }}
                    >
                      {cate.cate_data}
                    </li>
                  ))}
              </ul>

              {/* 'close'버튼은 모달 외부로 이동 */}
              <button
                onClick={closeModal1}
                className="modal-close"
              >
              </button>
            </div>
          </Modal>

          {/* 모달이 닫힌 후에 선택한 텍스트를 표시 */}
          {selectedText1 ? (
            <div>
              <p>{selectedText1.cate_data}&nbsp;&nbsp;</p>
            </div>
          ) : (
            <p></p>
          )}
        </div>

    
        <div className="ui-select">

            <button onClick={openModal2}>
              <span className="data-category">배경 선택</span>
            </button>
            {/* 모달이 닫힌 후에 선택한 이미지를 표시 */}
            {selectedTheme ? (
              <p>{selectedTheme.themeimg_title}</p>
            ) : null}
   

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
              <div id="modal-scrollable" className="modal-scrollable" ref={modalContentRef2} >
                
                {/* 모달 내부 마우스 클릭 시 텍스트 전체 선택 */}

                {/* 배경테마 이미지 */}
                <p className="modal-title">
                배경테마를 선택하세요.
                </p>
                <div className="image-gallery">
                  {themeImages.data &&
                    themeImages.data.map((image) => (
                      <div key={image.id}>
                        <img
                          key={image.id}
                          src={image.themeimg_path}
                          alt={image.themeimg_title}
                          onClick={() => {
                            handleImageClick(image);
                          }}
                        />
                        <p>{image.themeimg_title}</p>
                      </div>
                    ))}
                </div>

                {/* 'close'버튼은 모달 외부로 이동 */}
                <button
                  onClick={closeModal2}
                  className="modal-close"
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                  }}
                >
                  close
                </button>
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
            onChange={(e) =>
              setDiaryContent({ ...diaryContent, diary_title: e.target.value })
            }
            name="diary_title"
          />
        </div>
      </section>
      <section className="wrap-ckeditor">
        {/* 모달이 닫힌 후에 선택한 이미지를 표시 */}
        {selectedTheme ? (
          <div className="bg-editor">
            {/* <p>{selectedTheme.themeimg_title}</p> */}
            <img
              width={100}
              height={30}
              key={selectedTheme.id}
              src={selectedTheme.themeimg_path}
              alt={selectedTheme.themeimg_title}
            />
          </div>
        ) : null}

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
          accept=".png, .jpg, image/*"
        />
      </section>
      <div className="ui-buttons">
        <button type="button" className="form-button" onClick={submitReview}>
          저장
        </button>
        <a className="form-button" href="javascript:history.back();">
          취소
        </a>
      </div>

      {/* <div>
        <h2>Saved Diary Content</h2>
        <p>{diaryContent.diary_content}</p>
      </div> */}
     
      {/* <div>
        <input type="file" onChange={handleImageChange} ref={fileContentRef} />
        {selectedImage && selectedImage.image_path && (
          <div>
            <img
              src={selectedImage.image_path}
              alt="Selected"
              style={{ maxWidth: "300px" }}
            />
            <button className="form-button" onClick={handleImageDelete}>
              Delete
            </button>
          </div>
        )}
      </div> */}

      <div className={`wrap-file ${wrapFileClass}`}>

        <div className="ui-file">
          <div className="form-file">
       
              <input type="file" onChange={handleImageChange}  ref={fileContentRef}/>

              <span className="txt-file">사진을 선택해주세요.</span>
    
      
            {selectedImage && selectedImage.image_path && (
              <div className="image-file">
                <img src={selectedImage.image_path} alt="Selected" />
              
              </div>
            )}
          </div>
          <button className="form-button" onClick={handleImageDelete}>파일 삭제</button>
        
         </div>
     
         {selectedFile && (
            <p className="select-file">파일명: <strong>{selectedFile.name}</strong></p>
          )}
      </div>
    
    </div>
  );
};

export default Editor;
