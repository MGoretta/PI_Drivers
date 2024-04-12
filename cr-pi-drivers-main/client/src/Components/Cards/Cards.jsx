import React from "react";

import Card from "../Card/Card";

function Cards ({drivers}) {

  const driverList = drivers;
 
  return (
    <div>
      {driverList?.map((driver)=> (
     <Card driver = {driver}/>
    ))}
    </div>
  );
}

export default Cards;

