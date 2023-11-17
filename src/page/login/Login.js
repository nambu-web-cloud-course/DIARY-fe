//로그인페이지

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [member_id, setMemberId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async(e) => {

    e.preventDefault();

    if(member_id === "" && password === "") {
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
    } else if (member_id === "") {
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
        member_id: member_id,
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
        axios.get('https://diary-be.azurewebsites.net/members', config)
          .then(function (response) {
            console.log("refresh_token 값 : " + response.data.token);
            alert(member_id + "님 환영합니다. 홈으로 이동합니다");
            //window.location.href = "/";//로그인 후 홈으로 이동
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
    <form>
      <div>
        <Link to="/"><h1>로고</h1></Link>
        <br/><br/>
        <h2>로그인</h2>

        <input
          type="text"
          placeholder="아이디"
          value={member_id}
          onChange={(e) => setMemberId(e.target.value)}
        />
        <br />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <button onClick={handleLogin}>로그인</button>

        <p>
          <Link to="/register">회원가입 | </Link> {' '}
          <button onClick={openChangePwWindow}>비밀번호 변경</button>
        </p><br/>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </form>
  );
}
