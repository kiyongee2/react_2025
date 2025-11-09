import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const MemberEdit = ({ members, onUpdateMember }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const member = members.find(m => m.id === parseInt(id));

  const [name, setName] = useState(member ? member.name : '');
  const [email, setEmail] = useState(member ? member.email : '');

  if (!member) return <p>존재하지 않는 회원입니다.</p>;

  const handleUpdate = () => {
    if (name.trim() === '' || email.trim() === '') {
      alert("이름과 이메일을 모두 입력해주세요!");
      return;
    }

    onUpdateMember({ id: member.id, name, email });
    alert("수정이 완료되었습니다!");
    navigate(`/members/${member.id}`);
  };

  return (
    <div className="member-edit">
      <h1>회원 수정</h1>
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
      <button onClick={handleUpdate}>수정 완료</button>
      <button onClick={() => navigate(`/members/${member.id}`)}>취소</button>
    </div>
  );
};

export default MemberEdit;
