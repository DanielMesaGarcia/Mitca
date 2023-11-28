import { Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css';
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Signin from "./pages/Signin/Signin";
import RaceData from "./pages/RaceData/RaceData";
import RunnersPage from "./pages/Runners/Runners";
import SponsorsPage from "./pages/Sponsors/Sponsors";
import UserSettings from "./pages/userSettings/UserSettings";
import RunnersCRUDuser from "./pages/Runners/RunnerCRUDuser";
function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/racedata/:id" element={<RaceData/>}/>
        <Route path="/runners/:id" element={<RunnersPage/>}/>
        <Route path="/sponsors/:id" element={<SponsorsPage/>}/>
        <Route path="/usersettings" element={<UserSettings/>}/>
        <Route path="/runners" element={<RunnersCRUDuser/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;