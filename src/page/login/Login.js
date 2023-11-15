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
    <div className="page-login">
      <div className="form-login">
        <div className="ui-logo">
          <a class="txt-logo" href="/">D.I.A.R.Y</a>
        </div>
        <h2 className="txt-label">로그인</h2>
        <div className="form-div">
          <input type="text" placeholder="아이디" value={username} 
            onChange={(e) => setUsername(e.target.value)} className="form-input"/>

          <input type="password" placeholder="비밀번호" value={password} 
            onChange={(e) => setPassword(e.target.value)} className="form-input"/>

  {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
        <button onClick={handleLogin} className="form-button">로그인</button>
     
        <Link to="/register" className="form-button">회원가입</Link>

        <p>
           
          {/* <a href="http://localhost:3000/changepw" target="_blank" rel="noreferrer"
            onClick={() => window.open("http://localhost:3000/changepw", 
            "_blank", "width=400, height=400")}> 
          비밀번호 변경
          </a> */}
        </p>
      </div>
    </div>
  );
}