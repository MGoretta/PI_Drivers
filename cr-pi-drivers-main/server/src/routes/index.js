const { Router } = require("express");

const router = Router();

const { handlerGetAllDrivers } = require ("../handlers/handlerGetAll");
const { handlerGetDriverById } = require("../handlers/handlerGetById");

router.get("/drivers", handlerGetAllDrivers);

router.get("/drivers/:id", handlerGetDriverById);

router.get("/drivers/name", (req, res)=>{
    res.status(200).send("Aquí está el usuario por nombre");
});

router.post("/drivers", (req, res)=>{
    res.status(200).send("Creo un nuevo driver");
});

router.get("/teams", (req, res)=>{
    res.status(200).send("Aquí están todos los teams");
});

module.exports = router;
