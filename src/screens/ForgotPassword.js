import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

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
        <h2>Reset Password Page</h2>
        {message && <h3>{message}</h3>}
        {error && <h3>{error}</h3>}
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
          <br />
          <input type="submit" value="Reset Password" disabled={loading} />
        </form>
      </div>
      <Link to="/login" replace={true}>
        Go to Log In
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
