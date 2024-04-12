import "./Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing">
      <div classname='containerLanding'>
      <Link to="/home">
        <button className="buttonLanding">Click here!</button>
      </Link>
      </div>
    </div>
  );
};

export default Landing;
