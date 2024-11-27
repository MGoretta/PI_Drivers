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

export const fetchDriverById = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/drivers/${id}`);
            const data = response.data;

            if(Array.isArray(data) && data.length > 0){
                dispatch({
                    type: RETRIEVE_DRIVER_BY_ID,
                    payload: data[0][0],
                });
            } else if(typeof data === "object"){
                dispatch({
                    type: RETRIEVE_DRIVER_BY_ID,
                    payload: data,
                });
            } else {
                console.error('Error: Respuesta inesperado del servidor');
            }
        } catch (error) {
            console.error('Hubo un error al obtener detalles del driver:', error);
        }
    };
};

export const searchDrivers = (name) => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.get(`http://localhost:3001/drivers?name=${name}`);
            const { data } = response;
            const currentState = getState();

            if(!Array.isArray(data) || data.length === 0){
                return;
            }
            const allDrivers = data.filter((driver) => {
                return !currentState.drivers.some((existDriver) => existDriver.id === driver.id);
            });
            if(allDrivers.length === 0){
                return;
            }
            dispatch({
                type: SEARCH_DRIVERS,
                payload: allDrivers,
            });
        } catch (error) {
            console.error('Hubo un error al buscar los conductores:', error);
            alert('No se encontraron drivers con este nombre. Intente creando uno.');
        }
    };
};

export const searchDriverByName = (name) => {
    return async () => {
        try {
            const response = await axios.get(`http://localhost:3001/drivers?name=${name}`);
            const { data } = response;

            if(!Array.isArray(data) || data.length === 0){
                return null;
            }
            return data[0];
        } catch (error) {
            console.error('Hubo un error al buscar al driver por su nombre:', error);
            return null;
        }
    };
};

export const fetchDrivers = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3001/drivers');
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

export const setPaginate = (page, driversPerPage = 9) => {
    return {
        type: PAGINATE,
        payload: { page, driversPerPage },
    };
};

export const setOrderByName = (direction) => {
    return {
        type: ORDER_BY_NAME,
        payload: direction
    };
};

export const setOrderByDob = (direction) => {
    return {
        type: ORDER_BY_DOB,
        payload: direction
    };
};

export const setFilter = (filters) => {
    return {
        type: FILTER,
        payload: filters
    };
};

export const sortDrivers = (drivers, selectedOrder, selectDirection) => {
    let sortedDrivers = [...drivers];
    if(selectedOrder === "name") {
        sortedDrivers.sort((a, b) => {
            const nameA = `${a.name?.forename || a.forename || ""}
            ${a.name?.surname || a.surname || ""}`;

            const nameB = `${b.name?.forename || b.forename || ""}
            ${b.name?.surname || b.surname || ""}`;

            const compareOrder = nameA.localeCompare(nameB);
            return selectDirection === "ASC" ? compareOrder : -compareOrder;
        });
    } else if (selectedOrder === "dob") {
        sortedDrivers.sort((a, b) => {
            const dobA = new Date(a.dob);
            const dobB = new Date(b.dob);
            return selectDirection === "ASC" ? dobA - dobB : dobB - dobA;
        });
    };
    return sortedDrivers;
};

export const createDriverRequest = (driverData) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_DRIVER_REQUEST });
        try {
            await axios.post('http://localhost:3001/drivers', driverData);
            dispatch({ type: CREATE_DRIVER_SUCCESS });
        } catch (error) {
            dispatch({ type: CREATE_DRIVER_ERROR, payload: error.message });
        }
    };
};