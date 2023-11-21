import React, { useState } from 'react';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser';

function DiaryEdit2() {
  const [movieContent, setMovieContent] = useState({
    diary_title: '',
    diary_content: '',
  });

  const [viewContent, setViewContent] = useState([]);

  const getValue = (e) => {
    const { name, value } = e.target;
    setMovieContent({
      ...movieContent,
      [name]: value,
    });
  };

  const submitReview = () => {
    axios.post(
      'https://diary-be.azurewebsites.net/mydiaries',
      {
        diary_title: movieContent.diary_title,
        diary_content: movieContent.diary_content,
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
    <div className="App">
      <input
        className="title-input"
        type="text"
        placeholder="제목"
        onChange={getValue}
        name="diary_title"
        value={movieContent.diary_title}
      />
      <CKEditor
        editor={ClassicEditor}
        data="<p>Hello from CKEditor&nbsp;5!</p>"
        onReady={(editor) => {
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
          setMovieContent({
            ...movieContent,
            diary_content: data,
          });
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
      />
      <button onClick={submitReview}>입력</button>
    </div>
  );
}

export default DiaryEdit2;
