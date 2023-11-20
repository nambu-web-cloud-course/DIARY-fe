//로그인페이지

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [memberId, setMemberId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async(e) => {

    e.preventDefault();

    if(memberId === "" && password === "") {
      setErrorMessage("아이디와 비밀번호가 모두 입력되지 않았습니다.");
      //alert("아이디와 비밀번호가 모두 입력되지 않았습니다.");
      setTimeout(() => {
      // 입력 상자의 값 초기화
        setErrorMessage('');
        setMemberId('');
        setPassword('');
      }, 1500); // 1.5초 후 메시지 사라짐
    } else if (password === "") {
        setErrorMessage("비밀번호가 입력되지 않았습니다.")
        //alert("비밀번호가 입력되지 않았습니다.")
        setTimeout(() => {
        // 입력 상자의 값 초기화
          setErrorMessage('');
          setMemberId('');
          setPassword('');
      }, 1500); // 1.5초 후 메시지 사라짐
    } else if (memberId === "") {
        setErrorMessage("아이디가 입력되지 않았습니다.")
        //alert("아이디가 입력되지 않았습니다.")
        setTimeout(() => {
        // 입력 상자의 값 초기화
          setErrorMessage('');
          setMemberId('');
          setPassword('');
        }, 1500); // 1.5초 후 메시지 사라짐
    } else {
      axios.post('https://diary-be.azurewebsites.net/members/sign-in', {
        member_id: memberId,
        password: password,
      })
      .then(function(obj) {
        localStorage.setItem("refresh_token", obj.data.token);
        const config = {
          headers: {
            // 로컬스토리지에 토큰 저장되어 있는지 확인
            Authorization: `${localStorage.getItem("refresh_token")}`,
          },
        };
        axios.get('https://diary-be.azurewebsites.net/members/', config)
          .then(function (response) {
            console.log("refresh_token 값 : " + response.data.token);
            alert(memberId + "님 환영합니다. 홈으로 이동합니다");
            //window.location.replace = "/";//로그인 후 홈으로 이동
            navigate('/');
          })
          .catch(function (error) {
            console.log("로그인에 실패하였습니다. " + error);
            alert('로그인에 실패하였습니다. 다시 로그인해주세요')
            setMemberId('');
            setPassword('');
          });
        })
      .catch((error) => {
        console.log(error)
        setErrorMessage("아이디 또는 비밀번호가 일치하지 않습니다.")
        //alert("아이디 또는 비밀번호가 일치하지 않습니다.")
      })
    }
  };
    


  // // 로그아웃 시 JWT 토큰 삭제
  // const handleLogout = () => {
  // // 로컬 스토리지에서 JWT 토큰 삭제
  //   localStorage.removeItem('token');

  //   setLoggedIn(false);
  //   window.alert('로그아웃하였습니다.');
  //   navigate('/members/sign-in');
  // }

  const openChangePwWindow = () => {
    window.open('http://localhost:3000/changepw', '_blank', 'width=400, height=400');
  };

  return (
      <div className="page-login">
        <form>
          <div className="">
            <div class="form-login">
              <div class="ui-logo">
                <a class="txt-logo" href="/">D.I.A.R.Y</a>
              </div>
              <h2 class="txt-label">로그인</h2>
              <div class="form-div">
                <div class="form-label">아이디</div>
                <input
                  type="text"
                  placeholder="아이디"
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                className="form-input"/>
              </div>
              <div class="form-div">
                <div class="form-label">비밀번호</div>
    

                <input
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"/>
              </div>

              <button onClick={handleLogin} className="form-button">로그인</button>

    
              <Link to="/register" className="form-button">회원가입</Link> {' '}
              <button onClick={openChangePwWindow}>비밀번호 변경</button>
       
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          </div>
      </form>
      </div>
  );
}
