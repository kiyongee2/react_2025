import axios from "axios";

const api = axios.create({
  // 백엔드 API 기본 URL(springboot 서버 주소)
  baseURL: "http://localhost:8080/api",  
});

export default api;
