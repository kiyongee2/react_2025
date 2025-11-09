import { Link } from "react-router-dom";

const Header = ({ user, onLogout }) => {
  return (
    <div className="header">
      <Link to="/">Home</Link>{" "}
      {user ? (
        <>
          | <Link to="/members">회원 목록</Link>
          | <Link to="/members/add">회원 등록</Link>
          | <span style={{ marginLeft: '10px' }}>👤 {user.name}</span>
          <button onClick={onLogout}>로그아웃</button>
        </>
      ) : (
        <>
          | <Link to="/login">로그인</Link>
          | <Link to="/register">회원가입</Link>
        </>
      )}
    </div>
  );
};

export default Header;