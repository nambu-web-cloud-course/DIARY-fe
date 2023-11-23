import React, { useRef, useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import MyButton from "./MyButton";
const Editor = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
 
  const [diaryContent, setDiaryContent] = useState({
    diary_title:'',
    diary_content: '',
    cate_data_no:''
  });
  
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

  return (
    <div className="Editor">
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
