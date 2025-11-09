import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);

  // 도서 목록 불러오기
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get("/books");
        setBooks(res.data);
      } catch (error) {
        console.error("도서 목록 불러오기 실패:", error);
      }
    };
    fetchBooks();
  }, []);

  // 도서 삭제
  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await api.delete(`/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
      alert("삭제 완료!");
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <h1>📚 도서 목록</h1>
      <Link to="/add" style={{ textDecoration: "none" }}>
        <button style={{ marginBottom: "20px" }}>+ 도서 등록</button>
      </Link>

      {books.length === 0 ? (
        <p>등록된 도서가 없습니다.</p>
      ) : (
        <table border="1" cellPadding="10" width="100%">
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
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <button onClick={() => handleDelete(book.id)}>삭제</button>
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
