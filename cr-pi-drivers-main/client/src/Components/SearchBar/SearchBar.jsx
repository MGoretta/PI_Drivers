import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { searchDrivers } from "../../Redux/Actions/actions";
import './SearchBar.css';

const SearchBar = () => {
    const [name, setName] = useState("");
    const dispatch = useDispatch();

    const handleSearch = useCallback(() => {
        if(name.trim() !== ""){
            console.log("Nombre buscado:", name);
            dispatch(searchDrivers(name))
            .then(response => {
                console.log("Respuesta del backend:", response);
            })
            .catch(error => {
                console.error("Error al buscar drivers:", error);
            });
            setName("");
        }
    }, [name, dispatch]);

    const handleChange = (event) => {
        setName(event.target.value);
        console.log("Nombre ingresado:", event.target.value);
    };

    return (
        <div className="searchBar">
            <input
            type="search"
            onChange={handleChange}
            onKeyPress={(e) => {
                if(e.key === 'Enter'){
                    handleSearch();
                }
            }}
            placeholder="Ingrese el nombre de un conductor"
            value={name}
            className="searchInput"
            />
            <button className="searchButton" onClick={handleSearch}>
                Buscar
            </button>
        </div>
    );
};

export default SearchBar;