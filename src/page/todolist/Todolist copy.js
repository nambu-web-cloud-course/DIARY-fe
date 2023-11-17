import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoList = () => {
  
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [searchTodo, setSearchTodo] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // 페이지 로드시 초기화 작업 수행
  useEffect(() => {
    // 저장된 JWT 토큰 가져오기
    const token = localStorage.getItem('jwt_token');
    
    // 현재 날짜 가져오기 (YYYY-MM-DD 형식)
    const today = new Date().toISOString().split('T')[0];
    setCurrentDate(today);
    
    // 초기 선택된 날짜 설정
    setSelectedDate(today);

    // 서버에서 해당 날짜의 투두 리스트 불러오기
    if (token) {
      ChangeDateTodolist(today, token);
    }
  }, []);

  // 특정 날짜의 투두 리스트 가져오기
  const ChangeDateTodolist = (date, token) => {
    axios.get(`/api/todos/${date}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => {
      // 성공적으로 투두 리스트 데이터를 받아와 상태 업데이트
      setTodos(response.data);
    })
    .catch(error => {
      // 투두 리스트 불러오기 실패 시, 에러 처리
      console.error('투두 리스트 불러오기 오류:', error);
      
      setTodos([]);
    });
  };

  // 새로운 할일 추가 함수
  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem = {
        id: todos.length + 1,
        todo_content: newTodo,  
      };

      // 클라이언트 상태에 새로운 할일 추가
      setTodos([...todos, newTodoItem]);

      // 서버로 실제 데이터 전송 
      const token = localStorage.getItem('jwt_token');
      axios.post(
        '/todos',
        { todo_content: newTodo },  
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      )
      .then(response => {
        // 서버에 데이터 전송 성공 시 추가 작업 수행
        console.log('할일 추가 성공:', response.data);
        // 추가된 할일의 날짜를 기준으로 투두 리스트 다시 불러오기
        ChangeDateTodolist(selectedDate, token);
      })
      .catch(error => {
        // 서버에 데이터 전송 실패 시 에러 처리
        console.error('할일 추가 오류:', error);
      });

      // 입력 칸 비우기
      setNewTodo('');
    }
  };

  // 검색어 변경시 실행되는 함수
  const handleSearch = (e) => {
    setSearchTodo(e.target.value);
  };

  // 선택된 할일 삭제 함수
  const handleDelete = () => {
    const completedTodos = todos.filter(todo => todo.completed);
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));

    // 서버로 실제 데이터 전송
    const token = localStorage.getItem('jwt_token');
    completedTodos.forEach(completedTodo => {
      axios.delete(`/api/todos/${completedTodo.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => {
        // 서버에 데이터 전송 성공 시 삭제 작업 수행
        console.log('할일 삭제 성공:', response.data);
      })
      .catch(error => {
        // 서버에 데이터 전송 실패 시 에러 처리
        console.error('할일 삭제 오류:', error);
      });
    });
  };

  // 검색된 투두 리스트 필터링
  const filteredTodos = todos.filter(todo =>
    todo.todo_content.toLowerCase().includes(searchTodo.toLowerCase())
  );

  // 날짜 변경 핸들러
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);
    ChangeDateTodolist(selectedDate, localStorage.getItem('jwt_token'));
  };

 
  return (
    <div>
      {/* 투두 리스트 타이틀과 선택된 날짜, 달력 입력창 */}
      <h2>{currentDate}의 투두 리스트</h2>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
      />

      {/* 새로운 할일 입력창 */}
      <div>
        <input
          type="text"
          placeholder="새로운 할일 추가"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>추가</button>
      </div>

      {/* 검색어 입력창 */}
      <input
        type="text"
        placeholder="검색"
        value={searchTodo}
        onChange={handleSearch}
      />

      {/* 투두 리스트 출력 */}
      <ul>
        {filteredTodos.length > 0 ? (
          filteredTodos.map(todo => (
            <li key={todo.id}>
              {todo.todo_content} 
            </li>
          ))
        ) : (
          <p>리스트를 작성해주세요.</p>
        )}
      </ul>

      {/* 선택된 할일 삭제 버튼 */}
      <button onClick={handleDelete}>선택 삭제</button>
    </div>
  );
};

export default TodoList;