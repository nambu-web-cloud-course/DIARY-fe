import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Todolist from "../todolist/Todolist";
import Diary from "../diary/Diary";
import CalendarPage from "../calendar/CalendarPage";
import Gallary from "../gallary/Gallary";
import Main from "../main/Main";
import Register from "../login/Register";
import Login from "../login/Login";
import ChangePw from "../login/ChangePw";
import DiaryDetail from "../diary/DiaryDetail";
import DiaryEdit from "../diary/DiaryEdit";
import DiaryEdit2 from "../diary/DiaryEdit2";

function Header() {

  return (
    <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/todolist" element={<Todolist/>}></Route>
        <Route path="/diary" element={<Diary/>}></Route>
        <Route path="/calendar" element={<CalendarPage/>}></Route>
        <Route path="/gallary" element={<Gallary/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/changepw" element={<ChangePw/>}></Route>
        <Route path="/diarydetail" element={<DiaryDetail/>}></Route>
        <Route path="/mydiaries" element={<DiaryEdit/>}></Route>
        <Route path="/mydiaries2" element={<DiaryEdit2/>}></Route>
    </Routes>

  );
}
export default Header;