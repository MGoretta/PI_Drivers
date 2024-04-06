const driversController = require("../controllers/getAllDrivers");

async function handlerGetAllDrivers(req, res) {
    try {
      const drivers = await driversController.getAllDrivers();
  
      res.json(drivers);
    } catch (error) {
      // Maneja cualquier error ocurrido durante el proceso
      console.error("Error al obtener conductores:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
  
  module.exports = {
    handlerGetAllDrivers,
  };