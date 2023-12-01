import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Todolist from "../todolist/Todolist";
import Diary from "../diary/Diary";
import CalendarPage from "../calendar/CalendarPage";
import Gallery from "../gallary/Gallery";
import Main from "../main/Main";
import Register from "../login/Register";
import Login from "../login/Login";
import ChangePw from "../login/ChangePw";
import DiaryDetail from "../diary/DiaryDetail";
import DiaryEdit from "../diary/DiaryEdit";
import DiaryView from "../diary/DiaryView";
import { useEffect } from "react";

function PrivateRoute({ element, path }) {
  // 로그인 상태 확인
  const isLoggedIn = localStorage.getItem("token") !== "";

  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인 후 이용 바랍니다.");
    }
  }, [isLoggedIn]);

  return isLoggedIn ? ( // 로그인 상태일때는 해당 element 렌더링
    element
  ) : (
    // 로그인 상태 아닐 때는 로그인 페이지로 이동
    <Navigate to="/login" replace />
  );
}

function RoutesPage() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route
        path="/todolist"
        element={<PrivateRoute element={<Todolist />} />}
      />
      <Route path="/diaryhome" element={<PrivateRoute element={<Diary />} />} />
      <Route
        path="/calendar"
        element={<PrivateRoute element={<CalendarPage />} />}
      />
      <Route path="/gallery" element={<PrivateRoute element={<Gallery />} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/changepw" element={<ChangePw />} />
      <Route
        path="/diarydetail"
        element={<PrivateRoute element={<DiaryDetail />} />}
      />
      <Route
        path="/diaryview"
        element={<PrivateRoute element={<DiaryView />} />}
      />
      <Route
        path="/diaryedit"
        element={<PrivateRoute element={<DiaryEdit />} />}
      />
    </Routes>
  );
}

export default RoutesPage;
