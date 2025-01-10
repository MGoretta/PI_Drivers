import { clusterDriversFilter } from "../Actions/actions.js";
import { sortDrivers } from "./helpers/sortUtils.js";
import { uniqueAndSortedDrivers } from "./helpers/driverUtils";

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

let initialState = {
    drivers: [],
    filteredDrivers: [],
    driver: {},
    loading: false,
    error: null,
    currentPage: 1,
    driversPerPage: 9,
    selectedOrder: "name",
    selectedDirection: "ASC",
    filter: {
        origin: "all",
        teams: "all",
    }
};

const rootReducer = (state = initialState, action) => {
    let searchFilteredDrivers;
    let searchOrderedFilteredDrivers;
    let sortedDriversByName;
    let sortedDriversByDob;
    let newDrivers;
    let clusteredDrivers;
    let filteredDrivers;

    switch (action.type) {
        case SEARCH_DRIVERS:
            const uniqueDrivers = uniqueAndSortedDrivers(
                state.drivers,
                action.payload,
                state.selectedOrder,
                state.selectedDirection
            );
            return {
                ...state,
                drivers: uniqueDrivers,
                filteredDrivers: uniqueDrivers
            };

        case FETCH_DRIVERS:
            if(state.drivers.length === 0){
                return {
                    ...state,
                    drivers: action.payload,
                    filteredDrivers: action.payload,
                    loading: false
                };
            } else {
                return{
                    ...state,
                    loading: false
                };
            };
        case RETRIEVE_DRIVER_BY_ID:
            return {
                ...state,
                driver: action.payload,
                loading: false,
                error: null
            };
        case PAGINATE:
            return {
                ...state,
                currentPage: action.payload.page,
                driversPerPage: action.payload.driversPerPage
            };
        case ORDER_BY_NAME:
            sortedDriversByName = sortDrivers(
                state.filteredDrivers,
                "name",
                action.payload
            );
            return {
                ...state,
                selectedOrder: "name",
                selectedDirection: action.payload,
                filteredDrivers: sortedDriversByName
            };
        case ORDER_BY_DOB:
            sortedDriversByDob = sortDrivers(
                state.filteredDrivers,
                "dob",
                action.payload
            );
            return {
                ...state,
                selectedOrder: "dob",
                selectedDirection: action.payload,
                filteredDrivers: sortedDriversByDob
            };
        case FILTER:
            const { teams, origin } = action.payload;
            
            if(teams !== "all") {
                filteredDrivers = state.drivers.filter((driver) => {
                    return (
                        driver && ((Array.isArray(driver?.Teams) &&
                        driver.Teams.some((team) => team.name === teams)) ||
                        (typeof driver.teams === "string" &&
                        driver.teams.split(", ").includes(teams)))
                    );
                });
            } else {
                filteredDrivers = state.drivers;
            }
            
            if(origin === "API") {
                filteredDrivers = filteredDrivers.filter((driver) => 
                driver && driver.driverRef);

            } else if (origin === "DB") {
                filteredDrivers = filteredDrivers.filter((driver) => 
                driver && !driver.driverRef);
            };
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
                    origin: action.payload.origin
                },
                filteredDrivers: filteredDrivers
            };
        case CREATE_DRIVER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case CREATE_DRIVER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case CREATE_DRIVER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    };
};

export default rootReducer;