const { getAllTeams } = require('../controllers/getAllTeams');

const handlerGetAllTeams= async (req, res) => {
    try {
        await getAllTeams(req, res);
    } catch (error) {
        console.error('Hubo un error en el handler al obtener los teams:', error);
        res.status(500).json({ error: 'Error interno del servidor de handler'});
    }
};

module.exports = {
    handlerGetAllTeams
};