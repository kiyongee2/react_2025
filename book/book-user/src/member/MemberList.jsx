import { Link } from "react-router-dom";

const MemberList = ({ members, onDeleteMember }) => {
  return (
    <div className="member-list">
      <h1>회원 목록</h1>
      {members.length === 0 ? (
        <p>등록된 회원이 없습니다.</p>
      ) : (
        <ul>
          {members.map((member) => (
            <li key={member.id}>
              <Link to={`/members/${member.id}`}>{member.name}</Link> — {member.email}
              <button onClick={() => onDeleteMember(member.id)}>삭제</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MemberList;
