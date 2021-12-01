import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate, Navigate } from "react-router-dom";
import "./SignUp.css";

export default function Login() {
  const { logInPostgres, currentUser } = useAuth();

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
      const {data, error}= await logInPostgres(email, password);

      if (data) {
        console.log("Successful log in");
        console.log(data);
        navigate("/", { replace: true });

      } else if (error) {
        console.log("Unsuccessful log in");
        // setError("Unsuccessful log in");
        setError(error || "Unsuccessful log in");
        // throw error;
      }

    } catch {
      // setError("Failed to log in");
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
      <div className="signup">
        <h2 className="title">LOG IN</h2>
        {/* {error && <h3 className="errorProp">{error}</h3>} */}
        {currentUser && currentUser.email}
        <form onSubmit={handleSubmit}>
          <label className="labelProp">EMAIL</label>
          <input
            className="inputProp"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />

          <br />
          <label className="labelProp">PASSWORD</label>
          <input
            className="inputProp"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <br />
          <h3 style={{ textAlign: 'center', color: 'red' }}>{error}</h3>
          <button className="submit" type="submit" disabled={loading}>
            LOG IN
          </button>
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
