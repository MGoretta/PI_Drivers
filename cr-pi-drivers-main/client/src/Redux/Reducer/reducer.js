// importar las actions-types

import { FETCH_DRIVERS } from "../Actions/actions";

// definir el initialState
let initialState = {
drivers: [],
};

// definir la función rootReducer
function rootReducer(state=initialState, action){
switch (action.type) {
    case FETCH_DRIVERS:
        return{
            ...state,
            drivers: action.payload
        }
    default:
        return state;
}
}

export default rootReducer;