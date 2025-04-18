import "./App.css";
import Navbar from "./components/Common/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home"
import OpenRoute from "./components/core/Auth/OpenRoute"
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import About from "./Pages/About";
import Contact from "./Pages/Contact"
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./Pages/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";








function App() {

  const { user } = useSelector((state) => state.profile)

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

        <Route
          path="update-password/:id"
          element={ 
             <OpenRoute>
               <UpdatePassword />
             </OpenRoute>
          }
        />


        <Route
          path="verify-email"
          element={ 
             <OpenRoute>
               <VerifyEmail/>
             </OpenRoute>
          }
        />
        
        <Route
          path="/about"
          element={
            
              <About />
            
          }
        />


    <Route path="/contact" element={<Contact />} />


    <Route 
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    >
  

    </Route>



     </Routes>


   </div>
  );
}

export default App;
