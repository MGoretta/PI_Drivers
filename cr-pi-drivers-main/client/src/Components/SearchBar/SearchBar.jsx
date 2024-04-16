import { useState } from "react";
import "./SearchBar";
import { useDispatch } from "react-redux";
import { getByName } from "../../Redux/Actions/actions";

export default function SearchBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault()
    setName(event.target.value);
  };

  const search = (event) => {
    event.preventDefault()
      dispatch(getByName(name));
      setName("");  
  };

  return (
    <div className="searchBar">
      <form onSubmit={search}>
            <input
              type="text"
              placeholder="Enter a name"
              value={name}
              onChange={handleChange}
              className="searchInput"
            />
            <button type="submit" className="searchButton">
              Search
            </button>
          </form>
    </div>
  );
}