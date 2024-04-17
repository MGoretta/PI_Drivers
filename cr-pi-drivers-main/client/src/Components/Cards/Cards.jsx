import React from "react";

import Card from "../Card/Card";
import "./Cards.css";

function Cards ({drivers}) {

  const driverList = drivers;
 
  return (
    <div>
      {driverList?.map((driver)=> (
     <Card key= {driver.id} driver = {driver}/>
    ))}
    </div>
  );
}

export default Cards;

