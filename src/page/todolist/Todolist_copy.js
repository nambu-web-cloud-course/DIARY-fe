import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
//import jwt_decode from 'jwt-decode';

const Todolist = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [searchTodo, setSearchTodo] = useState("");
  //const [error, setError] = useState("");
  const contentRef = useRef();
  const [checkedTodos, setCheckedTodos] = useState([]);
  const [curDate, setcurDate] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const setError = '';

  useEffect(() => {
    // 저장된 JWT 토큰 가져오기
    const token = localStorage.getItem("token");
    //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtaWQiOjEsImlhdCI6MTcwMDQ2Nzk2NH0.aq62dcgSt-3mj4YLlsCGw8E7L2kUWn2hQhIiC_XEML0';

    // 현재 날짜 가져오기 
    const today = new Date().toLocaleDateString('ko-KR').split("T")[0];
    setcurDate(today);

    // 초기 선택된 날짜 설정
    setSelectedDate(today);

    if (token) {

      axios
        .get(
          `https://diary-be.azurewebsites.net/todos/${today}`,
          //"https://diary-be.azurewebsites.net/todos",
          // "http://localhost:8080/todos",
          
          { validateStatus: false },
          {
            headers: { Authorization: `Bearer ${token}` },
            //headers: { Authorization: `Bearer ${token}` , 'Cache-Control':'no-cache',},//캐시 사용 방지
            
          }
        )
        .then((res) => {
          // setTodos(res.data.data);
          console.log(res.data.data);
        })
        .catch((error) => {
          console.log("심각한 에러 발생 : ", error);
          setError(error.message);
        });
    }
  });

  const addTodo = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtaWQiOjEsImlhdCI6MTcwMDQ2Nzk2NH0.aq62dcgSt-3mj4YLlsCGw8E7L2kUWn2hQhIiC_XEML0';
      
      // setNewTodo(contentRef.current.value);
      // console.log(newTodo);
      const newTodoValue = contentRef.current.value;
      console.log(newTodoValue);

      if (!newTodo.trim()) {
        alert("할일을 작성해주세요.");
        return;
      }

      // //현재 로그인된 사용자의 member_no 가져오기
      //   const getCurrentUserMembersNo = () => {
      //   const token = localStorage.getItem("token");

      //   if(token){
      //     const decodedToken = jwt_decode(token);
      //     return decodedToken.member_no;
      //   }
      //   return null;
      //  }

      //  const members_no = getCurrentUserMembersNo();

      const response = await axios.post(
        "https://diary-be.azurewebsites.net/todos",
        // "http://localhost:8080/todos",
        //{ todo_content: newTodo, members_no:members_no},
        { todo_content: newTodo},
        //{ todo_content: newTodo, members_no:1},
        {
          headers: { Authorization: `Bearer ${token}` },
          //validateStatus: false,
        }
      );
        console.log(token);
      if (response.data && response.data.success) {
        setTodos([...todos, response.data.data]);
        console.log("서버 응답 야호!:", response.data.data);
        

      } else {
        console.error("왜 등록이 안될까 에러: ", response.data.data);

        // 에러가 SequelizeValidationError인 경우
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

  //체크박스 상태 변경 핸들러
  const handleCheckboxChange = (todo) => {
    setCheckedTodos((prevChecked) => {
      if (prevChecked.includes(todo.id)) {
        return prevChecked.filter((id) => id !== todo.id);
      } else {
        return [...prevChecked, todo.id];
      }
    });
  };

  // 선택된 할일 삭제
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

    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== todoId)
    );

    setCheckedTodos([]);
    alert("삭제되었습니다.");
  } catch (error) {
    console.error("투두 삭제 오류:", error);
    alert("투두 삭제 중 오류가 발생했습니다.");
  }
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

  //   const handleSearchButton = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.get(
  //       `https://diary-be.azurewebsites.net/todos?date=${selectedDate}&search=${searchTodo}`,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     setTodos(response.data.data);
  //   } catch (error) {
  //     console.error("투두 리스트 가져오기 오류:", error);
  //   }
  // };



  // 날짜 변경 핸들러
  const handleDateChange = async (action) => {
    
    const curDate = new Date(selectedDate);
    let newDate;

    if (action === "now") {
      newDate = new Date(curDate);
      newDate.setDate(curDate.getDate());
    } else if (action === "prev") {
      newDate = new Date(curDate);
      newDate.setDate(curDate.getDate() - 1);
    } else if (action === "next") {
      newDate = new Date(curDate);
      newDate.setDate(curDate.getDate() + 1);
    } else {
      newDate = action;
    }

    const SetCurDate = newDate.toLocaleDateString('ko-KR').split("T")[0];
    setSelectedDate(SetCurDate);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://diary-be.azurewebsites.net/todos?created_at=${SetCurDate}`,
        // `http://localhost:8080/todos?created_at=${SetCurDate}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTodos((prevTodos) => response.data.data);
    } catch (error) {
      console.log("투두 리스트 가져오기 오류:", error);
    }
  };

     //ChangeDateTodolist(formattedDate, localStorage.getItem('token'));

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
              //onChange={(e) => setSearchTodo(e.target.value)}
            />
            <button
              className="form-button"
              onClick={() => setSearchTodo(searchTodo)}
              //onClick={handleSearchButton}
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
