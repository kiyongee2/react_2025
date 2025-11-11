import '../App.css';
import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Link, useNavigate } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]); // 도서 목록 상태
  const navigate = useNavigate(); // 페이지 이동 훅

  // 도서 목록 불러오기
  useEffect(() => {
    const fetchBooks = async () => { // 비동기 함수 선언
      try {
        const res = await api.get("/books"); // API 호출
        setBooks(res.data); // 상태 업데이트
      } catch (error) {
        console.error("도서 목록 불러오기 실패:", error);
      }
    };
    fetchBooks(); // 함수 호출
  }, []); // 빈 배열: 컴포넌트 마운트 시 한 번만 실행

  // 도서 삭제
  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await api.delete(`/books/${id}`);  
      setBooks(books.filter((book) => book.id !== id));  // 상태에서 삭제된 도서 제거
      alert("삭제 완료!");
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <h1>📚 도서 목록</h1>
      {/* 도서 등록 페이지로 이동 */}
      <Link to="/add" style={{ textDecoration: "none" }}> 
        <button style={{ marginBottom: "20px" }}>+ 도서 등록</button>
      </Link>

      {books.length === 0 ? (
        <p>등록된 도서가 없습니다.</p>
      ) : (
        <table className="table-list">
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th>ID</th>   
              <th>제목</th>
              <th>저자</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}> 
                <td>{book.id}</td>
                <td>
                  <Link to={`/books/${book.id}`}>{book.title}</Link>
                </td>
                <td>{book.author}</td>
                <td>
                  <button onClick={() => handleDelete(book.id)}>삭제</button>
                  <button onClick={() => navigate(`/books/${book.id}/edit`)}>수정</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookList;
