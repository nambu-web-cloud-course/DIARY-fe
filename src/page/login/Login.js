//로그인 페이지
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = () => {
    // 입력 상자의 값 초기화
    setUsername('');
    setPassword('');

    if (!username || !password) {
      setErrorMessage('아이디와 비밀번호를 모두 입력하세요.');
      setTimeout(() => {  // 1초 후 메시지 사라짐
        setErrorMessage(''); 
      }, 1000); 
      
    //test를 위해 임시로 id/ pw 설정함
    } else if (username === 'user1' && password === '1234') {
      // 아이디와 비밀번호가 일치하면 로그인 성공
      setIsLoggedIn(true);
      window.alert('로그인하였습니다. 홈으로 이동합니다');

      setTimeout(() => {
        navigate('/home'); 
      }, 500); // 홈으로 0.5초 후 이동
    } else {
    window.alert('아이디 또는 비밀번호가 일치하지 않습니다. 다시 시도하세요.');
    
      setTimeout(() => {
        setErrorMessage(''); 
      }, 1000); // 1초 후 메시지를 사라짐
      
    }
  };


  return (
    <div>
      <Link to="/home"><h1>로고</h1></Link>
      <br/><br/>
      <h2>로그인</h2>

      <input type="text" placeholder="아이디" value={username} 
        onChange={(e) => setUsername(e.target.value)}/>
        <br/>

      <input type="password" placeholder="비밀번호" value={password} 
        onChange={(e) => setPassword(e.target.value)}/>
        <br/>

      <button onClick={handleLogin}>로그인</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      
      <p>
        <Link to="/register">회원가입</Link> | 
        <a href="http://localhost:3000/changepw" target="_blank" rel="noreferrer"
          onClick={() => window.open("http://localhost:3000/changepw", 
          "_blank", "width=400, height=400")}> 
        비밀번호 변경
        </a>
      </p>
    </div>
  );
}