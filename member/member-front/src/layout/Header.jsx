import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

const Header = () => {
  const [loginMember, setLoginMember] = useState(null);
  const navigate = useNavigate();

  // 로그인 상태에 따른 헤더 표시
  useEffect(() => {
    const fetchLogin = async () => {  
      try {
        const response = await api.get('/members/me', {withCredentials: true}); // 로그인한 회원 정보 조회 API
        setLoginMember(response.data);
      } catch (error) {
        setLoginMember(null); // 로그인 안 된 상태
      }
    };
    fetchLogin();
  });

  // 로그아웃 처리
  const handleLogout = async () => {
    try {
      await api.post('/members/logout', {}, {withCredentials: true}); // 로그아웃 API 호출  
      setLoginMember(null);
      alert("로그아웃 되었습니다.");
      navigate("/login"); // 로그인 페이지로 이동
    } catch (error) {
      console.error("Logout failed", error);
    } 
  };
  
  return (
    <div className="header">
      {!loginMember ? (
        <Link to="/login">로그인</Link>
      ) : (
        <span>
          [{loginMember.name}]님
          <button onClick={handleLogout}>로그아웃</button>
        </span>
      )}
      <Link to="/add">회원 가입</Link>
      <Link to="/">회원 목록</Link> 
    </div>
  );
}

export default Header;