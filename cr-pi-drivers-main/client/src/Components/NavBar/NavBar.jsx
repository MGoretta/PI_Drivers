import { Link, useLocation } from "react-router-dom";
import  SearchBar  from "../SearchBar/SearchBar";
import "./NavBar.css";

const NavBar = () => {
  const { pathname } = useLocation();

// const preventDefault = (event) => {
//   event.preventDefault()
// }

  return (
    <header className="header">
      <nav className="nav">
        <Link to={"/"}>
          <button className="navButton navButtonClose">Landing</button>
        </Link>
        <div className="navButtons">
          <a href="/home">
            <button className="navButton">Home</button>
          </a>
          <Link to={"/create"}>
            <button className="navButton">Create</button>
          </Link>
          <div className="navSearch">
            {pathname === "/home" && <SearchBar />}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
