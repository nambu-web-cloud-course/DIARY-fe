import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import instance from "../../api";
import { Link } from "react-router-dom";

const Todolist = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [todos, setTodos] = useState([]);

  const [newTodo, setNewTodo] = useState("");
  const [searchTodo, setSearchTodo] = useState("");
  // const [error, setError] = useState("");
  const contentRef = useRef();
  const [checkedTodos, setCheckedTodos] = useState([]);
  // const [isInitialRender, setIsInitialRender] = useState(true);
  // const [currentDate, setCurrentDate] = useState("");
  // const [allTodos, setAllTodos] = useState([]); // 추가: 전체 데이터를 따로 저장

  const getTodos = () => {
    try {
      const searchDate = new Date(selectedDate);
      const startDate = new Date(
        searchDate.getFullYear(),
        searchDate.getMonth(),
        searchDate.getDate(),
        0,
        0,
        0
      );
      const endDate = new Date(
        searchDate.getFullYear(),
        searchDate.getMonth(),
        searchDate.getDate(),
        23,
        59,
        59
      );
      // alert(startDate + ""+endDate);
      instance
        .get("/todos", {
          validateStatus: false,
          params: { StartDate: startDate, EndDate: endDate },
        })
        .then((response) => {
          console.log("GET todos :", response.data.data);

          if (response.data.data && response.data.data.length > 0) {
            // console.log('GET todos length :', response.data.length)
            const todosWithLocalDate = response.data.data.map((todo) => ({
              ...todo,
              todo_date: new Date(todo.todo_date).toLocaleDateString("ko-KR", {
                timeZone: "Asia/Seoul",
              }),
            }));
            setTodos(todosWithLocalDate);

            // console.log('data', myDiariesData[0].Mydiaries[0]);
          } else {
            // alert('가져올 todos 없습니다.');
            setTodos([]);
            return;
          }
        })
        .catch((error) => {
          console.error("GET todos error ", error);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // 날짜 변경 시 todo 가져오기
  useEffect(() => {
    getTodos();
  }, [selectedDate]);

  const addTodo = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        setNewTodo(contentRef.current.value);

        if (!newTodo.trim()) {
          alert("할일을 작성해주세요.");
          return;
        }

        const response = await instance.post("/todos", {
          todo_content: newTodo,
          todo_date: selectedDate,
        });

        if (response.data && response.data.success) {
          console.log("서버 응답 야호!:", response.data.data);
          getTodos();
        } else {
          console.error("왜 등록이 안될까 에러: ", response.data);

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
    },
    [newTodo]
  );

  const handleDateChange = (action) => {
    const newDate = new Date(selectedDate);

    if (action === "prev") {
      newDate.setDate(newDate.getDate() - 1);
    } else if (action === "next") {
      newDate.setDate(newDate.getDate() + 1);
    }

    setSelectedDate(newDate.toISOString().split("T")[0]);
  };

  const handleCheckboxChange = useCallback((todo) => {
    setCheckedTodos((prevChecked) => {
      if (prevChecked.includes(todo.id)) {
        return prevChecked.filter((id) => id !== todo.id);
      } else {
        return [...prevChecked, todo.id];
      }
    });
  }, []);

  const deleteTodo = useCallback(async () => {
    if (checkedTodos.length === 0) {
      alert("선택된 항목이 없습니다.");
      return;
    }

    if (checkedTodos.length > 1) {
      alert("한 번에 하나의 항목만 삭제할 수 있습니다.");
      // 체크 해제
      setCheckedTodos([]);
      return;
    }

    try {
      const todoIdToDelete = checkedTodos[0];
      await instance.delete(`/todos/${todoIdToDelete}`);

      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== todoIdToDelete)
      );

      // 체크 해제
      setCheckedTodos([]);

      // Show a notification for successful deletion
      alert("투두리스트가 삭제되었습니다.");
    } catch (error) {
      console.error("투두 삭제 오류:", error);
    }
  }, [checkedTodos]);

  const handleSearch = useCallback((e) => {
    console.log("Search", e.target.value);
    setSearchTodo(e.target.value);
  });

  const filteredTodos = useMemo(() => {
    return searchTodo === ""
      ? todos
      : todos.filter((todo) =>
          todo.todo_content.toLowerCase().includes(searchTodo.toLowerCase())
        );
  });

  const formatDateWithDay = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      timeZone: "Asia/Seoul",
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "ko-KR",
      options
    );
    return formattedDate;
  };
  // 날짜 포맷 함수
  const formatDate = (dateString) => {
    // 월, 일을 2자리 숫자로 표시하는 함수
    const formatNumber = (num) => (num < 10 ? `0${num}` : num);

    // 요일 배열
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

    // 년, 월, 일, 요일을 추출합니다.
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = formatNumber(date.getMonth() + 1);
    const day = formatNumber(date.getDate());
    const dayOfWeek = daysOfWeek[date.getDay()];

    // 최종적인 형식으로 조합하여 반환합니다.
    return `${year}.${month}.${day}(${dayOfWeek})`;
  };

  return (
    <div>
      <div className="page-todolist">
        <div className="ui-today">
          <div className="txt-today">
            오늘은 <span className="data-today">{formatDate(new Date())} </span>{" "}
            입니다.
          </div>
        </div>
        <div className="data-day">
          <button
            onClick={() => handleDateChange("prev")}
            className="btn-prev"
          >
            이전
          </button>
          <span>{formatDateWithDay(selectedDate)}</span>
          <button
            onClick={() => handleDateChange("next")}
            className="btn-next"
          >
            다음
          </button>
        </div>

        <div className="ui-todo">
          <div className="todo-label">새로운 Todo 작성하기</div>
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
        </div>
        <div className="page-title">
          Todo 리스트
          {/* <DatePicker selected={selectedDate} onChange={handleDateChange} value={selectedDate} /> */}
          <Link className="btn-calen" to="/calendar"></Link>
          {/* <img
            src="calendar-icon.png"
            alt="Calendar Icon"
            className="btn-calen"
          /> */}
        </div>
        <div className="page-contents">
          
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
                {filteredTodos &&
                  filteredTodos.map((todo) => (
                    <li key={todo.id}>
                      <input
                        type="checkbox"
                        checked={checkedTodos.includes(todo.id)}
                        onChange={() => handleCheckboxChange(todo)}
                      />

                      <div className="data-list"> {todo.todo_content}</div>
                      <button
                        className="form-button type-s-dark"
                        onClick={() => deleteTodo(todo.id)}
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
