import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
      alert("모든 항목을 입력해주세요!");
      return;
    }
    const success = onRegister({ name, email, password });
    if (success) navigate('/login');
  };

  return (
    <div className="register">
      <h1>회원가입</h1>
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>가입하기</button>
    </div>
  );
};

export default Register;
