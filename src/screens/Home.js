import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import CalendarContainer from "../components/calendar/CalendarContainer";
import Calendar from "./Calendar";
import StudyGroupCardList from "../components/StudyGroupCardList";
import "./home.css";
import "./feed.css";

export default function Home() {
  const [error, setError] = useState("");

  const { currentUser, logOut } = useAuth();

  const navigate = useNavigate();

  var my_calendar = new Calendar();

  async function handleLogout() {
    setError("");

    try {
      await logOut();
      navigate("/signup", { replace: true });
    } catch {
      setError("Failed to logout");
    }
  }

  return (
    <div className="flex flex-col">
      <header>
        <div className="navbar">
          <button onClick={handleLogout} className="logout">
            LOG OUT
          </button>
          <Link className="home-link" to="/update-profile">
            Update Profile
          </Link>
        </div>
      </header>
      <body className="w-screen h-screen flex bg-indigo-400">
        <div className="w-full h-full bg-yellow-300">
          <StudyGroupCardList />
        </div>
        <div className="container">
          <CalendarContainer calendar={my_calendar} />
        </div>
      </body>
    </div>
  );
}
