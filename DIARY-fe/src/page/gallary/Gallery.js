import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
//import { Select } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import instance from "../../api";

const Gallery = () => {
  const [images, setImages] = useState([]); // 이미지 목록
  const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜
  const [orderBy, setOrderBy] = useState("desc"); // 정렬 순서
  const navigate = useNavigate();

  const getGallery = async () => {
    try {
      const token = localStorage.getItem("token"); // 저장된 JWT 토큰 가져오기

      if (token) {
        // 선택된 달의 시작일과 종료일 계산
        // alert(selectedDate)
        const startDate = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          1
        );
        const endDate = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth() + 1,
          0,
          23,
          59,
          59
        );
        // alert(startDate + ""+endDate);

        // 갤러리 데이터 가져오기
        const response = await instance.get("/gallery", {
          validateStatus: false,
          params: { StartDate: startDate, EndDate: endDate, OrderBy: orderBy },
        });

        if (response.data.data && response.data.data.length > 0) {
          setImages({
            data: response.data.data,
          });
        } else {
          setImages([]);
        }
      }
    } catch (error) {
      console.error("GET Gallery error", error);
    }
  };

  // 컴포넌트가 처음 로드될 때 갤러리 데이터를 가져옴
  useEffect(() => {
    getGallery();
  }, []);

  const handleImageClick = (image) => {
    console.log("handleImageClick:", image.image_path);
    console.log("/diaryview?id=" + image.diary_no);
    navigate("/diaryview?id=" + image.diary_no);
  };

  // 정렬 순서 변경 시 호출되는 함수
  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };

  // 달력에서 날짜 변경 시 호출되는 함수
  const handleDateChange = (date) => {
    //alert(date);
    setSelectedDate(date);
  };

  return (
    <>
      {/* 달력 부분 */}
      <div className="page-gallery">
        <div class="page-title">갤러리</div>
        <div className="ui-top">
          <Calendar onClickMonth={handleDateChange} value={selectedDate} />
          <div className="">

            <select id="orderBy" value={orderBy} onChange={handleOrderByChange}>
              {/* <option value="asc">최신순</option>
                      <option value="desc">오래된순</option> */}
              <option value="desc">최신순</option>
              <option value="asc">오래된순</option>
            </select>

            <button onClick={getGallery} className="form-button">
              불러오기
            </button>
          </div>
        </div>

        {/* 이미지를 나타내는 부분 */}
        <div className="wrap-gallery">
        {images.data && images.data.length > 0 ? (
          images.data.map((image) => (
            <div className="ui-gallery" key={image.diary_no}>
              <img
                src={image.image_path}
                alt={image.image_path}
                onClick={() => {
                  handleImageClick(image);
                }}
              />
            </div>
          ))
        ) : (
          <div className="data-nodata">
            가져올 이미지가 없습니다.
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default Gallery;