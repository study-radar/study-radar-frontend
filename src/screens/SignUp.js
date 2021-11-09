import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./SignUp.css";

export default function SignUp() {
  const { signUp, currentUser } = useAuth();

  // Hardcoded values for testing
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signUp(email, password);
      navigate("/", { replace: true });
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
  }

  // If already signed in, go to homepage and not show this page
  return currentUser ? (
    <Navigate to="/" replace={true} />
  ) : (
    <>
      <div className="title">
        <h2>REGISTER</h2>
        <div className="subtitle">
          <h2>Choose Email and Password</h2>
        </div>
        {error && <h3>{error}</h3>}
        {currentUser && currentUser.email}
        <div className="body">
        <form onSubmit={handleSubmit}>
          <label>
            EMAIL
          </label>
            <input type="email" value={email} onChange={handleEmailChange} />
          <br />
          <label>
            CREATE PASSWORD
          </label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          <br />
          <label>
            CONFIRM PASSWORD
          </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          <br />
          <label>
            MAJOR
          </label>
            <input
              // further change required
              // type="password"
              // value={confirmPassword}
              // onChange={handleConfirmPasswordChange}
            />
          <br />
            <button type="submit" disabled={loading} >REGISTER</button>
        </form>
        </div>
      </div>
      <div className="bottom">
        Already have an account?&nbsp;&nbsp;
        <Link className="login-link" to="/login" replace={true}>
          LOG IN HERE
        </Link>
      </div>
    </>
  );
}
