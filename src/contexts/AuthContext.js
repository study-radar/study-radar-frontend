import React, { useContext, useState, useEffect } from "react";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import apiClient from "../services/apiClient";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  
  const navigate = useNavigate();

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  async function signUpPostgres(email, password) {
    const data = await apiClient.signUpUser({
      email,
      password,
    });

    console.log("Sign Up Postgres");
    console.log(data);

    // If successful, set the current user and token
    if (data.data) {
      setCurrentUser(data.data.user);
      apiClient.setToken(data.data.token);
    } else if (data.error) {
      setCurrentUser(null);
      localStorage.removeItem(apiClient.tokenName);
      throw new Error("Error logging in");
    }

    return data;
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function logInPostgres(email, password) {
    const data = await apiClient.loginUser({
      email,
      password,
    });

    console.log("Log In Postgres");
    console.log(data);

    // If successful, set the current user and token
    if (data.data) {
      setCurrentUser(data.data.user);
      apiClient.setToken(data.data.token);
    } else if (data.error) {
      setCurrentUser(null);
      localStorage.removeItem(apiClient.tokenName);
      throw new Error("Error logging in");
    }

    return data;
  }

  function logOut() {
    return signOut(auth);
  }

  function logOutPostgres() {
    // TODO: Is there some way of removing token/logging out with apiClient?
    setCurrentUser(null);
    localStorage.removeItem(apiClient.tokenName);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateUserEmail(email) {
    return updateEmail(currentUser, email);
  }

  function updateUserPassword(password) {
    return updatePassword(currentUser, password);
  }

  // Firebase implementation:
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setCurrentUser(user);
  //     setLoading(false);
  //   });
  //   return unsubscribe;
  // }, []);

  // Check local storage for the token to see if user is logged in
  useEffect(() => {
    // Check for user token in local storage
    const fetchUser = async () => {
      // What if studyradar is not in local storage?
      apiClient.setToken(localStorage.getItem("studyradar"));
      const { data, error } = await apiClient.getMe();
      if (data) {
        console.log("logged in");
        setCurrentUser(data.user);
      } else if (error) {
        console.log("user is not logged in");
      } else {
        console.log("error while checking if logged in");
      }
      setLoading(false);
    };
    fetchUser();
  }, []);


  useEffect(() => {
    fetchUser()
      // .then(data => {
      //   console.log(data);
      //   // if(data)
      //   //   navigate('/')

      // })
    
  }, [])
  useEffect(() => {
    if(currentUser)
      navigate('/')
  }, [currentUser])


  async function fetchUser() {
    // const token = localStorage.getItem('studyradar')
    apiClient.setToken(localStorage.getItem('studyradar'))
    const { data, error } = await apiClient.getMe()
    if (data) {
      console.log('logged in');
      setCurrentUser(data.user)
      return data
    }
    else if (error) {
      console.log('logged out');
    }
  }
  

  const value = {
    currentUser,
    signUp,
    signUpPostgres,
    logIn,
    logInPostgres,
    logOut,
    logOutPostgres,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
