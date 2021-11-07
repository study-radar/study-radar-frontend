import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();

  // Hardcoded values for testing
  const [email, setEmail] = useState("studyradar@example.com");
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
  return (
    <>
      <div>
        <h2>Reset Password</h2>
        {message && <h3>{message}</h3>}
        {error && <h3>{error}</h3>}
        {/* Create form */}
        <button onClick={handleSubmit} disabled={loading}>
          Reset Password
        </button>
      </div>
      <Link to="/login" replace={true}>
        Log In
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
