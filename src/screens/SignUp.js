import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./SignUp.css";
import apiClient from "../services/apiClient";


export default function SignUp() {
  const { signUp, currentUser, setCurrentUser } = useAuth();

  

  // the string in useState refers to first var (e.g. email)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [major, setMajor] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // React.useEffect(()=>{
  //   if(currentUser?.email){
  //     navigate('/')
  //   }
  // }, [currentUser])

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    setError("");
    setLoading(true);
    // await signUp(email, password);

    const {data, error}= await apiClient.signUpUser({
      email,
      password
    })
    console.log('data');
    console.log(data);
    if (data) {
      console.log('good');
      console.log(data);

      // localStorage.setItem('studyradar', data.data.token)
      apiClient.setToken(data.token)

    }
    else if (error) {
      console.log('bad');
      console.log('erorr',error);
      return setError(error)
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
    <>
      <h2 className="title">REGISTER</h2>
      <h2 className="subtitle">Choose Email and Password</h2>
      {/* {error && <h3>{error}</h3>} */}
      {currentUser && currentUser.email}
      <form onSubmit={handleSubmit}>
        <div className="inputAndLabel">
          <label>
            EMAIL
          </label>
            <input 
              type="email" 
              value={email} 
              onChange={handleEmailChange} 
              placeholder="Enter your email"
            />
          <br />
          <label>
            CREATE PASSWORD
          </label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
            />
          <br />
          <label>
            CONFIRM PASSWORD
          </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm your password"
            />
          <br />
          <label>
            MAJOR
          </label>
          <input
            // further change required
            type="major"
            value={major}
            onChange={handleMajorChange}
            placeholder="Enter your major"
          />
        <br />
        </div>
        <p style={{color: 'red', textAlign: 'center'}}>{ error }</p>
        {/* <button className="submit" type="submit" disabled={loading} >REGISTER</button> */}
        <button className="submit" type="submit"  >REGISTER</button>
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
