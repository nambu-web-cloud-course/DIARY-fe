import React, { useState, useCallback } from "react";
import instance from "../../api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);

  // 아이디 유효성검사 후 중복확인
  const idValidation = useCallback(async () => {
    const regExp = /^[a-zA-Z0-9]{3,10}$/;
    if (!regExp.test(username)) {
      setMessage("아이디는 3~10자 영어 대소문자, 숫자만 사용가능합니다.");
      setUsername("");
    } else {
      setMessage("");
      try {
        if (username === "") {
          setIsUsernameAvailable(false);
          setMessage("아이디를 입력하세요.");
        } else {
          console.log("before get: 입력한 아이디: ", username);

          const response = await instance.get(
            `/members/sign-up?id=${username}`
          );
          console.log("after get: ", response.data);

          if (response.data.success) {
            setIsUsernameAvailable(true);
            setMessage("사용 가능한 아이디입니다.");
          } else {
            setIsUsernameAvailable(false);
            setMessage(
              "이미 사용 중인 아이디입니다. 다른 아이디를 입력해보세요."
            );
            setUsername("");
          }
        }
      } catch (error) {
        console.error("아이디 중복 확인 오류:", error);
      }
    }
  }, [username]);

  // 비밀번호 일치여부 확인
  const handlePasswordChange = useCallback(
    (newPassword) => {
      setPassword(newPassword);
      validatePasswords(newPassword, confirmPassword);
    },
    [confirmPassword]
  );

  const handleConfirmPasswordChange = useCallback(
    (newConfirmPassword) => {
      setConfirmPassword(newConfirmPassword);
      validatePasswords(password, newConfirmPassword);
    },
    [password]
  );

  const validatePasswords = useCallback((newPassword, newConfirmPassword) => {
    if (newPassword === newConfirmPassword) {
      setMessage("비밀번호가 일치합니다.");
    } else {
      setMessage("비밀번호가 일치하지 않습니다.");
    }
  }, []);

  // 회원가입버튼 클릭
  const handleRegister = useCallback(async () => {
    try {
      //input값 미입력
      if (!username || !password || !confirmPassword) {
        alert("입력되지 않은 정보가 있습니다.");
        return;
      }

      // 아이디 중복 확인 여부 검사
      await idValidation();

      if (!isUsernameAvailable) {
        alert("아이디 중복 확인이 필요합니다.");
        return;
      }

      // 비밀번호 일치 여부 검사
      if (password !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      const response = await instance.post("/members/sign-up", {
        member_id: username,
        password: password,
        member_name: username,
      });

      if (response.data.success) {
        alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");

        setUsername("");
        setPassword("");
        setConfirmPassword("");

        localStorage.setItem("token", response.data.token);
        window.location.href = "/login";
      } else {
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
    }
  }, [username, password, confirmPassword, isUsernameAvailable]);

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
            <button onClick={idValidation} className="form-button type-s-dark">
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

        <button onClick={handleRegister} className="form-button">
          회원가입
        </button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Register;
