
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
                <div className="ui-top">
                    <CalendarForm></CalendarForm>
                    <a href="javascript:" className="form-button">불러오기</a>

                    <select className="component-select">
                        <option>최신순</option>
                        <option>오래된순</option>
                    </select>
                </div>

            </div>
         
      </>
    )
}

export default Gallary;
