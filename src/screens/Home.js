import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
// import Navbar from "../components/Navbar";
import StudyGroupCard from "../components/StudyGroupCard";

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
      <div>Home</div>
      <h3>Email: {currentUser.email}</h3>
      {error && <h3>{error}</h3>}
      <Link to="/update-profile">Update Profile</Link>
      <br />
      <button onClick={handleLogout}>Log Out</button>
      <br />
      <br />
      <br />
      <br />

      {/* <Navbar /> Here for now just for debugging */}
      {/* To fill up the screen */}
      <div className="w-screen h-screen flex bg-indigo-400">
        <div className="w-full h-full bg-yellow-300">
          <StudyGroupCard />
        </div>
        <div className="w-full h-full bg-blue-400"></div>
      </div>
    </>
  );
}
