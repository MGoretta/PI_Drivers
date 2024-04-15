import { Link, useLocation } from "react-router-dom";
import  SearchBar  from "../SearchBar/SearchBar";
import "./NavBar.css";

const NavBar = () => {
  const { pathname } = useLocation();

  return (
    <header className="header">
      <nav className="nav">
        <Link to={"/"}>
          <button className="navButton navButtonClose">Landing</button>
        </Link>
        <div className="navButtons">
          <Link to={"/home"}>
            <button className="navButton">Home</button>
          </Link>
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
