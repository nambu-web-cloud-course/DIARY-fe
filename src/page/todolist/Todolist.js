import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

const Todolist = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [searchTodo, setSearchTodo] = useState("");
  const [error, setError] = useState("");
  const contentRef = useRef();
  const [checkedTodos, setCheckedTodos] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtaWQiOjEsImlhdCI6MTcwMDExMDg4Mn0.tMskdD90yKKLEjJp94kRr-Bjg88Fol6Z-ZSMMotOZaA';

    if (token) {
      axios
        .get(
          "/todos",
          { validateStatus: false },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {setTodos(res.data.data); 
                      console.log(res.data.data)})
        .catch((error) => setError(error.message));
    }
  });

  const addTodo = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      
      setNewTodo(contentRef.current.value);
      console.log(newTodo);

      const response = await axios.post(
        "http://localhost:8080/todos",
        { todo_content: newTodo, completed: false , members_no:1},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("서버 응답:", response.data);

      if (response.data && response.data.success) {
        setTodos([...todos, response.data.data]);
      } else {
        console.error("Invalid response format:", response.data);
      }
      setNewTodo("");
    } catch (error) {
      console.error("에러:", error);
    }
  };

  // const deleteTodo = (id) => {
  //   const token = localStorage.getItem("token");
  //   axios
  //     .delete(`http://localhost:3000/todos/${id}`, {
  //       headers: { Authorization: token },
  //     })
  //     .then(() => setTodos(todos.filter((todo) => todo.id !== id)))
  //     .catch((error) => console.error("Error deleting todo:", error));
  // };


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




  const deleteTodo = () => {
    const token = localStorage.getItem("token");
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtaWQiOjEsImlhdCI6MTcwMDExMDg4Mn0.tMskdD90yKKLEjJp94kRr-Bjg88Fol6Z-ZSMMotOZaA';
    if (checkedTodos.length === 0) {
      alert("선택된 항목이 없습니다.");
      return;
    }
    checkedTodos.forEach(async (checkedMemberNo) => {
      try {
        await axios.delete(`http://localhost:3000/todos/${checkedMemberNo}`, {
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

  const filteredTodos = searchTodo
    ? todos.filter((todos) =>
        todos.todo_content.toLowerCase().includes(searchTodo.toLowerCase())
      )
    : todos;

  return (
    <div>
      {/* TodoList */}
      <div className="page-todolist">
        <div className="page-title">
          Todo 리스트
          {/* <a href="javascript:" className="btn-calen">달력아이콘</a> */}
          <img
            src="calendar-icon.png"
            alt="Calendar Icon"
            className="btn-calen"
          />
        </div>
        <div className="page-contents">
          <div className="data-day">2023.11.09(목)</div>

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
              onChange={(e) => setSearchTodo(e.target.value)}
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
            {filteredTodos.length === 0 && newTodo.trim() === "" ? (
              <div className="data-nodata">
                Todo 리스트가 없습니다.
                <br />
                Todo 리스트를 추가해주세요.
              </div>
            ) : (
              <ul className="form-list">
                {filteredTodos.map((todo) => (
                  <li key={todo.id}>
                    
                    <input type="checkbox" 
                      checked={checkedTodos.includes(todo.todo_content)} 
                      onChange={() => handleCheckboxChange(todo.todo_content)}
                    />
                  {todo.todo_content}
                    {/* <div className="data-list">{todo.members_no}</div> */}
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