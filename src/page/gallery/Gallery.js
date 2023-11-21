import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Calendar from '../calendar/CalendarForm';
//import { Select } from '@mantine/core';


const Gallery = () => {
  const [images, setImages] = useState([]); // 이미지 목록
  const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜
  const [orderBy, setOrderBy] = useState('latest'); // 정렬 순서

  // 페이지 로딩 시 이미지 불러오기
  useEffect(() => {
    
    const token = localStorage.getItem('token'); // 저장된 JWT 토큰 가져오기

    if (token) {// 선택된 달의 시작일과 종료일 계산
      const startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
      const endDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

      // API 서버로 요청을 보낼 때 토큰을 헤더에 추가
      axios.get('https://diary-be.azurewebsites.net/gallery/', {
        params: {
          userId: 'member_id', 
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          orderBy: orderBy,
        },
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      })
      .then(response => {
        setImages(response.data);
      })
      .catch(error => {
        console.error('이미지 불러오기 오류:', error);
      });
    }
  }, [selectedDate, orderBy]);

  // 정렬 순서 변경 시 호출되는 함수
  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };

  // 달력에서 날짜 변경 시 호출되는 함수
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
        {/* 달력 부분 */}
        <div className="page-gallary">
            <div class="page-title">
                갤러리
            </div>
            <div className="ui-top">
                <Calendar onChange={handleDateChange} value={selectedDate}/>
                <a href="javascript:" className="form-button">불러오기</a>

                {/* 정렬 순서 선택을 위한 셀렉트 박스 */}
                <label htmlFor="orderBy">정렬 순서:</label>
                <select id="orderBy" value={orderBy} onChange={handleOrderByChange}>
                    <option value="latest">최신순</option>
                    <option value="oldest">오래된순</option>
                </select>

                {/* 이미지를 나타내는 부분 */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    
                    {/* 각 이미지에 대한 Link*/}
                    {images.map((image, id) => (
                    <Link key={id} to={`/mydiaries/${image.date}`}>
                        <img 
                        src={`https://diary-be.azurewebsites.net/${image.containerName}/${image.imageName}`} 
                        alt={`Image ${id}`}
                        style={{ width: 'calc(33.333% - 16px)', marginBottom: '16px' }}
                        />
                    </Link>
                ))}            
                </div>
            </div>
        </div>
    </>
    );
};

export default Gallery;