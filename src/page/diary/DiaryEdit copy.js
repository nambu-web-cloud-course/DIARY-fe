//DiaryEdit페이지

import axios from 'axios';
import React, { useState, useRef } from "react";
import EditorForm from "../editor/EditorForm";
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { useEffect } from "react";
// import ThemeImgs from './ThemeImgs';

function DiaryEdit() {
    
    const didMountRef = useRef(false);

    let subtitle;
    // 저장된 JWT 토큰 가져오기
    const token = localStorage.getItem("token");

    // 새일기 저장
    function postDiary() {

        alert ("Post Diary!!!")

        alert( selectedTheme.id + " " + selectedText1.id);

        if (token) {
            // 다이어리 저장하기
            axios.post('https://diary-be.azurewebsites.net/mydiaries',
                {   
                    theme_no : selectedTheme.id,
                    // theme_no : "3",
                    diary_content : "diary_content test ",
                    cate_data_no : selectedText1.id,
                    // cate_data_no : "3",
                    diary_title : "post test4"
                },
                { 
                    headers: { Authorization: `Bearer ${token}` }
                    
                },
                
              )
              .then((response) => {
                console.log('POST Diary :', response.data.data)
              })
              .catch((error) => {
                console.log("심각한 에러 발생 : ",error);
                console.error('POST Diary error ', error );
              });

          }
    }

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



    // useEffect(()=>{
    // //localStorage에서 선택한 텍스트 불러오기
    // const savedSelectedText1 = localStorage.getItem('selectedText1');

    // //불러온 텍스트가 있다면 상태에 설정
    // if (savedSelectedText1 && modal1IsOpen) {
    //     setSelectedText1(savedSelectedText1);
    // }


    // if(modal2IsOpen){
    //     console.log( 'MoalIsOpen :' + themeImages.data);
    //     // fetchThemeImages();
    // }

    // // const savedSelectedImage = localStorage.getItem('images');

    // // if (savedSelectedImage && modal2IsOpen) {
    // //   setImages(JSON.parse(savedSelectedImage));
    // // } else { 
    // //   fetchImages();
    // // }

    // }, [modal1IsOpen, modal2IsOpen]) 
    // modal1IsOpen 또는 modal2IsOpen이 업데이트될 때 실행(새로고침해도 선택한 텍스트 그대로 유지)


    // modal1IsOpen, modal2IsOpen
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

    // function afterOpenModal() {
    //   // references are now sync'd and can be accessed.
    //   subtitle.style.color = '#f00';
    // }

    // function handleSelect1(setSelectedText1){
    // return()=>{ 
    //     const selectedText1 = window.getSelection().toString();
    //     setSelectedText1(selectedText1);
    // }
    // };


    // // 배경선택 모달 클릭시
    // function handleSelect2(){
    //     console.log("handleSelect2")
    // };

    // function closeModalHandler1(selectedText1, setSelectedText1){
    // //모달이 닫힌 후에 선택한 텍스트를 기본 텍스트에 덮어쓰기
    // if (selectedText1){
    //     setBaseText1(selectedText1);
        
    //     //선택한 텍스트를 localStroage에 저장
    //     localStorage.setItem('selectedText1', selectedText1);
    //     };

    // };

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
        <div className="wrap-page">
            <div className="page-diary">
            <div><Link to="/diaryhome" className="btn-back">Home</Link> {' '}</div> 

            {/* Top Diary */}
            <div className="page-title">새 일기 쓰기</div>
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
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
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
                    

                    {/* 모달이 닫힌 후에 선택한 이미지를 표시 */}
                    {selectedTheme ? (
                        <div>
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
                    {selectedTheme ? (
                        <div>{selectedTheme.themeimg_title}</div>
                    ) : (
                        <p></p>
                    )}

                </div>
            </div>
            
            <div className="top-diary">
                {/* <span className="data-name">
                일기 제목일기 제목일기 제목일기 제목일기 제목일기 제목일기 제목
                </span> */}
            </div>
            
            <div className="ui-day">
                <div className="data-day">2023.11.10(금)
                    <a href="javascript:" className="btn-calen"></a></div>
            </div>

            {/* Editor */}
                <EditorForm></EditorForm>

            <div className="ui-buttons">
                <a href="javascript:" className="form-button" onClick={postDiary} >저장</a>
                <a href="javascript:" className="form-button type-dark">취소</a>

                {/*<button onClick={handleSave} className="form-button">저장</button>
                <a href="javascript:" className="form-button type-dark">취소</a> */}
            </div>
        
        </div>
        </div>
    )
    };

export default DiaryEdit;