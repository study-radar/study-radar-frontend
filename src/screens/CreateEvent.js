import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./CreateEvent.css";
import apiClient from "../services/apiClient";

export default function CreateEvent(props) {
  const {userGroups, setUserGroups, fetchGroups, fetchGroupsForUser } = props

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
    location: "",
    capacity: 3,
    dateTime: "",
    // imgurl: "",
  });
  const [error, setError] = useState("");

  function handleFileUpload(e) {
    e.preventDefault();
    if (e.target.files?.[0]) {
      let FR = new FileReader();
      FR.addEventListener("load", (e) => {
        // console.log(e.target.result);
        setForm({ ...form, imgurl: e.target.result})
        console.log("form", form);
      });
      FR.readAsDataURL(e.target.files[0]);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    
    const requiredFields = ['name', 'description', 'capacity', 'dateTime']
    for(const field of requiredFields){
      if(!form[field]){
        setError(`Error: ${field} is empty...`)
        return
      }
    }

    var { data, error } = await apiClient.createGroup({
      name: form.name,
      description: form.description,
      date_time: form.dateTime,
      capacity: form.capacity,
      created_by: currentUser.email      
    });
    if (data) {
      // update feed
      fetchGroupsForUser()
      fetchGroups()
      setUserGroups(g => [...g, data])
    } else if (error) {
      console.error(error);
      return;
    };
    
    var {data, error} = await apiClient.addUserToGroup({
      groupId: data.group.id
    })
    if(data){
      fetchGroupsForUser()
      navigate("/");
    } else if (error) console.error(error);
  }

  return !currentUser ? (
    <Navigate to="/signup" replace={true} />
  ) : (
    <div className="create-event">
      <h2 className="title">Create Event</h2>
      <h2 className="subtitle">Choose Email and Password</h2>
      {/* {error && <h3>{error}</h3>} */}
      <form onSubmit={handleSubmit}>
        <div className="inputAndLabel">
          <label>Name of Event</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Enter your name of event"
          />
          <br />
          <label>Description</label>
          <input
            type="text"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Enter your Location"
          />
          <br />
            <label>Location</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Enter your location"
            />
            <br />
          <label>Capacity</label>
          <input
            type="number"
            value={form.capacity}
            onChange={(e) => setForm({ ...form, capacity: e.target.value })}
            defaultValue={form.capacity}
          />
          <br />
          <label>Data and Time</label>
          <input
            type="datetime-local"
            value={form.dateTime}
            onChange={(e) => setForm({ ...form, dateTime: e.target.value })}
            defaultValue={form.capacity}
          />
          <br />
        </div>
        <p style={{ color: "red", textAlign: "center", fontSize: '20px' }}>{error}</p>
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
    </div>
  );
}
