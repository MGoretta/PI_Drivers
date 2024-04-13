import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchDrivers, getByName } from "../../Redux/Actions/actions";
import Cards from "../../Components/Cards/Cards";

const Home = () => {

    const dispatch = useDispatch();
    const drivers = useSelector((state) => state.drivers);
    const [searchString, setSearchString] = useState("");

    function handleChange (e) {
        e.preventDefault()
        setSearchString(e.target.value);
    }

    function handleSubmit (e){
        e.preventDefault()
        dispatch(getByName(searchString))
    }

    useEffect(()=>{
        dispatch(fetchDrivers());
    }, [dispatch]);

    return(
        <div>
            <p>Esto es Home</p>           
              <Cards drivers={drivers}/>
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