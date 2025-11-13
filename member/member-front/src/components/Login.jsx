import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState(""); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    // 로그인 처리 로직 (예: API 호출)
    if(!email || !password){
      alert("이메일과 비밀번호를 모두 입력하세요.");
      return;
    }
    console.log("Logging in with", { email, password });
    try {
      await api.post('/members/login', { email, password }, { withCredentials: true });
      alert("로그인 성공!");
      navigate("/"); // 로그인 후 메인 페이지로 이동
    }
    catch (error) {
      alert("이메일 또는 비밀번호가 올바르지 않습니다.");
    }   
  };

  return (
    <div className="login"> 
      <h2>로그인</h2>
      <form>
        <div> 
          <label>이메일 </label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>비밀번호 </label>    
          <input
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>로그인</button>
      </form>
    </div>
  );
}

export default Login;