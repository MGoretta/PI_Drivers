import axios from "axios";
import {
    SEARCH_DRIVERS,
    FETCH_DRIVERS,
    RETRIEVE_DRIVER_BY_ID,
    PAGINATE,
    ORDER_BY_DOB,
    ORDER_BY_NAME,
    FILTER,
    CREATE_DRIVER_REQUEST,
    CREATE_DRIVER_SUCCESS,
    CREATE_DRIVER_ERROR
} from "../Actions/actions-types.js";

const BASE_URL = 'http://localhost:3001';

const createAction = (type, payload) => ({ type, payload });

// Función auxiliar para procesar datos del driver
const processDriverData = (data) => {
    if (Array.isArray(data) && data.length > 0) {
        return data[0][0]; // Si es un array con datos
    } else if (typeof data === "object") {
        return data; // Si es un objeto
    }
    console.error("Error: Respuesta inesperada del servidor");
    return null; // Si no es ninguno de los casos anteriores
};

export const clusterDriversFilter = (
    allDrivers,
    newDrivers,
    selectedOrder,
    selectedDirection
) => {
    const clusteredDrivers = [...allDrivers];
    newDrivers.forEach((driver) => {
        if (!allDrivers.some((existDriver) => existDriver.id === driver.id)){
            clusteredDrivers.push(driver);
        }
    });
    return sortDrivers(clusteredDrivers, selectedOrder, selectedDirection);
};

// Acción para buscar un driver por su ID
export const fetchDriverById = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${BASE_URL}/drivers/${id}`);
            const data = processDriverData(response.data);

            if (data) {
                dispatch({ type: RETRIEVE_DRIVER_BY_ID, payload: data });
            }
        } catch (error) {
            console.error("Hubo un error al obtener detalles del driver:", error);
        }
    };
};

export const searchDrivers = (name) => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.get(`${BASE_URL}/drivers?name=${name}`);
            const { data } = response;
            const currentState = getState();
            console.log('Estado actual de drivers antes del filtro:', currentState.drivers); // <-- Aquí

            if(!Array.isArray(data) || data.length === 0){
                return;
            }
            // const allDrivers = data.filter((driver) => {
            //     return !currentState.drivers.some((existDriver) => existDriver.id === driver.id);
            // });

            const allDrivers = data;


            if(allDrivers.length === 0){
                return;
            }
            dispatch({
                type: SEARCH_DRIVERS,
                payload: allDrivers,
            });
            console.log('Drivers despachados:', allDrivers);
        } catch (error) {
            console.error('Hubo un error al buscar los conductores:', error);
            alert('No se encontraron drivers con este nombre. Intente creando uno.');
        }
    };
};

export const fetchDrivers = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${BASE_URL}/drivers`);
            const data = response.data.slice(0, 300);

            dispatch({
                type: FETCH_DRIVERS,
                payload: data,
            });
        } catch (error) {
            console.error('Hubo un error al cargar los drivers: ', error);
        }
    };
};

export const setPaginate = (page, driversPerPage = 9) =>
    createAction(PAGINATE, { page, driversPerPage });

export const setOrderByName = (direction) =>
    createAction(ORDER_BY_NAME, direction);

export const setOrderByDob = (direction) =>
    createAction(ORDER_BY_DOB, direction);

export const setFilter = (filters) =>
    createAction(FILTER, filters);

//AQUÍ DEJAMOS LA VERSIÓN ANTERIOR DE LO DE ARRIBA (DONDE AGRUPAMOS LAS FUNCIONES SIMPLES)
// export const setPaginate = (page, driversPerPage = 9) => {
//     return {
//         type: PAGINATE,
//         payload: { page, driversPerPage },
//     };
// };

// export const setOrderByName = (direction) => {
//     return {
//         type: ORDER_BY_NAME,
//         payload: direction
//     };
// };

// export const setOrderByDob = (direction) => {
//     return {
//         type: ORDER_BY_DOB,
//         payload: direction
//     };
// };

// export const setFilter = (filters) => {
//     return {
//         type: FILTER,
//         payload: filters
//     };
// };

export const createDriverRequest = (driverData) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_DRIVER_REQUEST });
        try {
            await axios.post(`${BASE_URL}/drivers`, driverData);
            dispatch({ type: CREATE_DRIVER_SUCCESS });
        } catch (error) {
            dispatch({ type: CREATE_DRIVER_ERROR, payload: error.message });
        }
    };
};