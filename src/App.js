//import Landingpage from "./components/Landingpage";
//import Navbar from "./components/Navbar";
import React from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Container } from "react-bootstrap"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Calendar from "./screens/Calendar";
import ForgotPassword from "./screens/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";
import UpdateProfile from "./screens/UpdateProfile";

import apiClient from "./services/apiClient";
import CreateEvent from "./screens/CreateEvent";
import EventImage from "./components/EventImage";

// import "./screens/SignUp.css";
// import "./screens/Calendar.css";

function App() {
  const [userGroups, setUserGroups] = React.useState([...groupsConstant])

  async function fetchGroupsForUser() {
    const { data, error } = await apiClient.getGroupsForUser()
    if (data) {
      console.log('groups for user');
      console.log(data);
      // setUserGroups([...userGroups, ...data])
    } else if (error) {
      console.error(error);
    }
  }
  async function fetchGroups() {
    const { data, error } = await apiClient.getAllGroups()
    if (data) {
      console.log('groups');
      console.log(data);
    } else if (error) {
      console.error(error);
    }
  }
  const props = {
    userGroups,
    fetchGroups,
    fetchGroupsForUser,
  }
  React.useEffect(() => {
    fetchGroupsForUser()
  }, [])


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
                <Home />
            }
          />
          <Route
            path="update-profile"
            element={
                <UpdateProfile />
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
          <Route path="create-event"
            element={<CreateEvent {...props} />}
            />
          <Route path="event-image/:id"
            element={<EventImage />}
            />
        </Routes>
      </AuthProvider>
    </Router>
    /* </div> */
    // </Container>
    );
 
}

export default App;

const _groupsConstant = []
const groupsConstant = [
  {
    groupName: "Final Review Session",
    groupID: 0,
    subject: "CS 35L",
    location: "Royce Hall",
    pictureURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/2019_UCLA_Royce_Hall_2.jpg/1600px-2019_UCLA_Royce_Hall_2.jpg",
    description: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
            illo inventore veritatis et quasi architecto beatae vitae dicta sunt
            explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
            odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt.`,
    numAttendence: 5,
    groupCreator: "Bryson",
  },
  {
    groupName: "Random Study Session",
    groupID: 1,
    subject: "CS M51A",
    location: "Young Research Library",
    pictureURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2019_UCLA_Charles_E._Young_Research_Library.jpg/600px-2019_UCLA_Charles_E._Young_Research_Library.jpg",
    description: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
            illo inventore veritatis et quasi architecto beatae vitae dicta sunt
            explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
            odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt.`,
    numAttendence: 5,
    groupCreator: "Bryson",
  },
];
