import { Routes, Route } from "react-router-dom";

import './App.css';
import NavBar from "./Components/NavBar/NavBar";
import Landing from "./Views/Landing/Landing";
import Home from "./Views/Home/Home";
import Detail from "./Views/Detail/Detail";
import Create from "./Views/Form/Create";

function App() {
  
  return (
    <div>
      <NavBar/>
        <Routes>
          <Route path="/" Component={Landing}/>
          <Route path="/home" Component={Home}/>
          <Route path="/detail/:id" Component={Detail}/>
          <Route path="/create" Component={Create}/>
        </Routes>
    </div>     
  )
}

export default App
