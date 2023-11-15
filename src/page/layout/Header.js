import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Calendar from 'react-calendar';
import { Link, NavLink} from "react-router-dom";
import RoutesPage from "../routes/RoutesPage"

function Header() {

  return (
    <>
    <BrowserRouter>
        <div className="layout-header">
            {/* Header Top */}
            <div className="header-top">
                <Link to="/" className="txt-logo">D.I.A.R.Y</Link>
            
                <div className="ui-right">
                <div className="data-id">User id</div>
                <Link to="/login" className="link-login">로그인</Link>
                
                </div>
            </div>
            <div className="header-menu" >
                <NavLink to="/todolist" className={({ isActive }) => (isActive ?  " is-selected " : "")}>Todo 리스트</NavLink>
                <NavLink to="/diary" className={({ isActive }) => "" + (isActive ? " is-selected " : "")}>다이어리</NavLink>
                <NavLink to="/calendar" className={({ isActive }) => "" + (isActive ? " is-selected " : "")}>캘린더</NavLink>
                <NavLink to="/gallary" className={({ isActive }) => "" + (isActive ? " is-selected " : "")}>갤러리</NavLink>
            </div>
        </div>
        
        <RoutesPage></RoutesPage>
    </BrowserRouter>
    </>

  );
}
export default Header;