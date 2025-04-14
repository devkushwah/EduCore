import "./App.css";
import Navbar from "./components/Common/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home"
import OpenRoute from "./components/core/Auth/OpenRoute"
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";




function App() {
  return (
   <div className="w-screen min-h-screen flex flex-col font-inter bg-richblack-900">

     {/* Navbar Component */}
     <Navbar/>

     <Routes>

        {/* Homepage route */}
        <Route path="/" element={<Home/>}/> 

           {/* Login Page Route */}
           <Route
          path="login"
          element={
            
              <OpenRoute>
                <Login />
              </OpenRoute>
                
          }
         />

          {/* SignUp Page Route */}
        <Route
          path="signup"
          element={ 
             <OpenRoute>
               <Signup />
             </OpenRoute>
          }
        />

        <Route
          path="forgot-password"
          element={ 
             <OpenRoute>
               <ForgotPassword />
             </OpenRoute>
          }
        />
        


     </Routes>


   </div>
  );
}

export default App;
