import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
// import './App.css';
import Landing from "./Views/Landing/Landing";
import Home from "./Views/Home/Home";
import Detail from "./Views/Detail/Detail";
import Create from "./Views/Form/Create";

function App() {

  const { pathname } = useLocation();

  return (
    <div>
      {pathname !== "/" && <NavBar />}
        <Routes>
          <Route path="/" Component={Landing}/>
          <Route exact path="/home" Component={Home}/>
          <Route path="/home/:id" Component={Detail}/>
          <Route path="/create" Component={Create}/>
        </Routes>
    </div>     
  )
}

export default App
