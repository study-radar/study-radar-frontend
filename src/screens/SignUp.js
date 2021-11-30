import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./SignUp.css";

export default function SignUp() {
  const { signUpPostgres, currentUser } = useAuth();

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
      // await signUp(email, password);
      const data = await signUpPostgres(email, password, major);

      if (data.data) {
        console.log("Successful sign up");
        console.log(data.data);
      } else if (data.error) {
        console.log("Unsuccessful sign up");
        setError("Unsuccessful sign up");
        throw error;
      }

      navigate("/", { replace: true });
    } catch (signUpError) {
      setError("Failed to create an account");
    }

    navigate("/", { replace: true });
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
    <div className="signup">
      <h2 className="title">REGISTER</h2>
      <h2 className="subtitle">Choose Email and Password</h2>
      {error && <h3>{error}</h3>}
      {currentUser && currentUser.email}
      <form onSubmit={handleSubmit}>
        <div className="inputAndLabel">
          <label>EMAIL</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
          />
          <br />
          <label>CREATE PASSWORD</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
          />
          <br />
          <label>CONFIRM PASSWORD</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm your password"
          />
          <br />
          <label>MAJOR</label>
          <input
            // further change required
            type="major"
            value={major}
            onChange={handleMajorChange}
            placeholder="Enter your major"
          />
          <br />
        </div>
        <button className="submit" type="submit" disabled={loading}>
          REGISTER
        </button>
      </form>
      <div className="bottom">
        Already have an account?&nbsp;&nbsp;
        <Link className="login-link" to="/login" replace={true}>
          LOG IN HERE
          <br />
          <br />
          <br />
          <br />
        </Link>
      </div>
    </div>
  );
}
