import "./App.css";
import Navbar from "./components/Common/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home"



function App() {
  return (
   <div className="w-screen min-h-screen flex flex-col font-inter bg-richblack-900">

     {/* Navbar Component */}
     <Navbar/>

     <Routes>

        {/* Homepage route */}
        <Route path="/" element={<Home/>}/> 
        


     </Routes>


   </div>
  );
}

export default App;
