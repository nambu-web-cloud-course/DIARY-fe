import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Todolist from "../todolist/Todolist";
import Diary from "../diary/Diary";
import CalendarPage from "../calendar/CalendarPage";
import Gallary from "../gallary/Gallary";
import Main from "../main/Main";

function Header() {

  return (
    <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/todolist" element={<Todolist/>}></Route>
        <Route path="/diary" element={<Diary/>}></Route>
        <Route path="/calendar" element={<CalendarPage/>}></Route>
        <Route path="/gallary" element={<Gallary/>}></Route>
    </Routes>

  );
}
export default Header;