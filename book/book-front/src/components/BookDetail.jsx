import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import api from "../api/api";
import dayjs from "dayjs";

const BookDeatail = () => {
  const { id } = useParams(); // URL 파라미터에서 도서 ID 추출
  const [book, setBook] = useState({}); // 도서 정보 상태
  const navigate = useNavigate(); // 페이지 이동 훅

  // 도서 상세 정보 불러오기
  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const res = await api.get(`/books/${id}`); // 도서 상세 정보 API 호출
        setBook(res.data); // 상태 업데이트
      } catch (error) {
        console.error("도서 상세 정보 불러오기 실패:", error);
      }
    };
    fetchBookDetail(); // 함수 호출
  }, [id]); // id가 변경될 때마다 실행

  return (
    <div style={{ width: "60%", margin: "50px auto" }}>
      <h1>📖 도서 상세보기</h1>
      <div style={{ textAlign: "left", lineHeight: "1.8" }}>
        <p><strong>ID:</strong> {book.id}</p>
        <p><strong>제목:</strong> {book.title}</p>
        <p><strong>저자:</strong> {book.author}</p>
        {book.regDate && (
          <p>
            <strong>등록일: </strong>
            {dayjs(book.regDate).format("YYYY-MM-DD HH:mm")}
          </p>
        )}
      </div>
      <button onClick={() => navigate("/")}>목록으로</button>
    </div>
  );
}

export default BookDeatail;