import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./SignUp.css";
import apiClient from "../services/apiClient";

export default function CreateEvent() {
  const { signUp, currentUser, setCurrentUser } = useAuth();

  // the string in useState refers to first var (e.g. email)
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [major, setMajor] = useState("");
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    capacity: 3,
    dateTime: "",
  });
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await apiClient.createGroup({
      name: form.name,
      description: form.description,
      date_time: form.dateTime,
      capacity: form.capacity,
    });
    if (data) {
      // update feed
      navigate("/");
    } else if (error) {
      console.error(error);
      return;
    }
  }

  // If already signed in, go to homepage and not show this page
  return !currentUser ? (
    <Navigate to="/signup" replace={true} />
  ) : (
    <>
      <h2 className="title">Create Event</h2>
      <h2 className="subtitle">Choose Email and Password</h2>
      {/* {error && <h3>{error}</h3>} */}
      {currentUser && currentUser.email}
      <form onSubmit={handleSubmit}>
        <div className="inputAndLabel">
          <label>Name of Event</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Enter your name of event"
          />
          <br />
          <label>Description</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Enter your Description"
          />
          <br />
          <label>Capacity</label>
          <input
            type="number"
            onChange={(e) => setForm({ ...form, capacity: e.target.value })}
            defaultValue={form.capacity}
          />
          <br />
          <label>Data and Time</label>
          <input
            type="datetime-local"
            onChange={(e) => setForm({ ...form, dateTime: e.target.value })}
            defaultValue={form.capacity}
          />
          <br />
        </div>
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        {/* <button className="submit" type="submit" disabled={loading} >REGISTER</button> */}
        <button className="submit" type="submit">
          Create Event
        </button>
      </form>
      <div className="bottom">
        {/* Already have an account?&nbsp;&nbsp; */}
        {/* <Link className="login-link" to="/login" replace={true}>
          
          <br /><br /><br /><br />
        </Link> */}
      </div>
    </>
  );
}
