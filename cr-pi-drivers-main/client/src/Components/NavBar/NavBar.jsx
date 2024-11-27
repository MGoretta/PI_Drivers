import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => { 
  return (
  <header className="navHeader">
      <nav className="nav">
          <Link to={"/"}>
              <button className="navButton navButtonClose">Cerrar</button>
          </Link>
          <div className="navButtons">
              <a href="/home">
                  <button className="navButton">Home</button>
              </a>
              <Link to={"/create"}>
                  <button className="navButton">Create</button>
              </Link>
          </div>
      </nav>
  </header>
  );
};

export default NavBar;
