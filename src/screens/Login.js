import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate, Navigate } from "react-router-dom";

export default function Login() {
  // TODO: Get rid of current user, shouldn't have current user
  const { logIn, currentUser } = useAuth();

  // Hardcoded values for testing
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return currentUser ? (
    <Navigate to="/" replace={true} />
  ) : (
    <>
      <div>
        <h2>Log In Page</h2>
        {error && <h3>{error}</h3>}
        {currentUser && currentUser.email}
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <br />
          <input type="submit" value="Log In" disabled={loading} />
        </form>
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
