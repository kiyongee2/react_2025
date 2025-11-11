import React from "react";
import { Routes, Route } from "react-router-dom";
import BookList from "./components/BookList";
import BookAdd from "./components/BookAdd";
import BookDetail from "./components/BookDetail";
import BookEdit from "./components/BookEdit";

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<BookAdd />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/books/:id/edit" element={<BookEdit />} />
        </Routes>
      </div>
  );
}

export default App;
