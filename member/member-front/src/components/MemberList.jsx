import React from 'react';
import {Link} from "react-router-dom";
import api from '../api/api.js';
import dayjs from 'dayjs';

const MemberList = () => {
    const [members, setMembers] = React.useState([]);

    React.useEffect(() => {
        const fetchMembers = async () => {
            try {
                const res = await api.get('/members');
                setMembers(res.data); // 상태 업데이트
            } catch (error) {
                console.error('회원 목록 불러오기 오류', error);
            }
          }
          fetchMembers(); // 컴포넌트가 마운트될 때 회원 목록을 불러옴
     }, []);

    return (
        <div className="member-list"> 
          <h1>회원 목록</h1>
          <Link to="/add">
            <button> + 회원 등록 </button>
          </Link>
          <table className='table-list'>
            <thead style={{backgroundColor: "#eee"}}> 
              <tr>
                <th>번호</th> 
                <th>이메일</th> 
                <th>이름</th>   
                <th>가입일</th> 
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member.id}>
                  <td>{member.id}</td>
                  <td>{member.email}</td>
                  <td>{member.name}</td>
                  <td>{dayjs(member.regDate).format("YYYY-MM-DD HH:mm")}</td>
                </tr>
                ))
              }
            </tbody>
          </table>
        </div>
    );
} 

export default MemberList;