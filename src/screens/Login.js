import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate, Navigate } from "react-router-dom";
import "./SignUp.css";
import apiClient from "../services/apiClient";

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
      // await logIn(email, password);
      const {data, error} = await apiClient.loginUser({
        email, password
      })
      if (data){
        // localStorage.setItem('studyradar', data.token)
        apiClient.setToken(data.token)
      }else if(error){
        return setError(data.error)
      }
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
        <h2 className="title">LOG IN</h2>
        {error && <h3 className="errorProp">{error}</h3>}
        {currentUser && currentUser.email}
        <form onSubmit={handleSubmit}>
          <label className="labelProp">
            EMAIL
            </label>
            <input 
              className = "inputProp"
              type="email" 
              value={email} 
              onChange={handleEmailChange} />
          
          <br />
          <label className="labelProp">
          PASSWORD
          </label>
            <input
              className = "inputProp"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          <br />
        <button className="submit" type="submit" disabled={loading} >LOG IN</button>
        </form>
      </div>
      <div className="bottom">
        <Link className="login-link" to="/forgot-password" m replace={true}>
          Forgot password?
        </Link>
        <br />
        Need an account?{" "}
        <Link className="login-link" to="/signup" replace={true}>
          Sign Up
        </Link>
      </div>
    </>
  );
}
