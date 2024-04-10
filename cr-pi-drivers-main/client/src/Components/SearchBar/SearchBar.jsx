import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchDrivers } from "../../Redux/Actions/actions"

const SearchBar = () => {

    const dispatch = useDispatch();

    const [state, setState] = useState("");

    const handleChange = (event) => {
        setState(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(searchDrivers(state))
    }

    return (
        <div>
            <form>onSubmit={handleSubmit} 
            <input onChange= {handleChange} type="text"/>
            <input type="submit"/>
            </form>
        </div>
    )
}

export default SearchBar;
