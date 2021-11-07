import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate, Navigate } from "react-router-dom";

export default function Login() {
  // TODO: Get rid of current user, shouldn't have current user
  const { logIn, currentUser } = useAuth();

  // Hardcoded values for testing
  const [email, setEmail] = useState("studyradar@example.com");
  const [password, setPassword] = useState("Password1234");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await logIn(email, password);
      navigate("/", { replace: true });
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }
  return currentUser ? (
    <Navigate to="/" replace={true} />
  ) : (
    <>
      <div>
        <h2>Log In</h2>
        {error && <h3>{error}</h3>}
        {currentUser && currentUser.email}
        {/* Create form */}
        <button onClick={handleSubmit} disabled={loading}>
          Log In
        </button>
      </div>
      <Link to="/forgot-password" m replace={true}>
        Forgot password?
      </Link>
      <div>
        Need an account?{" "}
        <Link to="/signup" replace={true}>
          Sign Up
        </Link>
      </div>
    </>
  );
}
