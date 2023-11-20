
import { useState, useEffect } from 'react';
import { useQuery } from "react-query";
import axios from 'axios';
import moment from "moment"
import month from 'month';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarForm() {


  const [toDos,setTodos] = useState([]);
  useEffect(()=> {
      getTodos();
    },[])
    // 서버로 실제 데이터 전송 
    // const token = localStorage.getItem('jwt_token');
  const getTodos = () => {
      axios.get(
        'https://diary-be.azurewebsites.net/todos',
        {
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtaWQiOjEsImlhdCI6MTcwMDM3MDUzMX0.2NNWyqziEVRSjh3Ob-hYDvDHHHMZvMGJybOA7bg6SZw`,
          },
        })
      .then(res => {
        setTodos(res.data)

      }).catch(error => {
          console.log(error)
      })
  }; 

  console.log('toDos',toDos);

  const aa = toDos.data && toDos.data.map((data)=>{
    const tempdate = moment(data).format('DD-MM-YYYY')
    return tempdate
  }); 
  return (
 
    <div>
        <Calendar
 
          tileClassName={({ date, view }) => {
            
            if(aa?.find(x=>x===moment(date).format("DD-MM-YYYY"))){
              return  'highlight'
              }
          
          }}
          tileDisabled={({ date }) => date.getDay() === 0}

          minDate={
            new Date()
          }
        />

    </div>
   
  );
}
export default CalendarForm;