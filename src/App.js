import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";
import Login from "./screens/Login";
import ForgotPassword from "./screens/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";
import UpdateProfile from "./screens/UpdateProfile";
import CreateEvent from "./screens/CreateEvent";
import ExploreEvents from "./screens/ExploreEvents";
import UserGroupProvider from "./contexts/UserGroupContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserGroupProvider>
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
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            {/* <Route
              path="calendar"
              element={
                <div id="schedule">
                  <Calendar />
                </div>
              }
            /> */}
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route
              path="create-event"
              element={
                <PrivateRoute>
                  <CreateEvent />
                </PrivateRoute>
              }
            />
            <Route
              path="explore-events"
              element={
                <PrivateRoute>
                  <ExploreEvents />
                </PrivateRoute>
              }
            />
          </Routes>
        </UserGroupProvider>
      </AuthProvider>
    </Router>
    /* </div> */
    // </Container>
  );
}

export default App;
