import { useParams, useNavigate, Link } from "react-router-dom";

const MemberDetail = ({ members, onDeleteMember }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const member = members.find(m => m.id === parseInt(id));

  if (!member) return <p>존재하지 않는 회원입니다.</p>;

  const handleDelete = () => {
    onDeleteMember(member.id);
    navigate('/members');
  };

  return (
    <div className="member-detail">
      <h1>회원 상세보기</h1>
      <p><strong>이름:</strong> {member.name}</p>
      <p><strong>이메일:</strong> {member.email}</p>
      <div className="detail-btns">
        <Link to={`/members/edit/${member.id}`}><button>수정</button></Link>
        <button onClick={handleDelete}>삭제</button>
        <Link to="/members"><button>목록으로</button></Link>
      </div>
    </div>
  );
};

export default MemberDetail;
