const { getAllDrivers }= require("../controllers/getAllDrivers")
const { getDriverByName } = require("../controllers/getDriverByName");

async function handlerGetAllDrivers(req, res) {
  const { name } = req.query;
  try {
    if (name) {
      const response = await getDriverByName(name);
    res.json(response);
  } else {
      const response = await getAllDrivers();
      res.json(response);
  }
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};
  module.exports = {
    handlerGetAllDrivers,
  };