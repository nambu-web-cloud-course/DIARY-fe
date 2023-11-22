import React, { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import MyButton from "./MyButton";



const Editor = () => {
  
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const titleRef = useRef();

  const [title, setTitle] = useState("");
 
  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          loader.file.then((file) => {
            formData.append("file", file);
            axios
              .post("https://diary-be.azurewebsites.net/mydiaries/",
              {
                headers: { Authorization: `Bearer ${token}` },
              }, formData)
              .then((res) => {
                // resolve({
                //   default: res.data.data.uri,
                // });
              })
              .catch((err) => reject(err));
          });
        });
      },
    };
  };


  class CustomUploadAdapter {
    constructor(loader) {
      this.loader = loader;
    }
  
    upload() {
      return new Promise((resolve, reject) => {
        this.loader.file.then((file) => {
          const data = new FormData();
          data.append("name", file.name);
          data.append("file", file);
  
          // 데이터를 서버로 전송하는 부분을 여기에 작성해야 합니다.
          // 아래 코드는 Blob URL을 생성하며 이를 사용하여 이미지를 삽입합니다.
          resolve({ default: window.URL.createObjectURL(file) });
        });
      });
    }
  
    abort() {
      // 파일 전송이 중단될 때 처리하는 로직을 작성해야 합니다.
    }
  }
  const [diaryContent, setDiaryContent] = useState({
    diary_title: '',
    diary_content: '',
    cate_data_no:''
  });

  const [viewContent, setViewContent] = useState([]);

  const submitReview = () => {
    axios.post(
      'https://diary-be.azurewebsites.net/mydiaries',
      {
        diary_title: diaryContent.diary_title,
        diary_content: diaryContent.diary_content,
        cate_data_no:'1',
      },
      {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtaWQiOjEsImlhdCI6MTcwMDM3MDUzMX0.2NNWyqziEVRSjh3Ob-hYDvDHHHMZvMGJybOA7bg6SZw`,
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




  return (
    <div className="Editor">
      <section>
        <div className="title-wrapper">
          <input type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            ref={titleRef}
          />
        </div>
      </section>
      <section>
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
    </div>
  );
};

export default Editor;