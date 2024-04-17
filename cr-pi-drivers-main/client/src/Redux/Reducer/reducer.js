import { mergeDriversWithFilter, sortDrivers } from "../Actions/actions";

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
  PAGINATE,
  SEARCH_DRIVERS,
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
  let filteredDriversSearch;
  let orderedFilteredDriversSearch;
  let newDrivers;
  let mergedDrivers;
  let sortedDriversByName;
  let sortedDriversByDob;
  let filteredDrivers;
  
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

                 case SEARCH_DRIVERS:
      filteredDriversSearch = action.payload.filter((driver) =>
        state.drivers.every((existingDriver) => existingDriver.id !== driver.id)
      );
      orderedFilteredDriversSearch = sortDrivers(
        filteredDriversSearch,
        state.selectedOrder,
        state.selectedDirection
      );
      newDrivers = [
        ...orderedFilteredDriversSearch.filter(
          (driver) =>
            !state.drivers.some(
              (existingDriver) => existingDriver.id === driver.id
            )
        ),
        ...state.drivers,
      ];
      mergedDrivers = mergeDriversWithFilter(
        state.filteredDrivers,
        newDrivers,
        state.selectedOrder,
        state.selectedDirection
      );
      return {
        ...state,
        drivers: newDrivers,
        filteredDrivers: mergedDrivers,
      };

      case PAGINATE:
      return {
        ...state,
        currentPage: action.payload.page,
        driversPerPage: action.payload.driversPerPage,
      };

      case FILTER:
      const { teams, origin } = action.payload;

      if (teams !== "all") {
        filteredDrivers = state.drivers.filter((driver) => {
          return (
            driver &&
            ((Array.isArray(driver?.Teams) &&
              driver.Teams.some((team) => team.name === teams)) ||
              (typeof driver.teams === "string" &&
                driver.teams.split(", ").includes(teams)))
          );
        });
      } else {
        filteredDrivers = state.drivers;
      }

      if (origin === "API") {
        filteredDrivers = filteredDrivers.filter(
          (driver) => driver && driver.driverRef
        );
      } else if (origin === "DB") {
        filteredDrivers = filteredDrivers.filter(
          (driver) => driver && !driver.driverRef
        );
      }

      filteredDrivers = sortDrivers(
        filteredDrivers,
        state.selectedOrder,
        state.selectedDirection
      );

      return {
        ...state,
        filter: {
          ...state.filter,
          teams: action.payload.teams,
          origin: action.payload.origin,
        },
        filteredDrivers: filteredDrivers,
      };
            
        default:
        return state;
};
}

export default rootReducer;