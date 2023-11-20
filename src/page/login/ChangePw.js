
import React, { useState } from 'react';
import axios from 'axios';

export default function PasswordReset() {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');

  // 실시간으로 비밀번호 일치 여부 확인
  const handleNewPasswordChange = (newPassword) => {
    setNewPassword(newPassword);
    if (newPassword === confirmNewPassword) {
      setMessage('비밀번호가 일치합니다.');
    } else {
      setMessage('비밀번호가 일치하지 않습니다.');
    }
  };

  const handleConfirmNewPasswordChange = (confirmNewPassword) => {
    setConfirmNewPassword(confirmNewPassword);
    if (newPassword === confirmNewPassword) {
      setMessage('비밀번호가 일치합니다.');
    } else {
      setMessage('비밀번호가 일치하지 않습니다.');
    }
  };

  // 비밀번호 변경 처리 함수
  const handleChangePassword = async () => {
    try {
      const response = await axios.get(`https://diary-be.azurewebsites.net/members/${username}`);

      // 아이디가 존재하면 비밀번호 변경 로직 실행
      if (response.data.exists) {
        if (newPassword === confirmNewPassword) {
          const token = localStorage.getItem('access_token');
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const changePasswordResponse = await axios.post('https://diary-be.azurewebsites.net/members', {
            newPassword,
          }, config);

          if (changePasswordResponse.data.success) {
            // 비밀번호 변경에 성공한 경우 알림창 표시 및 로그인 페이지로 이동
            alert('비밀번호가 변경되었습니다. 로그인 페이지로 이동합니다.');
            window.location.href = '/login';
          } else {
            // 비밀번호 변경 실패한 경우 메시지 표시
            setMessage('비밀번호 변경에 실패했습니다.');
          }
        } else {
          // 새 비밀번호와 확인 비밀번호가 일치하지 않는 경우 메시지 표시
          setMessage('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
        }
      } else {
        // 아이디가 존재하지 않으면 메시지 표시
        alert('존재하지 않는 아이디입니다.');
        setUsername('');
        setNewPassword('');
        setConfirmNewPassword('');
      }
    } catch (error) {
      // 아이디 확인 중 오류 발생 시 메시지 표시
      alert('아이디 확인 중 오류가 발생했습니다.');
      setUsername('');
      setNewPassword('');
      setConfirmNewPassword('');
    }
  };

  return (
    <div>
      <br /><h2>비밀번호 변경</h2><br />
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="새 비밀번호"
        value={newPassword}
        onChange={(e) => handleNewPasswordChange(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="새 비밀번호 확인"
        value={confirmNewPassword}
        onChange={(e) => handleConfirmNewPasswordChange(e.target.value)}
      />
      <br />

      <button onClick={handleChangePassword}>
        비밀번호 변경
      </button>
      <p>{message}</p>
    </div>
  );
}
 