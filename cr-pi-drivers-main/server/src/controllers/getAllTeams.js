const axios = require('axios');
const { Team } = require('../db');

const getAllTeams = async (req, res) => {
    try {
        const dbTeams = await Team.findAll();
        if(dbTeams.length === 0) {
            try {
                const response = await axios.get("http://localhost:5000/drivers", { responseType: 'json' });
                const drivers = response.data;

                const saveTeams = []
                drivers.forEach(driver => {
                    if(driver.teams){
                        const teams = driver.teams.split(',').map(team => team.trim());
                        teams.forEach(teamName => {
                            if(!saveTeams.some(saveTeam => saveTeam.name === teamName)){
                                saveTeams.push({
                                    name: teamName,
                                });
                            }
                        });
                    }
                });
                await Team.bulkCreate(saveTeams, { individualHooks: true });
            } catch (error) {
                console.error('Error al obtener los conductores:', error);
                // Envía un mensaje de error más detallado
                throw new Error(`Error al obtener los conductores: ${error.message}`);
            }
        }
        const allTeams = await Team.findAll();
        const teamNames = allTeams.map(team => team.name);
        res.json(teamNames);
    } catch (error) {
        console.error('Hubo un error al obtener los teams:', error);
        // Envía un mensaje de error más detallado
        res.status(500).json({ error: `Error interno del servidor get: ${error.message}` });
    }
};

module.exports = {
    getAllTeams
};