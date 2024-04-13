// importar las actions-types

import { FETCH_DRIVERS, GET_BY_NAME, ORDER_DOB, FETCH_DRIVER_BY_ID } from "../Actions/actions";

// definir el initialState
let initialState = {
drivers: [],
driversCopy: [],
driver: {},
};

// definir la función rootReducer
function rootReducer(state=initialState, action){
switch (action.type) {
    case FETCH_DRIVERS:
        return{
            ...state,
            drivers: action.payload,
            driversCopy: action.payload,
        };
    case GET_BY_NAME:
        return{
            ...state,
            drivers: action.payload,
        };
        case FETCH_DRIVER_BY_ID:
            return {
              ...state,
              driver: action.payload,
            };
        case ORDER_DOB:
            sortedDriversByDob = sortDrivers(
              state.filteredDrivers,
              "dob",
              action.payload
            );
            return {
              ...state,
              selectedOrder: "dob",
              selectedDirection: action.payload,
              filteredDrivers: sortedDriversByDob,
            };
        default:
        return state;
};
}

export default rootReducer;