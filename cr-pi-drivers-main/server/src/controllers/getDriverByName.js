const { default: axios } = require("axios");
const { Sequelize } = require("sequelize");
const { Driver, Team } = require("../db");

const getDriversByNameFromDatabase = async (name) => {
  // Buscar conductores por nombre en la db
  const drivers = await Driver.findAll({
    where: {
      [Sequelize.Op.or]: [
        { forename: { [Sequelize.Op.iLike]: `%${name}%` } },
        { surname: { [Sequelize.Op.iLike]: `%${name}%` } },
        Sequelize.literal(`name || ' ' || lastname ILIKE '%${name}%'`),
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
      `http://localhost:3001/drivers`
    );
    // Obtener los conductores de la respuesta
    const driversApi = response.data;
    // Filtrar los conductores por nombre o apellido
    const nameLowercase = name.toLowerCase();
    const drivers = driversApi.filter((driver) => {
      const fullName =
        `${driver.name.forename} ${driver.name.surname}`.toLowerCase();
      return fullName.includes(nameLowercase);
    });
    // Devolver los conductores encontrados
    return drivers;
  } catch (error) {
    console.error("Error al obtener conductores del servidor:", error);
    throw new Error("Error al obtener conductores del servidor");
  }
};

module.exports = {
  getDriversByNameFromDatabase,
  getDriversByNameFromServer,
};