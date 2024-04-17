import { useState } from "react";
import "./SearchBar";
import { useDispatch } from "react-redux";
import { getByName } from "../../Redux/Actions/actions";

export default function SearchBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const search = () => {
    if (name.trim() !== "") {
      dispatch(getByName(name));
      setName("");  
    }
  };

  return (
    <div className="searchBar">
      <input
        type="search"
        onChange={handleChange}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            search();
          }
        }}
        placeholder="Enter a name"
        value={name}
        className="searchInput"
      />
      <button className="searchButton" onClick={search}>
        Search
      </button>
    </div>
  );
}