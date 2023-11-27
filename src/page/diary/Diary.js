import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function Diary() {
  const token = localStorage.getItem("token");
  const [myDiariesData, setMyDiariesData] = useState([]);
  const [cateData, setCateData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch MyDiaries data
        const myDiariesResponse = await axios.get('https://diary-be.azurewebsites.net/mydiaries/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setMyDiariesData(myDiariesResponse.data);

        // Fetch CateData
        const cateDataResponse = await axios.get('https://diary-be.azurewebsites.net/cate_data/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setCateData(cateDataResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  const getCateData = (cateDataNo) => {
    const cateEntry = cateData.data?.find(entry => entry.id === cateDataNo);
    return cateEntry ? cateEntry.cate_data : [];
  };

  const filteredEntries = () => {
    return myDiariesData.data?.filter(diaryEntry => {
      return diaryEntry.Mydiaries.some(myDiary => {
        const diaryDate = new Date(myDiary.updated_at);
        return diaryDate.toDateString() === selectedDate.toDateString();
      });
    });
  };
  return (
    <>
      {/* diary */}
      <div className="page-diary">
        <div className="data-day">
          <DatePicker selected={selectedDate} onChange={handleDateChange} value={selectedDate} />
          <Link to="/calendar" className="btn-calen"></Link>
        </div>
        <div className="page-title">내가 쓴 일기</div>

        {filteredEntries()?.map((diaryEntry) => (
          <div className="wrap-box" key={diaryEntry.id}>
            {diaryEntry.Mydiaries.map((myDiary) => (
              <div className="box-diary" key={myDiary.id}>
                <div className="box-title">
                  <span className="data-category">[{getCateData(myDiary.cate_data_no)}] </span>
                  <span className="data-name">{myDiary.diary_title}</span>
                </div>
                <div className="data-image">내 일기 1 커버 이미지</div>
              </div>
            ))}
          </div>
        ))}
        <div className="fix-buttons">
          <Link to="/mydiaries" className="form-button">
            새 일기 쓰기
          </Link>
        </div>
      </div>
    </>
  );
}

export default Diary;

