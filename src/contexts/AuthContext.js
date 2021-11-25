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

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

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
      localStorage.setItem(apiClient.tokenName, data.data.token);
    } else if (data.error) {
      setCurrentUser(null);
      throw new Error("Error logging in");
    }

    return data;
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

  const value = {
    currentUser,
    signUp,
    signUpPostgres,
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
