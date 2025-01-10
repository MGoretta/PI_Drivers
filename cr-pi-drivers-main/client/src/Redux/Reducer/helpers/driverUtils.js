// helpers/driverUtils.js
import { sortDrivers } from "./sortUtils";

/**
 * Combina los drivers existentes con los nuevos, eliminando duplicados y ordenando el resultado.
 *
 * @param {Array} existingDrivers - Conductores ya existentes en el estado.
 * @param {Array} newDrivers - Conductores nuevos recibidos en la acción.
 * @param {string} order - Criterio de ordenación (por ejemplo, "name" o "dob").
 * @param {string} direction - Dirección de ordenación ("ASC" o "DESC").
 * @returns {Array} Conductores únicos y ordenados.
 */
export const uniqueAndSortedDrivers = (existingDrivers, newDrivers, order, direction) => {
    const combinedDrivers = [
        ...existingDrivers,
        ...newDrivers.filter(
            (driver) => !existingDrivers.some((existDriver) => existDriver.id === driver.id)
        )
    ];
    return sortDrivers(combinedDrivers, order, direction);
};

/**
 * Filtra los conductores por equipo y origen (API o base de datos).
 *
 * @param {Array} drivers - Lista de conductores.
 * @param {string} teams - Equipo por el cual filtrar ("all" para no filtrar).
 * @param {string} origin - Origen del conductor ("API", "DB" o "all").
 * @returns {Array} Conductores filtrados.
 */
export const filterDrivers = (drivers, teams, origin) => {
    let filteredDrivers = drivers;

    if (teams !== "all") {
        filteredDrivers = drivers.filter((driver) => {
            return (
                driver && ((Array.isArray(driver?.Teams) &&
                    driver.Teams.some((team) => team.name === teams)) ||
                    (typeof driver.teams === "string" &&
                        driver.teams.split(", ").includes(teams)))
            );
        });
    }

    if (origin === "API") {
        filteredDrivers = filteredDrivers.filter((driver) => driver && driver.driverRef);
    } else if (origin === "DB") {
        filteredDrivers = filteredDrivers.filter((driver) => driver && !driver.driverRef);
    }

    return filteredDrivers;
};

