import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import CalendarContainer from "../components/calendar/CalendarContainer";
import Calendar from "./Calendar";
import StudyGroupCardList from "../components/StudyGroupCardList";
import "./home.css";
import "./feed.css";
import StudyGroupCard from "../components/StudyGroupCard";
import apiClient from "../services/apiClient";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function Home() {
  const [error, setError] = useState("");

  const { currentUser, logOutPostgres } = useAuth();

  const navigate = useNavigate();

  var my_calendar = new Calendar();

  const [userGroups, setUserGroups] = useState([...groupsConstant])

  async function handleLogout() {
    setError("");
 
    try {
      await logOutPostgres();
      navigate("/signup", { replace: true });
    } catch {
      setError("Failed to logout");
    }
  }
  async function fetchGroupsForUser() {
    const { data, error } = await apiClient.getGroupsForUser()
    if (data) {
      console.log('groups for user');
      console.log(data);
      setUserGroups([...userGroups, ...data])
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
    fetchGroupsForUser
  }
  React.useEffect(()=>{
    fetchGroupsForUser()
  }, [])

  return !currentUser ? (
    <Navigate to="/signup" replace={true} />
  ) : (
    <div className="flex flex-col">
      <header>
        <div className="navbar">
          <button onClick={handleLogout} className="logout">
            LOG OUT
          </button>
          <Link className="home-link" to="/create-event">
            Create Event
          </Link>
          <Link className="home-link" to="/update-profile">
            Update Profile
          </Link>
        </div>
      </header>
      <body className="w-screen h-screen flex bg-indigo-400">
        <div className="wrap">
          <div className="w-full h-full bg-yellow-300 box">
            <div class="topnav">
              <div className="searchPrompt">
                Search for the study sessions you want to join:
              </div>
              <input type="text" placeholder="Search.." />
            </div>
            {/* <StudyGroupCardList /> */}
            {
            userGroups.map((group) => (
              <StudyGroupCard
                groupName={group.groupName}
                subject={group.subject}
                location={group.location}
                pictureURL={group.pictureURL}
                description={group.description}
                numAttendence={group.numAttendence}
                groupCreator={group.groupCreator}
                key={group.groupID}
              />
              ))
            }
          </div>
          <div className="container box">
            <CalendarContainer calendar={my_calendar} />
          </div>
        </div>
      </body>

      <Routes>
        
      </Routes>
    </div>
  );
}


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
