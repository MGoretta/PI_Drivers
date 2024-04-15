const postDriver = require("../controllers/postDriver");

// Maneja la creación de un nuevo conductor
const handlerPostDriver = async (req, res) => {
  try {
    // Extrae los datos, crea un nuevo conductor
    const { forename, surname, description, image, nationality, dob, teams } =
      req.body;

    const result = await postDriver(
      forename,
      surname,
      description,
      image,
      nationality,
      dob,
      teams
    );

    res.status(201).json(result);
  } catch (error) {
    // Maneja cualquier error ocurrido durante el proceso
    console.error("Error en el manejador de crear conductor:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { handlerPostDriver };