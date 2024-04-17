import { Link } from "react-router-dom";
import "./Card.css";

function Card ({driver}) {

  console.log(driver);

  const {image, forename, surname, teams, id} = driver

    return(
      <div>
        <h1>Esto es card</h1>
        <Link to={`/home/${id}`}>
        <img src={image} alt={name} />
        <p>{forename} {surname}</p>
        <p>{teams}</p>
        </Link>
     </div>
    )
}

export default Card;