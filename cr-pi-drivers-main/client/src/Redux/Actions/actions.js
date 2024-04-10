import axios from "axios";

export const FETCH_DRIVERS = "FETCH_DRIVERS"

export function fetchDrivers () {
    return async function (dispatch){
        try {
          const response = await axios("http://127.0.0.1:3001/drivers/");  
          return dispatch ({
            type: "FETCH_DRIVERS",
            payload: response
          })
        } catch (error) {
            console.error("Error al cargar los drivers:", error);  
        }
    };
};