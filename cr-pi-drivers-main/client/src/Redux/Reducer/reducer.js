// importar las actions-types

import { 
  FETCH_DRIVERS, 
  GET_BY_NAME, 
  ORDER_DOB, 
  ORDER_NAME,
  FETCH_DRIVER_BY_ID, 
  CREATE_DRIVER_REQUEST, 
  CREATE_DRIVER_SUCCESS, 
  CREATE_DRIVER_FAILURE,
  FILTER,
  PAGINATE
} from "../Actions/actions";

// definir el initialState
let initialState = {
drivers: [],
driversCopy: [],
driver: {},
loading: false,
currentPage: 1,
driversPerPage: 9,
filteredDrivers: [],
error: null,
filter: {
  origin: "all",
  teams: "all",
},
selectedOrder: "name",
selectedDirection: "ASC",
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
            case CREATE_DRIVER_REQUEST:
              return {
                ...state,
                loading: true,
              };
            case CREATE_DRIVER_SUCCESS:
              return {
                ...state,
                loading: false,
                error: null,
              };
            case CREATE_DRIVER_FAILURE:
              return {
                ...state,
                loading: false,
                error: action.payload,
              };
              case ORDER_NAME:
      sortedDriversByName = sortDrivers(
        state.filteredDrivers,
        "name",
        action.payload
      );
      return {
        ...state,
        selectedOrder: "name",
        selectedDirection: action.payload,
        filteredDrivers: sortedDriversByName,
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