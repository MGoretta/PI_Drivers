import axios from "axios";

export const FETCH_DRIVERS = "FETCH_DRIVERS";
export const GET_BY_NAME = "GET_BY_NAME";
export const ORDER_DOB = "ORDER_DOB";
export const CREATE_DRIVER_REQUEST = "CREATE_DRIVER_REQUEST";
export const CREATE_DRIVER_SUCCESS = "CREATE_DRIVER_SUCCESS";
export const CREATE_DRIVER_FAILURE = "CREATE_DRIVER_FAILURE";
export const FETCH_DRIVER_BY_ID = "FETCH_DRIVER_BY_ID";

export function fetchDrivers () {
  return async function (dispatch){
      try {
        const response = await axios.get("http://127.0.0.1:3001/drivers/");  
        return dispatch ({
          type: "FETCH_DRIVERS",
          payload: response.data,
        })
      } catch (error) {
          console.error("Error al cargar los drivers:", error);  
      }
  };
};

export function getByName (name) {
  return async function (dispatch){
      try {
        const response = await axios.get(`http://127.0.0.1:3001/drivers?name=${name}`);  
        return dispatch ({
          type: "GET_BY_NAME",
          payload: response.data,
        });
      } catch (error) {
          console.error("Error al cargar el driver:", error);  
      }
  };
};
export const fetchDriverById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3001/drivers/${id}`
      );
      const data = response.data;

      if (Array.isArray(data) && data.length > 0) {
        dispatch({
          type: "FETCH_DRIVER_BY_ID",
          payload: data[0][0],
        });
      } else if (typeof data === "object") {
        dispatch({
          type: "FETCH_DRIVER_BY_ID",
          payload: data,
        });
      } else {
        console.error("Error: Respuesta de servidor inesperada");
      }
    } catch (error) {
      console.error("Error al obtener detalles del conductor:", error);
    }
  };
};
export function setOrderDOB (direction) {
  return {
    type: "ORDER_DOB",
    payload: direction,
  };
};

export const createDriverRequest = (driverData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_DRIVER_REQUEST });
    try {
      await axios.post("http://127.0.0.1:3001/drivers", driverData);
      dispatch({ type: CREATE_DRIVER_SUCCESS });
    } catch (error) {
      dispatch({ type: CREATE_DRIVER_FAILURE, payload: error.message });
    }
  };
};
