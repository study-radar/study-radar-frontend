import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

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
      <button onClick={handleLogout}>Log Out</button>
    </>
  );
}