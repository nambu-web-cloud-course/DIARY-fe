
import React, { useState } from "react";
import CalendarForm from "../calendar/CalendarForm";
import { Select } from '@mantine/core';
function Gallary() {
    return (
        <>
            {/* calendar */}
            <div className="page-gallary">
                <div class="page-title">
                    갤러리
                </div>
                <div className="">
                    <CalendarForm></CalendarForm>
                    <a href="javascript:" className="form-button">불러오기</a>
                    <Select
                        label="Your favorite library"
                        placeholder="Pick value"
                        data={['React', 'Angular', 'Vue', 'Svelte']}
                    />
                </div>

            </div>
         
      </>
    )
}

export default Gallary;
