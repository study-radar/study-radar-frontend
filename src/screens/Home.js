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
import styled from 'styled-components'

export default function Home(props) {
  const {userGroups, fetchGroups, fetchGroupsForUser} = props

  const [error, setError] = useState("");

  const { currentUser, logOutPostgres } = useAuth();

  const navigate = useNavigate();

  var my_calendar = new Calendar();

  const RefreshButton = styled('button')`
     /* background: white;
     border: 1px solid black;
     margin: 5px; */
       background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 5px 2px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  display: absolute;
  `


  async function handleLogout() {
    setError("");
 
    try {
      await logOutPostgres();
      navigate("/signup", { replace: true });
    } catch {
      setError("Failed to logout");
    }
  }
  async function handleRefreshUserGroups(){
    fetchGroupsForUser()

  }

  const _props = {
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
              <RefreshButton onClick={handleRefreshUserGroups}>Refresh</RefreshButton>
              <div className="searchPrompt">
                Search for the study sessions you want to join:
              </div>
              <input type="text" placeholder="Search.." />
            </div>
            {/* <StudyGroupCardList /> */}
            {
            userGroups.map((group) => {
              console.log(group);
              return <StudyGroupCard
                name={group.name}
                subject={group.subject}
                location={group.location}
                pictureURL={group.pictureURL}
                description={group.description}
                numAttendence={group.numAttendence}
                groupCreator={group.groupCreator}
                key={group.groupID}
              />
              })
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


