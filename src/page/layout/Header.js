import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Calendar from 'react-calendar';
import { Link } from "react-router-dom";
import RoutesPage from "../routes/RoutesPage"



function Header() {

  return (
     <div className="layout-header">
        <BrowserRouter>
            {/* Header Top */}
            <div className="header-top">
                <Link to="/" className="txt-logo">D.I.A.R.Y</Link>
            
                <div className="ui-right">
                <div className="data-id">User id</div>
                <Link to="/login" className="link-login">로그인</Link>
                
                </div>
            </div>
            <div className="header-menu">
                <Link to="/todolist">Todo 리스트</Link>
                <Link to="/diary">다이어리</Link>
                <Link to="/calendar">캘린더</Link>
                <Link to="/gallary">갤러리</Link>
            </div>
            <RoutesPage></RoutesPage>
        </BrowserRouter>
   </div>

  );
}
export default Header;