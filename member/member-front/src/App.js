import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import MemberList from './components/MemberList';
import MemberAdd from './components/MemberAdd';
import Header from './layout/Header';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<MemberAdd />} />
        <Route path="/" element={<MemberList />} />
      </Routes>
    </div>
  );
}

export default App;  
