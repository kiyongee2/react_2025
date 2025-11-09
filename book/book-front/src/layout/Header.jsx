import { Link } from "react-router-dom";

const Header = () => {
  return(
    <div className="header">
      <Link to="/">Home</Link>
      <Link to="/books">도서 목록</Link>
      <Link to="/books/add">도서 등록</Link>
    </div>
  )
}

export default Header;