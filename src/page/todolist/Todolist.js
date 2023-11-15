
import {useState, useEffect} from "react"
import axios from "axios"
function Todolist() {
  
    const [toDo,setTodo] = useState("");
    const [toDos,setTodos] = useState([]);
    useEffect(()=> {
        getTodos();
      
      },[])
    const getTodos = () => {
        axios.get('http://localhost:8080/todos/')
        .then(res => {
            setTodos(res.data)
        }).catch(error => {
            console.log(error)
        })

    };
    const deleteTodos = (todo_no) => {
        axios
          .delete(`http://localhost:8080/todos/${todo_no}`)
          .then(() => {
            getTodos();
            console.log(`http://localhost:8080/todos/${todo_no}`)
          })
          .catch((error) => {
            console.error(error);
          });
      };

    const addTodo = (todo_no) => {
        axios
        .post("http://localhost:8080/todos", { toDo })
        .then(() => {
        getTodos();
          setTodo("");
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
         if(toDo === ""){
            return
        }
        setTodos((currentArray) => [toDo, ...currentArray])
        setTodo("")
    }  
    
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
                        <input type="text" placeholder="Todo 리스트를 추가해주세요 " className="form-input" onChange={(e)=>setTodo(e.target.value)} value={toDo}/>
                        <button class="form-button" onClick={addTodo}>추가</button>
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
                            {toDos.data && toDos.data.map((data)=>
                             <li  key={data.id}>
                                <input type="checkbox"></input>
                                <div className="data-list">
                                {data.todo_content} 
                                </div>
                                <button type="button" class="form-button type-s-dark" onClick={() => deleteTodos(data.id)}>삭제</button>
                              
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

