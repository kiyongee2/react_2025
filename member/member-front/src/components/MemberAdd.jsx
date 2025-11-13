import React from 'react';
import {Link} from "react-router-dom";
import api from '../api/api.js';

import {useNavigate} from "react-router-dom";

const MemberAdd = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if ( !email || !password || !name ) {
            alert('모든 필드를 입력해주세요.');
            return;
        } 
        try {
            const newMember = { email, password, name};      
            await api.post('/members', newMember);
            navigate('/'); // 회원 등록 후 회원 목록 페이지로 이동
        } catch (error) {
            console.error('회원 등록 오류', error);
        } 
    };

    return (
        <div className="member-add"> 
          <h1>회원 가입</h1>
          <input 
            type="text" 
            placeholder="이메일"  
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />
          <br/>
          <input 
            type="password" 
            placeholder="비밀번호"  
            value={password} 
            onChange={e => setPassword(e.target.value)} 
          />
          <br/> 
          <input 
            type="text" 
            placeholder="이름"  
            value={name} 
            onChange={e => setName(e.target.value)} 
          />
          <br/> 
          <button onClick={handleSubmit}>회원 등록</button>
        </div>
    );
} 

export default MemberAdd;