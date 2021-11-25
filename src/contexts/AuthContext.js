import React, { useContext, useState, useEffect } from "react";
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
import { Link, useNavigate } from "react-router-dom";

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

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
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

  // Check local storage for the token to see if user is logged in
  // Get me???
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    fetchUser()
      .then(res => {
        console.log(res);
        if(res)
          navigate('/')

      })
    
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
      return true
    }
    else if (error) {
      console.log('logged out');

    }

  }

  const value = {
    currentUser,
    signUp,
    logIn,
    logOut,
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

