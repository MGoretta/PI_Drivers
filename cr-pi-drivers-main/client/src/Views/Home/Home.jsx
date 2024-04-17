import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDrivers, setFilter, setPage } from "../../Redux/Actions/actions";
import Cards from "../../Components/Cards/Cards";
import Filter from "../../Components/Filter/Filter";
import "./Home.css";

const Home = () => {

    const dispatch = useDispatch();
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState (true);
    const filterStateGlobal = useSelector((state)=>state.filter);
    const [filterstate, setFilterstate] = useState (filterStateGlobal);
    const filteredDrivers = useSelector((state)=>state.filteredDrivers);
    const currentPage = useSelector((state)=> state.currentPage);
    const driversPerPage = useSelector((state)=>state.driversPerPage);

    useEffect(() => {
        fetch("http://localhost:3001/teams")
          .then((response) => response.json()) 
          .then((data) => setTeams(data))
          .catch((error) => console.log("Error al traer los equipos:", error));
      }, []);
      

    useEffect(()=>{
        const pageBeforeFilter = currentPage;
        dispatch(setFilter(filterstate));
        const totalPagesAfterFilter = Math.ceil(
            filteredDrivers.length / driversPerPage
        );
        if (totalPagesAfterFilter === 0){
            return;
        }
        if (pageBeforeFilter > totalPagesAfterFilter) {
          dispatch(setPage(totalPagesAfterFilter));
        }
    },[
        dispatch,
        filterstate,
        driversPerPage,
        filteredDrivers.length,
        currentPage,
    ]);

    useEffect(()=> {
        dispatch(fetchDrivers())
        .then(()=>setLoading(false))
        .catch((error)=>
    console.log("error de carga de drivers", error))
    }, [dispatch]);

    const handleFilter = (filterData) => {
        setFilterstate(filterData);
    };

    return(
        <div>
            <Filter teams={teams} handleFilter={handleFilter} />
            {loading ? (
      <p>Loading...</p>
    ) : (     
        <Cards
        drivers={filteredDrivers.slice(
          (currentPage - 1) * driversPerPage,
          currentPage * driversPerPage
        )}
      />
    )}
    {parseInt(filteredDrivers.length) !== 0 && (
      <div className="homePagination">
        <button
          onClick={() => dispatch(setPage(1))}
          disabled={currentPage === 1}
          className="homePaginationButton"
        >
          First
        </button>
        <button
          onClick={() => dispatch(setPage(currentPage - 1))}
          disabled={currentPage === 1}
          className="homePaginationButton"
        >
          Previous
        </button>
        <span className="homePaginationsSpan">{currentPage}</span>
        <button
          onClick={() => dispatch(setPage(currentPage + 1))}
          disabled={currentPage * driversPerPage >= filteredDrivers.length}
          className="homePaginationButton"
        >
          Next
        </button>
        <button
          onClick={() =>
            dispatch(
              setPage(Math.ceil(filteredDrivers.length / driversPerPage))
            )
          }
          disabled={currentPage * driversPerPage >= filteredDrivers.length}
          className="homePaginationButton"
        >
          Last
        </button>
      </div>
    )}
        </div>
    )
}

export default Home;

    // const [filtered, setFiltered] = useState(drivers);
    // const [searchString, setSearchString] = useState("");

    // function handleChange (e) {
    //     e.preventDefault()
    //     setSearchString(e.target.value)
    // }

    // function handleSubmit(e){
    //     e.preventDefault();
    //     const filtered = drivers.filter((driver)=>
    //     // driver.name.includes(searchString)
    //     )
    //     setFiltered(filtered);
    // };