import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import Navbar from "./Navbar";
import apiClient from "../services/apiClient";

export default function UpdateProfile() {
  const { updateUserPassword, updateUserEmail, currentUser } = useAuth();

  // Hardcoded values for testing
  const [email, setEmail] = useState(currentUser?.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [major, setMajor] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    // TODO: Test out edge cases, e.g. password is blank if they don't want to change
    if (password && password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    const credentials = {}
    credentials.email = email
    credentials.major = major 
    const {data, error} = await apiClient.updateUserInfo({
      info: 
        credentials
      
    })
    if(data){
      alert('success')
    }else if(error){
      setError(error)
      console.error(error);
    }

    // const promises = [];
    // setError("");
    // setLoading(true);
    // if (email && email !== currentUser.email) {
    //   promises.push(updateUserEmail(email));
    // }
    // if (password) {
    //   promises.push(updateUserPassword(password));
    // }
    // Promise.all(promises)
    //   .then(() => {
    //     navigate(-1);
    //   })
    //   .catch(() => {
    //     setError("Failed to update account");
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
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

  function handleMajorChange(event) {
    setMajor(event.target.value);
  }

  return (
    <>
      {/* <Navbar style={{position: 'relative ', top: '0'}}/> */}

      <div className="signup">
        <h2 className="title">UPDATE PROFILE</h2>
        {error && <h3>{error}</h3>}
        {currentUser && (
          <h2 className="subtitle">Current email: {currentUser.email}</h2>
        )}
        <form onSubmit={handleSubmit}>
          <label>EMAIL</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <br />
          <label>PASSWORD</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Leave blank to keep password"
          />
          <br />
          <label>CONFIRM PASSWORD</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <br />
          <label>MAJOR</label>
          <input
            // further change required
            type="major"
            value={major}
            onChange={handleMajorChange}
          />
        </form>
      <div className="submit-buttons">
        <button className="submit-buttons-button" onClick={handleGoBack} type="submit" >CANCEL</button>
        <button className="submit-buttons-button" onClick={handleGoBack} type="submit" >SAVE</button>
      </div>
      </div>
    </>
  );
}
