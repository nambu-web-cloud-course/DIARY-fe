import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-modal';


function Diary() {
    let subtitle;
    
    const [modalIsOpen, setIsOpen] = React.useState(false);
    
    const [modalIsOpen2, setIsOpen2] = React.useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
    function openModal2() {
        setIsOpen2(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
      setIsOpen2(false);
    }
    return (
        <>
        {/* diary */}
        <div className="page-diary">
            <div className="data-day">2023.11.10(금) <a href="/calendar" className="btn-calen">달력아이콘</a></div>
            <div class="page-title">
                내가 쓴 일기
            </div>
            <div>
            <div>
                <button onClick={openModal}>배경</button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
                    <button onClick={closeModal} classNmae="modal-close" style={{
                        position:'absolute',
                        top:'20px',
                        right:'20px'
                    }}>close</button>
                    배경 팝업 내용
                   
                </Modal>
             </div>

            <div className="">
                <button onClick={openModal2}>카테고리</button>
                <Modal
                    id="cate-modal"
                    isOpen={modalIsOpen2}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
                    <button onClick={closeModal} classNmae="modal-close" style={{
                        position:'absolute',
                        top:'20px',
                        right:'20px'
                    }}>close</button>
                    카테고리 팝업 내용
                   
                </Modal>
             </div>
            </div>
 
            <div className="wrap-box">
                {/* Box */}
                <div className="box-diary">
                    <div className="box-title">
                        <span className="data-category">[카테고리명] </span>
                        
                        <span className="data-name">
                        일기 제목일기 제목일기 제목일기 제목일기 제목일기 제목일기 제목
                        </span>
                    </div>
                    <div className="data-image">
                        내 일기 1
                        커버 이미지
                    </div>
                    
                </div>
                    {/* Box */}
                    <div className="box-diary">
                    <div className="box-title">
                        <span className="data-category">[카테고리명] </span>
                        
                        <span className="data-name">
                            일기 제목일기 
                        </span>
                    </div>
                    <div className="data-image">
                        내 일기 1
                        커버 이미지
                    </div>
                    
                </div>
            </div>


            <div className="fix-buttons">
                <Link to="/diaryedit" className="form-button">새 일기 쓰기</Link>
                {/* <a href="/mydiaries" className="form-button">새 일기 쓰기</a> */}
            </div>
        </div>
      </>
    )
}

export default Diary;
