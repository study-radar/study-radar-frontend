//import Landingpage from "./components/Landingpage";
//import Navbar from "./components/Navbar";
import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { Container } from "react-bootstrap"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Calendar from "./screens/Calendar";
import ForgotPassword from "./screens/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";
import UpdateProfile from "./screens/UpdateProfile";

// import "./screens/SignUp.css";
// import "./screens/Calendar.css";

function App() {
  return (
    
    // <div className="App">
    //   <Navbar />
    //   <Landingpage />
    // </div>
    
    // <Container
      // className="d-flex align-items-center justify-content-center"
      // style={{minHeight: "100vh"}}
    // >
    /* <div className="w-100"> */
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="update-profile"
            element={
              <PrivateRoute>
                <UpdateProfile />
              </PrivateRoute>
            }
          />
          <Route 
            path="signup" 
            element={
                <SignUp />
            } 
          />
          <Route 
            path="login" 
            element={
                <Login />
            } 
          />
          <Route 
            path="calendar" 
            element={
              <div id="schedule">
                <Calendar />
              </div>
              
            } 
          />
          <Route 
            path="forgot-password" 
            element={
                <ForgotPassword />
            } 
          />
        </Routes>
      </AuthProvider>
    </Router>
    /* </div> */
    // </Container>
    );
 
}

export default App;
