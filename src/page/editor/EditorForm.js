// import { useState } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import ReactHtmlParser from 'react-html-parser';
// //import axios from 'axios';

// function DiaryEdit2() {
 

//   const [movieContent, setMovieContent] = useState({
//     title: '',
//     content: '',
//   });
//   const [viewContent, setViewContent] = useState([]);
//   const getValue = (e) => {
//     const { name, value } = e.target;
//     setMovieContent({
//       ...movieContent,
//       [name]: value,
//     });
//   };
//   // const submitReview = ()=>{
//   //   axios.get('https://diary-be.azurewebsites.net/mydiaries',
//   //   {
//   //     headers: {
//   //       'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtaWQiOjEsImlhdCI6MTcwMDM3MDUzMX0.2NNWyqziEVRSjh3Ob-hYDvDHHHMZvMGJybOA7bg6SZw`,
//   //     },
//   //   })
//   //   .then(res => {
//   //       movieContent(res.data);
//   //       console.log(res.data);
//   //   }).catch(error => {
//   //       console.log(error)
//   //   })
//   // };
//   return (
//     <div className="App">
//       <div>
//         {viewContent.map((element, index) => (
//           <div key={index}>
//             <h2>{element.title}</h2>
//             <div>{ReactHtmlParser(element.content)}</div>
//           </div>
//         ))}
//       </div>
//       <input
//         className="title-input"
//         type="text"
//         placeholder="제목"
//         onChange={getValue}
//         name="title"
//       />
//       <CKEditor
//         editor={ClassicEditor}
//         data="<p>Hello from CKEditor&nbsp;5!</p>"
//         onReady={(editor) => {
//           console.log('Editor is ready to use!', editor);
//         }}
//         onChange={(event, editor) => {
//           const data = editor.getData();
//           console.log({ event, editor, data });
//           setMovieContent({
//             ...movieContent,
//             content: data,
//           });
//           console.log(movieContent);
//         }}
//         onBlur={(event, editor) => {
//           console.log('Blur.', editor);
//         }}
//         onFocus={(event, editor) => {
//           console.log('Focus.', editor);
//         }}
//       />
//       {/* <button onClick={submitReview}>입력</button> */}
//       <button
//         type="button"
//         onClick={() => {
//           setViewContent(viewContent.concat({ ...movieContent }));
//         }}
//       >
//         입력
//       </button>
//     </div>
//   );
// }

// export default DiaryEdit2;
