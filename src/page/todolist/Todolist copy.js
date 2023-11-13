
import React, { useState } from "react";
function Todolist() {
    const [toDo,setTodo] = useState("");
    const [toDos,setTodos] = useState([]);
    const onChange = (e) => {
        setTodo(e.target.value)
        console.log(toDo)
    }
    const onSubmit = (e) => {
        e.preventDefault();
         if(toDo === ""){
            return
        }
        setTodos((currentArray) => [toDo, ...currentArray])
        setTodo("")
    }  
    console.log(setTodos)
    return (
        <div >

            {/* TodoList */}
            <div className="page-todolist">
                <div class="page-title">
                    Todo 리스트
                    <a href="javascript:" className="btn-calen">달력아이콘</a>
                </div>
                <div className="page-contents">
                    <div className="data-day">2023.11.09(목)</div>

                    {/* Form */}
                  
                    <form className="form-type" onSubmit={onSubmit}>
                        <input type="text" placeholder="Todo 리스트를 추가해주세요 " className="form-input" onChange={onChange} value={toDo}/>
                        <button class="form-button">추가</button>
                    </form> 
                    
                    {/* Form */}
                    <div className="form-type">
                        <input type="text" placeholder="Todo 리스트를 검색해주세요. " className="form-input"/>
                        <a haref="javascript:" class="form-button">검색</a>
                    </div>
                    {/* List */}
                    <div className="wrap-list">
                        {/* Data 가 없을 경우 */}
                        <div className="data-nodata">
                            Todo 리스트가 없습니다.<br/>
                            Todo 리스트를 추가해주세요.

                        </div>
                        <ul className="form-list">
                            {toDos.map((item)=>
                             <li>
                                <input type="checkbox"></input>
                                <div className="data-list">
                                {item}
                                </div>
                                <a haref="javascript:" class="form-button type-s-dark">삭제</a>
                            </li>
                            )}
                        </ul> 
                       
                    </div>

                </div>
            </div>
         
      </div>
    )
}

export default Todolist;

