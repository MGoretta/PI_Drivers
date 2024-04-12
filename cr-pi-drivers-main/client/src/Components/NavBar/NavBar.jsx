import "./NavBar"

const NavBar = ({handleChange, handleSubmit}) => {
  return (
    <div>
      <h1>Esto es NavBar</h1>
      <form onChange={ handleChange }>
        <input placeholder="Búsqueda" type="search"/>
        <button type="submit" onClick={handleSubmit}>Buscar</button>
      </form>
    </div>
  )
}

export default NavBar
