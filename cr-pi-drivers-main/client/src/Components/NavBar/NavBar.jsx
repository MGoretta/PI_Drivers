import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <header className="navHeader">
      <nav className="nav">
        <Link to="/">
          <button className="navButton navButtonClose">Cerrar</button>
        </Link>
        <div className="navButtons">
          <Link to="/home">
            <button className="navButton">Home</button>
          </Link>
          <Link to="/create">
            <button className="navButton">Create</button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;

