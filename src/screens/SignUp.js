import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, Navigate } from "react-router-dom";

export default function SignUp() {
  // TODO: Get rid of current user, shouldn't have current user
  const { signUp, currentUser } = useAuth();

  // Hardcoded values for testing
  const [email, setEmail] = useState("studyradar@example.com");
  const [password, setPassword] = useState("Password1234");
  const [confirmPassword, setConfirmPassword] = useState("Password1234");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signUp(email, password);
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }
  return currentUser ? (
    <Navigate to="/" replace={true} />
  ) : (
    <>
      <div>
        <h2>Sign Up</h2>
        {error && <h3>{error}</h3>}
        {currentUser && currentUser.email}
        {/* Create form */}
        <button onClick={handleSubmit} disabled={loading}>
          Create Account
        </button>
      </div>
      <div>
        Already have an account?{" "}
        <Link to="/login" replace={true}>
          Log In
        </Link>
      </div>
    </>
  );
}
