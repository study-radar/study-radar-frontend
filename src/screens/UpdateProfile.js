import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const { updateUserPassword, updateUserEmail, currentUser } = useAuth();

  // Hardcoded values for testing
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // TODO: Test out edge cases, e.g. password is blank if they don't want to change
    if (password && password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setError("");
    setLoading(true);
    if (email && email !== currentUser.email) {
      promises.push(updateUserEmail(email));
    }
    if (password) {
      promises.push(updateUserPassword(password));
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

  function handleGoBack() {
    navigate(-1);
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

  return (
    <>
      <div>
        <h2>Update Profile Page</h2>
        {error && <h3>{error}</h3>}
        {currentUser && <h2>Current email: {currentUser.email}</h2>}
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Leave blank to keep password"
            />
          </label>
          <br />
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </label>
          <br />
          <input type="submit" value="Update Account" disabled={loading} />
        </form>
      </div>
      <div>
        <button onClick={handleGoBack}>Cancel</button>
      </div>
    </>
  );
}
