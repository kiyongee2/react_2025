import './App.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Home from './layout/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import MemberList from './member/MemberList';
import MemberAdd from './member/MemberAdd';
import MemberDetail from './member/MemberDetail';
import MemberEdit from './member/MemberEdit';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [members, setMembers] = useState([]);
  const [user, setUser] = useState(null); // 로그인 상태

  // --- 초기 데이터 로드 ---
  useEffect(() => {
    const storedMembers = JSON.parse(localStorage.getItem("members")) || [];
    const storedUser = JSON.parse(localStorage.getItem("user")) || null;
    setMembers(storedMembers);
    setUser(storedUser);
  }, []);

  // --- 로컬스토리지 동기화 ---
  useEffect(() => {
    localStorage.setItem("members", JSON.stringify(members));
  }, [members]);

  // --- 회원가입 ---
  const handleRegister = (newMember) => {
    const exists = members.some(m => m.email === newMember.email);
    if (exists) {
      alert("이미 등록된 이메일입니다.");
      return false;
    }
    const newId = members.length > 0 ? members[members.length - 1].id + 1 : 1;
    setMembers([...members, { id: newId, ...newMember }]);
    alert("회원가입이 완료되었습니다!");
    return true;
  };

  // --- 로그인 ---
  const handleLogin = (email, password) => {
    const found = members.find(m => m.email === email && m.password === password);
    if (found) {
      setUser(found);
      localStorage.setItem("user", JSON.stringify(found));
      alert("로그인 성공!");
      return true;
    } else {
      alert("이메일 또는 비밀번호가 올바르지 않습니다.");
      return false;
    }
  };

  // --- 로그아웃 ---
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    alert("로그아웃 되었습니다.");
  };

  // --- 회원 수정 ---
  const handleUpdateMember = (updatedMember) => {
    setMembers(members.map(m => m.id === updatedMember.id ? updatedMember : m));
  };

  // --- 회원 삭제 ---
  const handleDeleteMember = (id) => {
    if (window.confirm("이 회원을 삭제하시겠습니까?")) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  return (
    <div className="App">
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />

        {user ? (
          <>
            <Route path="/members" element={<MemberList members={members} onDeleteMember={handleDeleteMember} />} />
            <Route path="/members/add" element={<MemberAdd onAddMember={(m) => setMembers([...members, m])} />} />
            <Route path="/members/:id" element={<MemberDetail members={members} onDeleteMember={handleDeleteMember} />} />
            <Route path="/members/edit/:id" element={<MemberEdit members={members} onUpdateMember={handleUpdateMember} />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
