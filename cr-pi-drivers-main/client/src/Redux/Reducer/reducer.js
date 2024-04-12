// importar las actions-types

import { FETCH_DRIVERS, GET_BY_NAME } from "../Actions/actions";

// definir el initialState
let initialState = {
drivers: [],
driversCopy: [],
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
        default:
        return state;
};
}

export default rootReducer;