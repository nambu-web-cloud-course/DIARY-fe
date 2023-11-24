import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const Diary = () => {
    const token = localStorage.getItem("token");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredDiaries, setFilteredDiaries] = useState([]);

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://diary-be.azurewebsites.net/mydiaries/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const myDiaries = response.data.data;
      console.log(myDiaries);

      const filteredEntries = myDiaries.flatMap(entry => {
        return entry.Mydiaries.filter(diary => {
          // Convert diary updated_at to Date object
          const diaryDate = new Date(diary.updated_at);

          // Compare the dates and cate_data_no
          return diaryDate.toDateString() === selectedDate.toDateString() && diary.cate_data_no === 1;
        });
      });

      setFilteredDiaries(filteredEntries);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h2>Date Picker and Filtered Diaries</h2>
      <DatePicker selected={selectedDate} onChange={handleDateChange} />
      <h3>Selected Date: {selectedDate && selectedDate.toDateString()}</h3>
      <ul>
        {filteredDiaries.map(diary => (
          <li key={diary.updated_at}>
            <p>Diary Title: {diary.diary_title}</p>
            <p>Diary Content: {diary.diary_content}</p>
            {/* Add other properties as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Diary;

