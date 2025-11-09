import React from "react";
import { Routes, Route } from "react-router-dom";
import BookList from "./components/BookList";
import BookAdd from "./components/BookAdd";

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<BookAdd />} />
        </Routes>
      </div>
  );
}

export default App;
