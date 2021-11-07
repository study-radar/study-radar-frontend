import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { sendEmailVerification } from "@firebase/auth";

export default function UpdateProfile() {
  const { signUp, updatePassword, updateEmail, currentUser } = useAuth();

  // Hardcoded values for testing
  const [email, setEmail] = useState("studyradar@example.com");
  const [password, setPassword] = useState("Password1234");
  const [confirmPassword, setConfirmPassword] = useState("Password1234");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // TODO: Test out edge cases, e.g. password is blank if they don't want to change
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setError("");
    setLoading(true);
    if (email !== currentUser.email) {
      promises.push(updateEmail(email));
    }
    if (password) {
      promises.push(updatePassword(password));
    }
    Promise.all(promises)
      .then(() => {
        navigate(-1);
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return currentUser ? (
    <Navigate to="/" replace={true} />
  ) : (
    <>
      <div>
        <h2>Update Profile</h2>
        {error && <h3>{error}</h3>}
        {currentUser && currentUser.email}
        {/* Create form */}
        <button onClick={handleSubmit} disabled={loading}>
          Update Password
        </button>
      </div>
      <div>
        Already have an account?
        {/* Maybe replace with a button and use navigate() */}
        <Link to="/" replace={true}>
          Go Back
        </Link>
      </div>
    </>
  );
}
