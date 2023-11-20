import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [isRegisterButtonDisabled, setIsRegisterButtonDisabled] = useState(true);

  //아이디 중복확인
  const checkUsernameAvailability = async () => {
    if (username === '') {
      setIsUsernameAvailable(false);
      setMessage('아이디를 입력하세요.');
      setIsRegisterButtonDisabled(true);
    } else {
      try {
        const response = await axios.post('https://diary-be.azurewebsites.net/members/sign-up', {
          member_id: username,
        });

        if (response.data.available) {
          setIsUsernameAvailable(true);
          setMessage('사용 가능한 아이디입니다.');
          if (password !== '' && confirmPassword !== '') {
            setIsRegisterButtonDisabled(false);
          }
        } else {
          setIsUsernameAvailable(false);
          setMessage('이미 사용 중인 아이디입니다. 다른 아이디를 입력해보세요.');
          setUsername('');
          setIsRegisterButtonDisabled(true);
        }
      } catch (error) {
        console.error('아이디 중복 확인 오류:', error);
        
      }
    }
  };


  //비밀번호 일치여부 확인
  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword);
    if (newPassword === confirmPassword) {
      setMessage('비밀번호가 일치합니다.');
      if (username !== '' && confirmPassword !== '' && newPassword !== '') {
        setIsRegisterButtonDisabled(false);
      }
    } else {
      setMessage('비밀번호가 일치하지 않습니다.');
      setIsRegisterButtonDisabled(true);
    }
  };

  const handleConfirmPasswordChange = (newConfirmPassword) => {
    setConfirmPassword(newConfirmPassword);
    if (newConfirmPassword === password) {
      setMessage('비밀번호가 일치합니다.');
      if (username !== '' && password !== '' && newConfirmPassword !== '') {
        setIsRegisterButtonDisabled(false);
      }
    } else {
      setMessage('비밀번호가 일치하지 않습니다.');
      setIsRegisterButtonDisabled(true);
    }
  };

  //회원가입
  const handleRegister = async () => {
    try {
      const response = await axios.post('https://diary-be.azurewebsites.net/members/sign-up', {
        member_id: username,
        password: password,
      });

      if (response.data.success) {
        setMessage('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        
        localStorage.setItem('access_token', response.data.token);
        window.location.href = '/login';
      } else {
        setMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
      
    }
  };

  return (
    <div className="page-login">
      <div className="form-login">
        <div className="ui-logo">
          <a className="txt-logo" href="/">
            D.I.A.R.Y
          </a>
        </div>

        <h2 className="txt-label">회원가입</h2>
        <div className="form-div">
          <div className="form-label">아이디 </div>
          <div className="form-multi">
            <input
              type="text"
              placeholder="아이디"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
            />
            <button onClick={checkUsernameAvailability} className="form-button type-s-dark">
              중복확인
            </button>
          </div>
        </div>
        <div className="form-div">
          <div className="form-label">비밀번호 입력 </div>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-div">
          <div className="form-label">비밀번호 입력 확인 :</div>
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            className="form-input"
          />
        </div>

        <button onClick={handleRegister} disabled={isRegisterButtonDisabled} className="form-button">
          회원가입
        </button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
