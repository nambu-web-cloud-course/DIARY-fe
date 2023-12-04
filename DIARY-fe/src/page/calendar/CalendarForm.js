import React, { useState, useEffect } from 'react';
import instance from "../../api";
import moment from 'moment';
import Calendar from 'react-calendar';
import { FaCoffee } from 'react-icons/fa'; // 아이콘은 원하는 것으로 변경
//아이콘 라이브러리 설치
//npm install react-icons -f 
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom";

function CalendarForm() {
  const token = localStorage.getItem('token');
  const [toDos, setTodos] = useState([]);
  const [myDiariesData, setMyDiariesData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date());  
  const navigate = useNavigate();
 
  // 일자 선택 변경 시 감지 실행
  useEffect(() => {
    getTodos();
    getDiarys();
  }, [selectedDate]);


 
  const getTodos = () => {
    try {
      const startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(),0,0,0);
      const endDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 23, 59, 59);

        // alert(startDate + ""+endDate);

        instance
        .get(
          '/todos',      
            { 
                validateStatus: false ,
                params:{ StartDate : startDate, EndDate : endDate}
            }
          )
        .then((response) => {
          console.log('GET todos :', response.data.data)

          if (response.data.data && response.data.data.length > 0 ){
              // console.log('GET todos length :', response.data.length)
              setTodos(
                  response.data.data
              )
              // console.log('data', myDiariesData[0].Mydiaries[0]);

            } else {
                // alert('가져올 todos 없습니다.');
                setTodos()
                return;
            }
          })
        .catch((error) => {
            console.error('GET todos error ', error );
        })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  };

  const getDiarys = async () => {
      try {
        const startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(),0,0,0);
        const endDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 23, 59, 59);

        // alert(startDate + ""+endDate);

        instance
        .get(
          '/mydiaries',      
            { 
                validateStatus: false ,
                params:{ StartDate : startDate, EndDate : endDate}
            }
          )
        .then((response) => {
          console.log('GET mydiaries :', response.data.data)

          if (response.data.data && response.data.data.length > 0 ){
              // console.log('GET mydiaries length :', response.data.length)
              setMyDiariesData(
                  response.data.data
              )
              // console.log('data', myDiariesData[0].Mydiaries[0]);

            } else {
                // alert('가져올 mydiaries 없습니다.');
                setMyDiariesData()
                return;
            }
          })
        .catch((error) => {
            console.error('GET mydiaries error ', error );
        })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  };

  // 다이어리 선택시 이동
  function handleDiaryClick(myDiary){
    console.log('/diarydetail' + myDiary.id );
    navigate('/diaryview?id=' + myDiary.id );
  };

  // toso 선택시 이동
  function handleTodoClick(myTodo){
    console.log('/myTodo' + myTodo.id );
    navigate('/todolist?id=' + myTodo.id);
  };

  // 일자변경시 처리
  const handleDateChange = (date) => {
    // alert(date);
    setSelectedDate(date);
  };

  // 월변경시 처리
  const handleMonthChange = (date) => {
    // alert(date);
    setSelectedMonth(date);
  };


  // 아이콘 배치를 위한 처리
  const [dateWithIcon, setDateWithIcon] = useState([]);


  // 월 선택 변경 시 감지 실행
  useEffect(() => {
    iniCalendar();
  }, [selectedMonth]);


  // 선택 월의 할일 및 ToDo 정보 가져오기
  const iniCalendar = () => {
    try {
      // 월 검색 조건
      const startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
      const endDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0, 23, 59, 59);
      // alert(startDate + ""+endDate);

      instance
        .get(
          '/getmonth',      
            { 
                validateStatus: false ,
                params:{ StartDate : startDate, EndDate : endDate}
            }
          )
        .then((response) => {

          if (response.data.data && response.data.data.length > 0 ){
              setDateWithIcon(response.data.data);
          
            } else {
                // 아이콘 표시 기초 데이터 세팅
                setDateWithIcon();
                return;
            }
          })
        .catch((error) => {
            console.error('GET todos with Diary error ', error );
        })
      } catch (error) {
        console.error('Error fetching data:', error);
      }


  };
  

  const todosCreatedAt = dateWithIcon&&dateWithIcon.filter(item => item.data_type === "todos").map(item => item.created_date);


  const diaryCreatedAt = dateWithIcon&&dateWithIcon.filter(item => item.data_type === "mydiaries").map(item => item.created_date);


  
  return (
    <div>
      <Calendar 
        onClickDay={handleDateChange} 
        onClickMonth={handleMonthChange}
        value={selectedDate}
        tileClassName={({ date, view }) => {
          const formattedDate = moment(date).format('YYYY.MM.DD');
          let classNames = '';
          //todolist 가 있을경우 highlight 클래스 추가됨
          if (todosCreatedAt?.includes(formattedDate)) {
            classNames += ' highlight';
          }
          if (diaryCreatedAt?.includes(formattedDate)) {
            classNames += ' highlight2';
          }
          
          return classNames.trim();
        }}
      />

      <div className="ui-list">
        <div className="txt-label">Todo 리스트</div>
        <div>
          {toDos && toDos.length > 0 ? (
            <ul className="list-form">
              { toDos?.map((myTodo) => (
                <li key={myTodo.id} onClick={()=>{handleTodoClick(myTodo)}}>
                  <a href="" >
                    <div className="data-list">{myTodo.todo_content} </div>
                  </a>
                  </li>
              ))}
            </ul>
          ) : (
            <p className="data-nodata">해당 날짜 Todo 가 없습니다.</p>
          )}
        </div>
        <div className="txt-label">다이어리 리스트</div>
        
        <div>
          {myDiariesData && myDiariesData.length > 0 ? (
            <ul className="list-form">
              { myDiariesData[0]?.Mydiaries?.map((myDiary) => (
                <li key={myDiary.id} onClick={()=>{handleDiaryClick(myDiary)}}>
                  <a href="" >
                    <div className="data-list">{myDiary.diary_title} </div>
                  </a>
                  </li>
              ))}
            </ul>
          ) : (
            <p className="data-nodata">해당 날짜 다이어리가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarForm;