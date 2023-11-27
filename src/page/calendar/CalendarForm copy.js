import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarForm({}) {
  const token = localStorage.getItem('token');
  const [toDos, setTodos] = useState([]);
  const [toDiary, setToDiary] = useState([]);
  const [value, onChange] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState([]);
  const [matchingDay, setMatchingDay] = useState([]);
  const [matchingDayTodo, setMatchingDayTodo] = useState([]);
  const [selectedDiaryTitles, setSelectedDiaryTitles] = useState(new Date());
  const [selectedTodoContents, setSelectedTodoContents] = useState(new Date());
 

  useEffect(() => {
    getTodos();
    getDiarys();
    
  }, []);

  const getTodos = () => {
    axios.get(
      'https://diary-be.azurewebsites.net/todos',
      {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtaWQiOjEsImlhdCI6MTcwMDM3MDUzMX0.2NNWyqziEVRSjh3Ob-hYDvDHHHMZvMGJybOA7bg6SZw`,
        },
      }
    )
      .then(res => {
        setTodos(res.data);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  };

  const getDiarys = () => {
    axios.get(
      'https://diary-be.azurewebsites.net/mydiaries/',
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    )
      .then(res => {
        setToDiary(res.data);
      })
      .catch(error => {
        console.error('Error fetching diaries:', error);
      });
  };
  const formattedDates = toDos.data && toDos.data.map(data => moment(data.updated_at).format('DD-MM-YYYY'));
  const formattedDates2 = toDiary.data && toDiary.data.flatMap(data =>
    data.Mydiaries.map(diary => moment(diary.updated_at).format('DD-MM-YYYY'))
  );
  
  // 날짜 클릭 이벤트
  const handleDayClick = date => {
    
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setSelectedDate(formattedDate);

    const matchingDiaries = toDiary.data.filter(entry =>
      entry.Mydiaries.some(diary =>
        moment(diary.updated_at).format('YYYY-MM-DD') === formattedDate
      )
    );
    setMatchingDay(matchingDiaries);

    const diaryTitles = matchingDiaries
      .flatMap(entry =>
        entry.Mydiaries
          .filter(diary =>
            moment(diary.updated_at).format('YYYY-MM-DD') === formattedDate
          )
          .map(filteredDiary => filteredDiary.diary_title)
      );

    setSelectedDiaryTitles(diaryTitles);

    // todo
    const matchingTodos = toDos.data.filter(todo =>
      moment(todo.updated_at).format('YYYY-MM-DD') === formattedDate
    );
    setMatchingDayTodo(matchingTodos);

    const todosContents = matchingTodos
      .filter(todos =>
        moment(todos.updated_at).format('YYYY-MM-DD') === formattedDate
      )
      .map(filteredTodos => filteredTodos.todo_content)

      setSelectedTodoContents(todosContents);

  }

  console.log('matchingTodos',selectedTodoContents)
  console.log('matchingdiary',selectedDiaryTitles)
  return (
    <div>
      <Calendar
        onClickDay={handleDayClick}
        onChange={onChange} 
        tileClassName={({ date, view }) => {
          if (formattedDates?.find(x => x === moment(date).format('DD-MM-YYYY'))) {
            return 'highlight';
          }
          if (formattedDates2?.find(formattedDate => formattedDate === moment(date).format('DD-MM-YYYY'))) {
            return 'highlight2';
          }
          if (formattedDates2?.find(formattedDate => formattedDate === moment(date).format('DD-MM-YYYY')) && formattedDates?.find(x => x === moment(date).format('DD-MM-YYYY'))) {
            return 'highlight3';
          }
        }}
      />

      <div className="ui-list">
        <div className="txt-label">Todo 리스트</div>
        <ul className="list-form">
            {selectedTodoContents.map((content, index) => (
              <li key={index}>
                <a href="" >
                  <div className="data-list">{content} </div>
                </a>
                </li>
            ))}
          </ul>
        {selectedTodoContents.length > 0 ? (
            <ul className="list-form">
              {selectedTodoContents.map((content, index) => (
                <li key={index}>
                  <a href="" >
                    <div className="data-list">{content} </div>
                  </a>
                  </li>
              ))}
            </ul>
          ) : (
            <p className="data-nodata">해당 날짜 다이어리가 없습니다.</p>
          )}
        <div className="txt-label">다이어리 리스트</div>
        <div>
          {selectedDiaryTitles.length > 0 ? (
            <ul className="list-form">
              {selectedDiaryTitles.map((title, index) => (
                <li key={index}>
                  <a href="" >
                    <div className="data-list">{title} </div>
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
}

export default CalendarForm;
