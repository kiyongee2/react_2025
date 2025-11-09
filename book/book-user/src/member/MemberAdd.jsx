import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MemberAdd = ({ onAddMember }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name.trim() === '' || email.trim() === '') {
      alert("이름과 이메일을 모두 입력해주세요!");
      return;
    }

    onAddMember({ name, email });
    alert("회원이 등록되었습니다!");
    navigate('/members');
  };

  return (
    <div className="member-add">
      <h1>회원 등록</h1>
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
      <button onClick={handleSubmit}>등록</button>
    </div>
  );
};

export default MemberAdd;
