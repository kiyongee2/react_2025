import React, { useState } from "react";
import api from "../api/api.js";
import { useNavigate } from "react-router-dom";

const BookAdd = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title.trim() || !author.trim()) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    try {
      await api.post("/books", { title, author });
      alert("도서 등록 완료!");
      navigate("/");
    } catch (error) {
      console.error("등록 실패:", error);
    }
  };

  return (
    <div style={{ width: "60%", margin: "50px auto" }}>
      <h1>📖 도서 등록</h1>
      <input
        type="text"
        placeholder="도서명"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", margin: "10px 0", padding: "8px" }}
      />
      <input
        type="text"
        placeholder="저자명"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        style={{ width: "100%", margin: "10px 0", padding: "8px" }}
      />
      <button onClick={handleSubmit}>등록</button>
      <button onClick={() => navigate("/")}>취소</button>
    </div>
  );
};

export default BookAdd;
