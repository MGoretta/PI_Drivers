const axios = require("axios");
const { Sequelize } = require("sequelize");
const { Driver, Team } = require("../db");

const getDriversByNameFromDatabase = async (name) => {
  // Buscar conductores por nombre en la db
  const drivers = await Driver.findAll({
    where: {
      [Sequelize.Op.or]: [
        { name: { [Sequelize.Op.iLike]: `%${name}%` } },
        { lastname: { [Sequelize.Op.iLike]: `%${name}%` } },
      ],
    },
    include: [{ model: Team, through: "driver_team" }],
  });
  // Devolver los conductores encontrados
  return drivers;
};

const getDriversByNameFromServer = async (name) => {
  try {
    // Hacer una solicitud para obtener todos los conductores disponibles
    const response = await axios.get(
      `http://127.0.0.1:3001/drivers`
    );
    console.log(response);
    // Obtener los conductores de la respuesta
    const driversApi = response.data;
    // Filtrar los conductores por nombre o apellido
    const nameLowercase = name.toLowerCase();
    const drivers = driversApi.filter((driver) => {
      console.log(driver);
      const fullName =
        `${driver.name} ${driver.lastname}`.toLowerCase();
      return fullName.includes(nameLowercase);
    });
    // Devolver los conductores encontrados
    return drivers;
  } catch (error) {
    console.error("Error al obtener conductores del servidor:", error);
    throw new Error("Error al obtener conductores del servidor");
  }
};

const getDriverByName = async (name) => {
  const driversNameDB = await getDriversByNameFromDatabase(name);
  const driversNameAPI = await getDriversByNameFromServer(name);
  return [...driversNameDB, ...driversNameAPI];
};

module.exports = {
  getDriverByName
};