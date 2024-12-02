import "./Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing">
      <div className='containerLanding'>
      <Link to="/home">
        <button className="buttonLanding">Run here!</button>
      </Link>
      </div>
    </div>
  );
};

export default Landing;
