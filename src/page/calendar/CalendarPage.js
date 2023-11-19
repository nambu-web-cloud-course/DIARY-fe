
import React, { useState, ReactDOM } from "react";
import CalendarForm from "./CalendarForm";

function CalendarPage() {
    const moment = require('moment');
    const today = moment();
    const daySelect = today.format('DD')
    console.log(daySelect);
   

    return (
        <>
            {/* calendar */}
            <div className="page-calendar">
                <div class="page-title">
                    캘린더
                </div>
                <CalendarForm></CalendarForm>

                <div className="ui-list">
              
                    <div className="txt-label">Todo 리스트</div>
                    <ul className="list-form">
                        <li>
                            <a href="javascript:">
                                <div className="data-list">Todo 리스트 목록Todo 리스트 목록Todo 리스트 목록Todo 리스트 목록Todo 리스트 목록Todo 리스트 목록Todo 리스트 목록Todo 리스트 목록Todo 리스트 목록Todo 리스트 목록Todo 리스트 목록Todo 리스트 목록Todo 리스트 목록Todo 리스트 목록
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:">
                                <div className="data-list">Todo 리스트 목록
                                </div>
                            </a>
                        </li>
                    </ul>
                    <div className="txt-label">다이어리 리스트</div>
                    <ul className="list-form">
                        <li>
                            <a href="javascript:">
                                <div className="data-list">다이어리 리스트 목록
                            </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
         
      </>
    )
}

export default CalendarPage;