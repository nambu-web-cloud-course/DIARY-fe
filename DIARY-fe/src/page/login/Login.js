import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import instance from "../../api";

export default function Login() {
  const [member_id, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  //   const refreshPage=()=>{
  //     window.location.reload();
  // }

  const handleLogin = async (e) => {
    // refreshPage();
    e.preventDefault();

    if (member_id === "" && password === "") {
      setErrorMessage("아이디와 비밀번호가 모두 입력되지 않았습니다.");
      //alert("아이디와 비밀번호가 모두 입력되지 않았습니다.");
      setTimeout(() => {
        // 입력 상자의 값 초기화
        setErrorMessage("");
        setMemberId("");
        setPassword("");
      }, 1500); // 1.5초 후 메시지 사라짐
    } else if (password === "") {
      setErrorMessage("비밀번호가 입력되지 않았습니다.");
      //alert("비밀번호가 입력되지 않았습니다.")
      setTimeout(() => {
        // 입력 상자의 값 초기화
        setErrorMessage("");
        setMemberId("");
        setPassword("");
      }, 1500); // 1.5초 후 메시지 사라짐
    } else if (member_id === "") {
      setErrorMessage("아이디가 입력되지 않았습니다.");
      //alert("아이디가 입력되지 않았습니다.")
      setTimeout(() => {
        // 입력 상자의 값 초기화
        setErrorMessage("");
        setMemberId("");
        setPassword("");
      }, 1500); // 1.5초 후 메시지 사라짐
    } else {
      instance
        .post("/members/sign-in", {
          member_id: member_id,
          password: password,
        })
        .then(function (obj) {
          console.log(obj.data);
          localStorage.setItem("token", obj.data.token);
          console.log(localStorage.getItem("token"));
          const config = {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          };
          console.log("axios.get");

          instance
            .get("/members/memberinfo", config)
            .then(function (response) {
              console.log(response.data);

              if (response.data.success && response.data.data.member_name) {
                localStorage.setItem("member_id", response.data.data.member_id);
                localStorage.setItem(
                  "member_name",
                  response.data.data.member_name
                );

                alert(
                  response.data.data.member_name +
                    "님 환영합니다. 홈으로 이동합니다"
                );

                navigate("/");
                window.location.reload();
              } else {
                alert("로그인에 실패하였습니다. 다시 로그인해주세요");
                setMemberId("");
                setPassword("");
              }
            })
            .catch(function (error) {
              console.log("로그인에 실패하였습니다. " + error);
              alert("로그인에 실패하였습니다. 다시 로그인해주세요");
              setMemberId("");
              setPassword("");
            });
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage("아이디 또는 비밀번호가 일치하지 않습니다.");
          //alert("아이디 또는 비밀번호가 일치하지 않습니다.")
        });
    }
  };

  const openChangePwWindow = () => {
    window.open(
      "http://localhost:3000/changepw",
      "_blank",
      "width=400, height=400"
    );
  };

  return (
    <div className="page-login">
      <form>
        <div className="">
          <div class="form-login">
            <div class="ui-logo">
              <a class="txt-logo" href="/">
                D.I.A.R.Y
              </a>
            </div>
            <h2 class="txt-label">로그인</h2>
            <div class="form-div">
              <div class="form-label">아이디</div>
              <input
                type="text"
                placeholder="아이디"
                value={member_id}
                onChange={(e) => setMemberId(e.target.value)}
                className="form-input"
              />
            </div>
            <div class="form-div">
              <div class="form-label">비밀번호</div>

              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
            </div>
            <Link onClick={handleLogin} className="form-button">
              로그인
            </Link>{" "}
            <Link to="/register" className="form-button">
              회원가입
            </Link>{" "}
            <button onClick={openChangePwWindow}>비밀번호 변경</button>
            {errorMessage && <p>{errorMessage}</p>}
          </div>
        </div>
      </form>
    </div>
  );
}
