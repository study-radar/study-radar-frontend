import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./home.css";
import "./feed.css";

export default function Navbar() {
  const { logOutPostgres } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logOutPostgres();
    navigate("/signup", { replace: true });
  }
  return (
    <>
      <header>
        <div className="navbar" style={{ position: "relative" }}>
          <Link
            className="home-link"
            to="/"
            style={{ position: "absolute", left: "0" }}
          >
            <img
              className="logo1"
              alt="logo"
              src="icon.png"
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
  );
}
