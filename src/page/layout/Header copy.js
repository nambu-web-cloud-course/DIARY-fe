//import React, { useState, useEffect } from "react";
import { BrowserRouter} from "react-router-dom";
//import Calendar from 'react-calendar';
import { Link, NavLink} from "react-router-dom";
import RoutesPage from "../routes/RoutesPage"
import { useState } from "react";
import { useEffect } from "react";

function Header() {

  // const [login, setLogin] = useState({
  //   isLogin:false,
  //   member_id:"",
  //   member_name:""
  // }) 


  var isLogin = false;
  var member_id = "";
  var member_name = "";

    if(localStorage.getItem("refresh_token") != "") {
      isLogin = true;
      member_id = localStorage.getItem("member_id");
      member_name = localStorage.getItem("member_name");
    }

  // const handleLogout = async(e) => {

  //   e.preventDefault();
  //   isLogin = false;
  //   member_id = "";
  //   member_name = "";

  //   localStorage.setItem("refresh_token", null);
  //   localStorage.setItem("member_id", null );
  //   localStorage.setItem("member_name", null);
  // };

  // const handleCheckLogin = () => {
  //   alert("handleCheckLogin!!");
  //   if(localStorage.getItem("refresh_token") != "") {
  //     login.isLogin = true;
  //     login.member_id = localStorage.getItem("member_id");
  //     login.member_name = localStorage.getItem("member_name");
  //     setLogin(login);
  //   }
  // };


  const handleLogout = () => {

    alert("Logout Button Cliecked!!");
    localStorage.setItem("refresh_token", "");
    localStorage.setItem("member_id", "" );
    localStorage.setItem("member_name", "");

    isLogin = false;
    member_id = "";
    member_name = "";

    // login.isLogin = false;
    // login.member_id = "";
    // login.member_name = "";
    // setLogin(login);
  };

  // useEffect(() => {
  //   handleCheckLogin();
  // }, []);
  
  return (
    <>
    <BrowserRouter>

        <div className="layout-header">
            {/* Header Top */}
            <div className="header-top">
                <Link to="/" className="txt-logo">D.I.A.R.Y</Link>

                <div className="ui-right">

                {
                  isLogin === true
                  ? <div className="data-id">{member_id}</div> 
                  : <div className="data-id">User id</div> 
                }

                {
                  isLogin === true
                  ? <button onClick={handleLogout} className="link-login">로그아웃</button>
                  : <Link to="/login" className="link-login">로그인</Link>
                }
                
                
                </div>
            </div>
            <div className="header-menu" >
                <NavLink to="/todolist" className={({ isActive }) => (isActive ?  " is-selected " : "")}>Todo 리스트</NavLink>
                <NavLink to="/diary" className={({ isActive }) => "" + (isActive ? " is-selected " : "")}>다이어리</NavLink>
                <NavLink to="/calendar" className={({ isActive }) => "" + (isActive ? " is-selected " : "")}>캘린더</NavLink>
                <NavLink to="/gallery" className={({ isActive }) => "" + (isActive ? " is-selected " : "")}>갤러리</NavLink>
            </div>
        </div>
        
        <RoutesPage></RoutesPage>
    </BrowserRouter>
    </>

  );
}
export default Header;