import axios from "axios";

export const FETCH_DRIVERS = "FETCH_DRIVERS";
export const GET_BY_NAME = "GET_BY_NAME";
export const ORDER_DOB = "ORDER_DOB";
export const ORDER_NAME = "ORDER_NAME";
export const CREATE_DRIVER_REQUEST = "CREATE_DRIVER_REQUEST";
export const CREATE_DRIVER_SUCCESS = "CREATE_DRIVER_SUCCESS";
export const CREATE_DRIVER_FAILURE = "CREATE_DRIVER_FAILURE";
export const FETCH_DRIVER_BY_ID = "FETCH_DRIVER_BY_ID";
export const FILTER = "FILTER";
export const PAGINATE = "PAGINATE";
export const SEARCH_DRIVERS = "SEARCH_DRIVERS";

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
        const response = await axios.get(`http://localhost:3001/drivers?name=${name}`);  
        return dispatch ({
          type: "GET_BY_NAME",
          payload: response.data,
        });
      } catch (error) {
          console.error("Error al cargar el driver:", error);  
      }
  };
};

export const searchDriverByName = (name) => {
  return async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3001/drivers?name=${name}`
      );
      const { data } = response;

      if (!Array.isArray(data) || data.length === 0) {
        return null;
      }

      return data[0];
    } catch (error) {
      console.error("Error al buscar conductor por nombre:", error);
      return null;
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

export const createDriverRequest = (driverData) => {
  return async (dispatch) => {
    console.log("Datos del conductor a enviar al servidor:", driverData);
    dispatch({ type: "CREATE_DRIVER_REQUEST" });
    try {
      await axios.post("http://localhost:3001/drivers", driverData);
      dispatch({ type: "CREATE_DRIVER_SUCCESS" });
    } catch (error) {
      dispatch({ type: "CREATE_DRIVER_FAILURE", payload: error.message });
    }
  };
};

export const setOrderDob = (direction) => {
  return {
    type: "ORDER_DOB",
    payload: direction,
  };
};

export const setOrderName = (direction) => {
  return {
    type: "ORDER_NAME",
    payload: direction,
  };
};

export const setPage = (page, driversPerPage = 9) => {
  return {
    type: "PAGINATE",
    payload: { page, driversPerPage },
  };
};

export const setFilter = (filters) => {
  return {
    type: "FILTER",
    payload: filters,
  };
};

export const mergeDriversWithFilter = (
  filteredDrivers,
  newDrivers,
  selectedOrder,
  selectedDirection
) => {
  const mergedDrivers = [...filteredDrivers];
  newDrivers.forEach((driver) => {
    if (
      !filteredDrivers.some((existingDriver) => existingDriver.id === driver.id)
    ) {
      mergedDrivers.push(driver);
    }
  });
  return sortDrivers(mergedDrivers, selectedOrder, selectedDirection);
};

export const sortDrivers = (drivers, selectedOrder, selectedDirection) => {
  let sortedDrivers = [...drivers];
  if (selectedOrder === "name") {
    sortedDrivers.sort((a, b) => {
      const nameA = `${a.name?.forename || a.forename || ""} ${
        a.name?.surname || a.surname || ""
      }`;
      const nameB = `${b.name?.forename || b.forename || ""} ${
        b.name?.surname || b.surname || ""
      }`;
      const comparison = nameA.localeCompare(nameB);
      return selectedDirection === "ASC" ? comparison : -comparison;
    });
  } else if (selectedOrder === "dob") {
    sortedDrivers.sort((a, b) => {
      const dobA = new Date(a.dob);
      const dobB = new Date(b.dob);
      return selectedDirection === "ASC" ? dobA - dobB : dobB - dobA;
    });
  }
  return sortedDrivers;
};

export const searchDrivers = (name) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3001/drivers/driverByName/name?name=${name}`
      );
      const { data } = response;
      const currentState = getState();

      if (!Array.isArray(data) || data.length === 0) {
        return;
      }

      const filteredDrivers = data.filter((driver) => {
        return !currentState.drivers.some(
          (existingDriver) => existingDriver.id === driver.id
        );
      });

      if (filteredDrivers.length === 0) {
        return;
      }

      dispatch({
        type: "SEARCH_DRIVERS",
        payload: filteredDrivers,
      });
    } catch (error) {
      console.error("Error al buscar conductores:", error);
      alert("No drivers were found with that name. You can try creating one.");
    }
  };
};