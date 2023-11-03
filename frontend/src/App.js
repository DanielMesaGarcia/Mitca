import { Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css';
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Signin from "./pages/Signin/Signin";
function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;