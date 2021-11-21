import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import "./SignUp.css";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();

  // Hardcoded values for testing
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await resetPassword(email);
      setMessage("Check your inbox for reset instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  return (
    <>
      <div>
        <h2 className="title">RESET PASSWORD</h2>
        {message && <h3 className="errorProp">{message}</h3>}
        {error && <h3 className="errorProp">{error}</h3>}
        <form onSubmit={handleSubmit}>
        <label className="labelProp">
            EMAIL
          </label>
          <input 
            className="inputProp"
            type="email" 
            value={email} 
            onChange={handleEmailChange} />
          <br />
          <button className="submit" type="submit" disabled={loading} >RESET</button>
        </form>
      </div>
      <div className="bottom">
        Go to&nbsp;
        <Link className="login-link" to="/login" replace={true}>
          Log In
        </Link>
        <div>
          Need an account?{" "}
          <Link className="login-link" to="/signup" replace={true}>
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}
