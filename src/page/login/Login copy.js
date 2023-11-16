//로그인페이지

// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [member_name, setMembername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios.post('http://localhost:3000/login', { member_name, password })
      .then(response => {
        const token = response.data.token;
        localStorage.setItem('token', token); // Save the token to local storage
        onLogin();
      })
      .catch(error => {
        console.error('Login failed:', error.response.data.message);
        // Handle login failure (show error message, etc.)
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Membername"
        value={member_name}
        onChange={(e) => setMembername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
};

export default Login;
