import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

const Todolist = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [searchTodo, setSearchTodo] = useState("");
  const contentRef = useRef();
  const [checkedTodos, setCheckedTodos] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [error, setError] = useState("");


   //할 일 목록 가져오기 
  const getTodos = async (date) => {
    try {
      const token = localStorage.getItem("token");
      const formattedDate = new Date(date).toISOString().split("T")[0];
      console.log("Formatted Date:", formattedDate); 
      const response = await axios.get(
        `https://diary-be.azurewebsites.net/todos?created_at=${formattedDate}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data.data);
      setTodos(response.data.data);
    } catch (error) {
      console.log("투두 리스트 가져오기 오류:", error);
      setError(error.message);
    }
  };
  
  
  
  

  useEffect(() => {
    // 페이지 로드시 초기 호출. 현재 날짜 가져오기
    const initializePage = async () => {
      const today = new Date().toLocaleDateString("ko-KR").split("T")[0];
      setSelectedDate(today);
      await getTodos(today);
    };
  
    initializePage();
  }, []); 


  //새로운 할 일 추가
  const addTodo = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("token");
      const newTodoValue = contentRef.current.value;
  
      if (!newTodoValue.trim()) {
        alert("할일을 작성해주세요.");
        return;
      }
  
      const response = await axios.post(
        "https://diary-be.azurewebsites.net/todos",
        { todo_content: newTodoValue },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.data && response.data.success) {
        // 추가 후 목록을 갱신하기 위해 현재 날짜로 getTodos 호출
        await getTodos(new Date().toLocaleDateString("ko-KR").split("T")[0]);
        console.log("서버 응답 야호!:", response.data.data);
      } else {
        console.error("왜 등록이 안될까 에러: ", response.data.data);
  
        if (
          response.data.error &&
          response.data.error.name === "SequelizeValidationError"
        ) {
          const validationErrors = response.data.error.errors.map(
            (error) => error.message
          );
          alert(`할일 등록 실패: ${validationErrors.join(", ")}`);
        } else {
          alert("할일 등록에 실패했습니다.");
        }
      }
  
      setNewTodo("");
    } catch (error) {
      console.error("에러ㅠㅠ:", error);
    }
  };
  

  //체크박스 상태 변경시
  const handleCheckboxChange = (todo) => {
    setCheckedTodos((prevChecked) => {
      if (prevChecked.includes(todo.id)) {
        return prevChecked.filter((id) => id !== todo.id);
      } else {
        return [...prevChecked, todo.id];
      }
    });
  };

  const deleteTodo = async () => {
    const token = localStorage.getItem("token");

    if (checkedTodos.length === 0) {
      alert("선택된 항목이 없습니다.");
      return;
    }

    if (checkedTodos.length > 1) {
      alert("하나씩만 삭제 가능합니다.");
      return;
    }

    const todoId = checkedTodos[0];

    try {
      await axios.delete(`https://diary-be.azurewebsites.net/todos/${todoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await getTodos(selectedDate); // 삭제 후 목록을 갱신하기 위해 호출

      setCheckedTodos([]);
      alert("삭제되었습니다.");
    } catch (error) {
      console.error("투두 삭제 오류:", error);
      alert("투두 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleSearch = (e) => {
    setSearchTodo(e.target.value);
  };

  const filteredTodos = searchTodo
    ? todos.filter((todo) =>
        todo.todo_content.toLowerCase().includes(searchTodo.toLowerCase())
      )
    : todos;


    //날짜 변경 버튼 클릭시. 이전, 현재, 다음
  const handleDateChange = async (action) => {
  const curDate = new Date(selectedDate);
  let newDate;

  if (action === "now") {
    newDate = curDate;
  } else if (action === "prev") {
    newDate = new Date(curDate);
    newDate.setDate(curDate.getDate() - 1);
  } else if (action === "next") {
    newDate = new Date(curDate);
    newDate.setDate(curDate.getDate() + 1);
  } else {
    newDate = action;
  }

  const currentDate = new Date();
  if (newDate > currentDate) {
    alert("현재 날짜 이후 날짜는 선택할 수 없습니다.");
    return;
  }

  const formattedDate = newDate.toLocaleDateString("ko-KR").split("T")[0];

  // setSelectedDate를 호출하여 state를 업데이트
  setSelectedDate(formattedDate);

  // 서버에서 데이터 가져오기
  await getTodos(formattedDate);
};



    

  return (
    <div>
      {/* TodoList */}
      <div className="page-todolist">
        <div className="page-title">
          Todo 리스트
          <a href="/calendar" className="btn-calen">
            <img
              src="calendar-icon.png"
              alt="Calendar Icon"
              className="btn-calen"
            />
          </a>
        </div>
        <div className="page-contents">
          <div className="data-day">
            <button onClick={() => handleDateChange("prev")}>
              <h2>이전</h2>{" "}
            </button>
            <button onClick={() => handleDateChange("now")}>
              <h2>{selectedDate}</h2>{" "}
            </button>
            <button onClick={() => handleDateChange("next")}>
              <h2>다음</h2>
            </button>
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
            {filteredTodos &&
            filteredTodos.length === 0 &&
            newTodo.trim() === "" ? (
              <div className="data-nodata">
                Todo 리스트가 없습니다.
                <br />
                Todo 리스트를 추가해주세요.
              </div>
            ) : (
              <ul className="form-list">
                {/* {filteredTodos.map((todo) => (*/}
                {filteredTodos &&
                  filteredTodos.map((todo) => (
                    <li key={todo.id}>
                      <input
                        type="checkbox"
                        checked={checkedTodos.includes(todo.id)}
                        onChange={() => handleCheckboxChange(todo)}
                      />
                      {/* <input box newTodo={newTodo} setNewTodo={setNewTodo}/> */}
                      {todo.todo_content}
                     

                    <div className="data-list">
                    
                      <button
                        className="form-button type-s-dark"
                        onClick={() => deleteTodo(todo)}
                      >
                        삭제
                      </button>
                    </div>
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
