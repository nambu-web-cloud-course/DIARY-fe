import instance from "../../api";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

function Diary() {
  const token = localStorage.getItem("token");
  const [myDiariesData, setMyDiariesData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();
  const [orderBy, setOrderBy] = useState("desc"); // 정렬 순서

  const handleDateChange = (date) => {
    // alert(date);
    setSelectedDate(date);
  };

  function handleImageClick(myDiary) {
    console.log("/diarydetail" + myDiary.id);
    navigate("/diaryview?id=" + myDiary.id);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startDate = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          0,
          0,
          0
        );
        const endDate = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          23,
          59,
          59
        );

        instance
          .get(
            '/mydiaries',
            {
              validateStatus: false,
              params: {
                StartDate: startDate,
                EndDate: endDate,
                OrderBy: orderBy,
              },
            }
          )
          .then((response) => {
            console.log("GET mydiaries :", response.data.data);

            if (response.data.data && response.data.data.length > 0) {
              // console.log('GET mydiaries length :', response.data.length)
              setMyDiariesData(response.data.data);
              // console.log('data', myDiariesData[0].Mydiaries[0]);
            } else {
              // alert('가져올 mydiaries 없습니다.');
              setMyDiariesData([]);
              return;
            }
          })
          .catch((error) => {
            console.error("GET mydiaries error ", error);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedDate]);

  const filteredEntries = () => {
    return myDiariesData.data?.filter((diaryEntry) => {
      return diaryEntry.Mydiaries.some((myDiary) => {
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

        <div className="wrap-box">
        {myDiariesData && myDiariesData[0]?.Mydiaries?.length > 0 ? (
          myDiariesData[0]?.Mydiaries?.map((myDiary) => (
            <div className="box-diary" key={myDiary.id}>
              <div className="box-title">
                <span className="data-category">[{myDiary.Cate_datum?.cate_data}] </span>
                <span className="data-name">{myDiary.diary_title}</span>
              </div>
              <div className="data-image" onClick={() => handleImageClick(myDiary)}>
                <img
                  key={myDiary.id}
                  src={myDiary.Themeimg?.themeimg_path}
                  alt={myDiary.Themeimg?.themeimg_path}
                /><div className="diary-contents" dangerouslySetInnerHTML={{ __html: myDiary?.diary_content }} />
              </div>
            </div>
          ))
        ) : (
          <div className="data-nodata">
            작성된 일기가 없습니다.
          </div>
        )}
      </div>

        <div className="fix-buttons">
          <Link to="/diaryedit" className="form-button">
            새 일기 쓰기
          </Link>
        </div>
      </div>
    </>
  );
}

export default Diary;
