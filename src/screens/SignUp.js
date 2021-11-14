import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./SignUp.css";


export default function SignUp() {
  const { signUp, currentUser } = useAuth();

  // the string in useState refers to first var (e.g. email)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [major, setMajor] = useState("");
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

  function handleMajorChange(event) {
    setMajor(event.target.value);
  }

  // If already signed in, go to homepage and not show this page
  return currentUser ? (
    <Navigate to="/" replace={true} />
  ) : (
    <>
      <div className="title">
        <h2>REGISTER</h2>
      </div>
      <div className="subtitle">
        <h2>Choose Email and Password</h2>
      </div>
        {error && <h3 className="errorProp">{error}</h3>}
        {currentUser && currentUser.email}
          <form onSubmit={handleSubmit}>
            <div className="inputAndLabel">
                <label className="labelProp">
                  EMAIL
                </label>
                  <input 
                    className="inputProp"
                    type="email" 
                    value={email} 
                    onChange={handleEmailChange} 
                    placeholder="Enter your email"
                  />
                <br />
              <label className="labelProp">
              CREATE PASSWORD
            </label>
              <input
                className="inputProp"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
              />
            <br />
            <label className="labelProp">
              CONFIRM PASSWORD
            </label>
              <input
                className="inputProp"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirm your password"
              />
            <br />
            <label className="labelProp">
              MAJOR
            </label>
              <input
                // further change required
                className="inputProp"
                type="major"
                value={major}
                onChange={handleMajorChange}
                placeholder="Enter your major"
              />
            <br />
            </div>
              <button className="buttonProp" type="submit" disabled={loading} >REGISTER</button>
          </form>
      <div className="bottom">
        Already have an account?&nbsp;&nbsp;
        <Link className="login-link" to="/login" replace={true}>
          LOG IN HERE
          <br /><br /><br /><br />
        </Link>
      </div>
    </>
  );
}
