import React, { useState } from "react";
import DatePicker from "react-datepicker";


function CalendarForm() {
    const [value, setValue] = useState(new Date());
 
  return (
    <div>
         <DatePicker
            selected={value}
            onChange={(date) => setValue(date)}
            inline
          />
    </div>
  );
}
export default CalendarForm;