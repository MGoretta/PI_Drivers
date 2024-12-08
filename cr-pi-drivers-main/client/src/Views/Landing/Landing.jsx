import "./Landing.css";
import { Link } from "react-router-dom";
import fondoLanding from "../../assets/fondolanding.jpg";

const Landing = () => {
  return (
    <div className="landing" style={{ backgroundImage: `url(${fondoLanding})` }}>
      <div className='containerLanding'>
      <Link to="/home">
        <button className="buttonLanding">Run here!</button>
      </Link>
      </div>
    </div>
  );
};

export default Landing;
