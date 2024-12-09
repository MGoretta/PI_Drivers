import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ image, id, name, teams }) => {
  return (
      <Link to={`/home/${id}`}>
          <article className='card'>
              <img src={image} alt={name} className='imgCard'/>
              <h2 className='nameCard'>{name}</h2>
              <p className='teamsCard'>{teams}</p>
          </article>
      </Link>
  );
};

export default Card;

// function Card ({driver}) {

//   console.log(driver);

//   const {image, forename, surname, teams, id} = driver

//     return(
//       <div className="card">
//         <Link to={`/home/${id}`}>
//         <img src={image} alt={name} className="cardImage"/>
//         <p className= "cardName">{forename} {surname}</p>
//         <p className = "cardTeams">{teams}</p>
//         </Link>
//      </div>
//     )
// }

// export default Card;