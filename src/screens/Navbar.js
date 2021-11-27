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

export default function Navbar() {

  const { currentUser, logOutPostgres } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logOutPostgres();
    navigate("/signup", { replace: true });
  }
  return (
    <>
    
    <header>
      <div className="navbar" style={{position: 'relative'}}>
        <Link className="home-link" to="/" style={{position: 'absolute', left: '0'}}>
            <img
              className="logo1"
              alt="logo"
              src="https://cdn.dribbble.com/users/1611223/screenshots/6390568/36daysoftype_4x.jpg"
              width="50"
              height="90"
            />
        </Link>
        <button onClick={handleLogout} className="logout">
          LOG OUT
        </button>
        <Link className="home-link" to="/explore-events">
          Explore 
        </Link>
        <Link className="home-link" to="/create-event">
          Create Event
        </Link>
        <Link className="home-link" to="/update-profile">
          Update Profile
        </Link>
      </div>
    </header>
    </>
  )

}
