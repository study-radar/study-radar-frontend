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
import Navbar from "./Navbar";

export default function Home(props) {
  const {userGroups, setUserGroups, groups, setGroups, fetchGroups, fetchGroupsForUser} = props


  const { currentUser, logOutPostgres } = useAuth();

  const navigate = useNavigate();

  var my_calendar = new Calendar();

  const [searchedUserGroups, setSearchedUserGroups] = useState([])
  const [searching, setSearching] = useState(false)

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
      await logOutPostgres();
      navigate("/signup", { replace: true });
  }
  async function handleRefreshUserGroups(){
    fetchGroupsForUser()

  }
  function filterUserGroups(e){
    setSearching(!!e.target.value)
    
    setSearchedUserGroups(userGroups.filter(el => (el.name.startsWith(e.target.value))))
  }

  const _props = {
    userGroups,
    setUserGroups,
    groups,
    setGroups,

    fetchGroups,
    fetchGroupsForUser
  }
  React.useEffect(()=>{
    fetchGroupsForUser()
  }, [])

  return !currentUser ? (
    <Navigate to="/signup" replace={true} />
  ) : (
    <div className="signup flex flex-col">
      <Navbar/>
      <body className="w-screen h-screen flex bg-indigo-400">
        <div className="wrap">
          <div className="w-full h-full bg-yellow-300 box">
            <div class="topnav" style={{display: 'relative'}}>
              <RefreshButton style={{display: 'absolute'}} onClick={handleRefreshUserGroups}>Refresh</RefreshButton>
              <div className="searchPrompt">
                Search for the study sessions you want to join:
              </div>
              <input type="text" placeholder="Search.." onChange={filterUserGroups} />
            </div>
            {/* <StudyGroupCardList /> */}
            {
            (searching ? searchedUserGroups : userGroups).map((group) => {
              // console.log(group);
              return <StudyGroupCard
                id={group.id}
                name={group.name}
                subject={group.subject}
                location={group.location}
                imgurl={group.imgurl}
                description={group.description}
                numAttendence={group.users.length}
                capacity={group.capacity}
                created_by={group.created_by}
                key={group.groupID}
                {..._props}
              />
              })
            }
          </div>
          <div className="container box">
            <CalendarContainer {..._props} calendar={<Calendar  />} />
          </div>
        </div>
      </body>

      <Routes>
        
      </Routes>
    </div>
  );
}


