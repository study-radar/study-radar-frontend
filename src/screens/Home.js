import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./home.css";

export default function Home() {
  const [error, setError] = useState("");

  const { currentUser, logOut } = useAuth();

  const navigate = useNavigate();

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
    <>
      <header>
        <div className="navbar">
          <button onClick={handleLogout}>LOG OUT</button>
          <Link className="home-link" to="/update-profile">Update Profile</Link> 
          <Link className="home-link" to="/calendar">Calendar</Link>
        </div>
      </header>
      <body>
        <h3>Email: {currentUser.email}</h3>
        {error && <h3>{error}</h3>}
        <br />
      </body>
    </>
  );
}
