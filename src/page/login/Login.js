//로그인페이지

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import { useCookies } from 'react-cookie';

export default function Login({ setLoggedIn }) {
  const [member_name, setMembername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  //const [cookies, setCookie, removeCookie] = useCookies(['jwtToken']);


  


  const handleLogin = async () => {
    try {
      if (!member_name || !password) {
        setErrorMessage('아이디와 비밀번호를 모두 입력하세요.');
        setTimeout(() => {
          // 입력 상자의 값 초기화
          setErrorMessage('');
          setMembername('');
          setPassword('');
        }, 1000);// 1초 후 메시지 사라짐
        return;
      }

      // 서버에 로그인 요청 보내기.
      const response = await axios.post('/sign-up', {
        member_name,
        password,
      });

      // 서버에서 받은 토큰을 로컬 스토리지에 저장
      localStorage.setItem('accessToken', response.data.accessToken);

      if (response.data.token) {
        // JWT 토큰을 쿠키에 저장 (1일 만료)
        //setCookie('jwtToken', response.data.token, { path: '/', maxAge: 86400 });

        setLoggedIn(true);
        window.alert('로그인되었습니다. 홈으로 이동합니다');

        setTimeout(() => {
          navigate('/home');
        }, 500);// 홈으로 0.5초 후 이동
      } else {
        setErrorMessage('아이디 또는 비밀번호가 일치하지 않습니다.');
        setMembername('');
        setPassword('');
      }
    } catch (error) {
      // 로그인 실패 시 에러 처리를 수행
      console.error('로그인 실패:', error);
      window.alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };


  // // 로그아웃 시 JWT 토큰 삭제
  // const handleLogout = () => {
  // // 로컬 스토리지에서 JWT 토큰 삭제
  //   localStorage.removeItem('token');

  //   setLoggedIn(false);
  //   window.alert('로그아웃하였습니다.');
  //   navigate('http://localhost:3000/login');
  // }

  const openChangePwWindow = () => {
    window.open('http://localhost:3000/changepw', '_blank', 'width=400, height=400');
  };

  return (
    <div>
      <Link to="/home"><h1>로고</h1></Link>
      <br/><br/>
      <h2>로그인</h2>

      <input
        type="text"
        placeholder="아이디"
        value={member_name}
        onChange={(e) => setMembername(e.target.value)}
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
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <p>
        <Link to="/register">회원가입 | </Link> {' '}
        <button onClick={openChangePwWindow}>비밀번호 변경</button>
      </p>
    </div>
  );
}
