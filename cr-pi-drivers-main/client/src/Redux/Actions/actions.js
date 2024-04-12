import axios from "axios";

export const FETCH_DRIVERS = "FETCH_DRIVERS";
export const GET_BY_NAME = "GET_BY_NAME";

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