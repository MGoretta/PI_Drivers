const { Driver, Team } = require("../db");
const axios = require('axios');

const clean = (arr) => {
  if (!arr || !Array.isArray(arr)) {
    return [];
  }

  return arr.map((driver) => {
    return {
      id: driver.id,
      name: driver.name.forename,
      lastname: driver.name.surname,
      description: driver.description,
      image: driver.image.url,
      nationality: driver.nationality,
      dob: driver.dob,
      teams: driver.teams,
      created: false,
    };
  });
};

const getDriversFromDB = async () => {
  try {
    const drivers = await Driver.findAll({
      include: Team
    });
    const mappedDrivers = drivers.map(driv => {
      const teamsString = driv.Teams.map((t) => t.name).join(', '); // Unir los nombres de los equipos en un solo string separado por comas
      return {
        id: driv.id,
        name: driv.name,
        lastname: driv.lastname,
        description: driv.description,
        image: driv.image,
        nationality: driv.nationality,
        dob: driv.dob,
        teams: teamsString
      };
    });
    return mappedDrivers;
  } catch (error) {
    console.error("Error fetching drivers from DB:", error);
    return [];
  }
};



const getDriversFromAPI = async () => {
  try {
    const response = await axios.get('http://localhost:5000/drivers');
    return clean (response.data);
  } catch (error) {
    console.error("Error fetching drivers from API:", error);
    return [];
  }
};
console.log(getDriversFromAPI);

const getAllDrivers = async () => {
  console.log("Fetching drivers from DB...");
  const driversFromDB = await getDriversFromDB();
  console.log(driversFromDB);

  console.log("Fetching drivers from API...");
  const driversFromAPI = await getDriversFromAPI();
  console.log("Drivers from API:", driversFromAPI);

  return [...driversFromDB, ...driversFromAPI];
};

module.exports = {
  getAllDrivers,
};
console.log(getAllDrivers);


// const fs = require("fs");
// const path = require("path");
// const { Driver } = require ("../db");

// // Ruta al archivo JSON de los pilotos
// const driversFilePath = path.join(__dirname, "../../api/db.json");

// // Obtener todos los pilotos del archivo JSON
// async function getAllDrivers() {
//   try {
//     // Leer los datos del archivo JSON
//     const driversData = fs.readFileSync(driversFilePath, "utf8");
//     const driversJson = JSON.parse(driversData);
//     const driversFromFile = driversJson.drivers;

//     const driversFromDb = await Driver.findAll();

//     const drivers = [...driversFromFile, ...driversFromDb];

//     // Si un piloto no tiene imagen, se le coloca una por defecto
//     drivers.forEach((driver) => {
//       if (!driver.image.url) {
//         driver.image = { url: "/assets/img-default.jpg" };
//       }
//     });

//     return drivers;
//   } catch (error) {
//     console.error("Error al obtener conductores:", error);
//     throw new Error("Error interno del servidor");
//   }
// }

// module.exports = {
//   getAllDrivers,
// };