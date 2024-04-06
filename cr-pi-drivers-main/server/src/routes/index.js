const { Router } = require("express");

const router = Router();

const { handlerGetAllDrivers } = require ("../handlers/handlerGetAll");
const { handlerGetDriverById } = require("../handlers/handlerGetById");
const { handlerPostDriver } = require("../handlers/handlerPost");
const { handlergetDriverByName } = require("../handlers/handlerGetByName");
const { handlerGetAllTeams } = require("../handlers/handlerGetTeams");

router.get("/drivers", handlerGetAllDrivers);

router.get("/drivers/:id", handlerGetDriverById);

router.get("/drivers", handlergetDriverByName);

router.post("/drivers", handlerPostDriver);

router.get("/teams", handlerGetAllTeams);

module.exports = router;
