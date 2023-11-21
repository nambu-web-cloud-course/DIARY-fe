import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DiaryEdit2 = () => {
  const token = localStorage.getItem("token");
  const [myDiary,setMyDiary] = useState([]);
  const [postData, setPostData] = useState({
    // 이곳에 전송하고자 하는 데이터를 초기화합니다.
    diary_title: 'value1',
    diary_content: 'value2',
  });
  useEffect(() => {
    getDiary();
  },[]);
  const getDiary = () => {
    axios.get(
      'https://diary-be.azurewebsites.net/mydiaries/',
      {
        headers: { Authorization: `Bearer ${token}` },
      })
    .then(res => {
      console.log(res.data);
      
    }).catch(error => {
        console.log(error)
    })
}; 

  const handlePostRequest = async () => {
    try {
      const response = await axios.post('https://diary-be.azurewebsites.net/mydiaries/', {
        diary_content:'test',
        diary_title:'test'
      },
      {
        headers: { Authorization: `Bearer ${token}` },
        
      },
      postData).then(res => {
        console.log('POST 요청 성공:', res.data);
        
      })
      // 성공적으로 요청이 완료된 경우 원하는 작업을 수행합니다.
    } catch (error) {
      console.error('POST 요청 실패:', error);
      // 요청이 실패한 경우 에러 처리를 수행합니다.
    }
  };

  return (
    <div>
      <h1>POST 요청 보내기</h1>
      <button onClick={handlePostRequest}>POST 요청 보내기</button>
    </div>
  );
};

export default DiaryEdit2;
