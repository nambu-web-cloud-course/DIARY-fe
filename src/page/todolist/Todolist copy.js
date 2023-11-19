import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

const Todolist = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [searchTodo, setSearchTodo] = useState("");
  const [error, setError] = useState("");
  const contentRef = useRef();
  const [checkedTodos, setCheckedTodos] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  
  useEffect(() => {
    // 저장된 JWT 토큰 가져오기
    const token = localStorage.getItem("token");
    //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtaWQiOjEsImlhdCI6MTcwMDE4ODQzMH0.0oFDWqt-H2M5qHVh9-jvA_J9_pliQ-feoDjtuQ8M-ok';

    // 현재 날짜 가져오기 (YYYY-MM-DD 형식)
    const today = new Date().toISOString().split('T')[0];
    setCurrentDate(today);
    
    // 초기 선택된 날짜 설정
    setSelectedDate(today);

    if (token) {
      axios
        .get(
          "https://diary-be.azurewebsites.net/todos",
          { validateStatus: false },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setTodos(res.data.data); 
          console.log(res.data.data)})
        .catch((error) => setError(error.message));
    }
  },[]);


  const addTodo = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtaWQiOjEsImlhdCI6MTcwMDE4ODQzMH0.0oFDWqt-H2M5qHVh9-jvA_J9_pliQ-feoDjtuQ8M-ok';
      setNewTodo(contentRef.current.value);
      console.log(newTodo);

      const response = await axios.post(
        "https://diary-be.azurewebsites.net/todos",
        //{ todo_content: newTodo, members_no:1},
        { todo_content: newTodo},
        { headers: { Authorization: `Bearer ${token}` },
          validateStatus: false, 
        }
      );

      console.log("서버 응답 야호!:", response.data);

      if (response.data && response.data.success) {
        setTodos([...todos, response.data.data]);
      } else {
        console.error("응답이 왜....?: ", response.data.data);
      }
      setNewTodo("");
    } catch (error) {
      console.error("에러ㅠㅠ:", error);
    }
  };



  

  //체크박스 상태 변경 핸들러
  const handleCheckboxChange = (members_no) => {
    setCheckedTodos((prevChecked) => {
      if (prevChecked.includes(members_no)) {
        return prevChecked.filter((id) => id !== members_no);
      } else {
        return [...prevChecked, members_no];
      }
    });
  };


    // 선택된 할일 삭제
    const deleteTodo = () => {
      const token = localStorage.getItem("token");
      //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtaWQiOjEsImlhdCI6MTcwMDE4ODQzMH0.0oFDWqt-H2M5qHVh9-jvA_J9_pliQ-feoDjtuQ8M-ok';
      if (checkedTodos.length === 0) {
        alert("선택된 항목이 없습니다.");
        return;
      }
      checkedTodos.forEach(async (checkedMemberNo) => {
        try {
          await axios.delete(`https://diary-be.azurewebsites.net/todos/${checkedMemberNo}`, {
            headers: { Authorization: token },
          });
          setTodos((prevTodos) =>
            prevTodos.filter((todos) => todos.members_no !== checkedMemberNo)
          );
        } catch (error) {
          console.error("투두 삭제 오류:", error);
        }
      });

      setCheckedTodos([]);
  };

  // 검색어 변경시 실행되는 함수
  const handleSearch = (e) => {
    setSearchTodo(e.target.value);
  };

  // 검색된 투두 리스트 필터링
  const filteredTodos = searchTodo
    ? todos.filter((todos) =>
        todos.todo_content.toLowerCase().includes(searchTodo.toLowerCase())
      )
    : todos;


    // 날짜 변경 핸들러
    const handleDateChange = (action) => {
    const currentDateObject = new Date(selectedDate);
    let newDate;

    if (action === 'prev') {
      newDate = new Date(currentDateObject);
      newDate.setDate(currentDateObject.getDate() - 1);
    } else if (action === 'next') {
      newDate = new Date(currentDateObject);
      newDate.setDate(currentDateObject.getDate() + 1);
    } else {
      newDate = action;
    }

     const formattedDate = newDate.toISOString().split('T')[0];
     setSelectedDate(formattedDate);
  //   ChangeDateTodolist(formattedDate, localStorage.getItem('token'));
  
};





  return (
    <div>
      {/* TodoList */}
      <div className="page-todolist">
        <div className="page-title">
          Todo 리스트
          <a href="/calendar" className="btn-calen">달력아이콘</a>
          <img
            src="calendar-icon.png"
            alt="Calendar Icon"
            className="btn-calen"
          />
        </div>
        <div className="page-contents">
          <div className="data-day">
            <button onClick={()=>handleDateChange('prev')}>이전 </button>
            {currentDate}
            <button onClick={()=>handleDateChange('next')}> 다음</button>
        </div>

          {/* Form */}
          <form className="form-type" onSubmit={addTodo}>
            <input
              ref={contentRef}
              type="text"
              id="newTodo"
              name="todo_content"
              placeholder="Todo 리스트를 추가해주세요 "
              className="form-input"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <button className="form-button">추가</button>
          </form>

          {/* Form */}
          <div className="form-type">
            <input
              type="text"
              id="searchTodo"
              name="todo_content"
              placeholder="Todo 리스트를 검색해주세요. "
              className="form-input"
              value={searchTodo}
              onChange={handleSearch}
              //onChange={(e) => setSearchTodo(e.target.value)}
            />
            <button
              className="form-button"
              onClick={() => setSearchTodo(searchTodo)}
            >
              검색
            </button>
          </div>

          {/* List */}
          <div className="wrap-list">
            {/* Data 가 없을 경우 */}
            {filteredTodos && filteredTodos.length === 0 && newTodo.trim() === "" ? (
               <div className="data-nodata">
                Todo 리스트가 없습니다.
                <br />
                Todo 리스트를 추가해주세요.
              </div>
            ) : (
              <ul className="form-list">
              {/* {filteredTodos.map((todo) => (*/}
                {filteredTodos && filteredTodos.map((todo) => (
                  <li key={todo.id}>
                    <input type="checkbox" 
                      checked={checkedTodos.includes(todo.todo_content)} 
                      onChange={() => handleCheckboxChange(todo.todo_content)}
                    />
                  {todo.todo_content}
                    <div className="data-list">{todo.members_no}</div>
                    <button
                      className="form-button type-s-dark"
                      onClick={() => deleteTodo()}
                    >
                      삭제
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todolist;

