import React, { useState } from 'react';
import axios from 'axios';

export default function PasswordReset() {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setMessage('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
    } else {
      try {
        const response = await axios.post('/api/password-reset', {
          username,
          newPassword,
        });

        if (response.data.success) {
          setMessage('비밀번호 변경에 성공했습니다.');
          setTimeout(() => {
            setMessage('');
            alert('비밀번호가 변경되었습니다. 로그인 페이지로 이동합니다.');
            window.location.href = '/login'; // 로그인 페이지로 이동
          }, 1000);
        } else {
          setMessage('비밀번호 변경에 실패했습니다.');
        }
      } catch (error) {
        setMessage('비밀번호 변경 중 오류가 발생했습니다.');
      }
    }
  };



  const handleNewPasswordChange = (newPassword) => {
    setNewPassword(newPassword);
    if (newPassword === confirmNewPassword) {
      setMessage('비밀번호가 일치합니다.');
      setIsButtonDisabled(false);
    } else {
      setMessage('비밀번호가 일치하지 않습니다.');
      setIsButtonDisabled(true);
    }
  };

  const handleConfirmNewPasswordChange = (confirmNewPassword) => {
    setConfirmNewPassword(confirmNewPassword);
    if (newPassword === confirmNewPassword) {
      setMessage('비밀번호가 일치합니다.');
      setIsButtonDisabled(false);
    } else {
      setMessage('비밀번호가 일치하지 않습니다.');
      setIsButtonDisabled(true);
    }
  };

  return (
    <div>
      <h2>비밀번호 변경</h2>
      <input type="text" placeholder="아이디" value={username} 
        onChange={(e) => setUsername(e.target.value)} />
      <br />

      <input type="password" placeholder="새 비밀번호" value={newPassword} 
        onChange={(e) => handleNewPasswordChange(e.target.value)} />
      <br />

      <input type="password" placeholder="새 비밀번호 확인" value={confirmNewPassword} 
        onChange={(e) => handleConfirmNewPasswordChange(e.target.value)} />
      <br />
      
      <button onClick={handleChangePassword} disabled={isButtonDisabled}>
        비밀번호 변경
      </button>
      <p>{message}</p>
    </div>
  );
}
