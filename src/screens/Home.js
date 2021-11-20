import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import Calendar from "./Calendar";
import "./home.css";

export default function Home() {
  const [error, setError] = useState("");

  const { currentUser, logOut } = useAuth();

  const navigate = useNavigate();

  var my_calendar = new Calendar();

  async function handleLogout() {
    setError("");

    try {
      await logOut();
      navigate("/signup", { replace: true });
    } catch {
      setError("Failed to logout");
    }
  }

  return (
    <>
      <header>
        <div className="navbar">
          <button onClick={handleLogout} className="logout">Log Out</button>
          <Link to="/update-profile">Update Profile</Link> 
          {/* <Link to="/calendar">Calendar</Link> */}
        </div>
      </header>
      <body>
        <div className="container">
          <div className="feed">
              FEED
          </div>
          <div class="calendar">
              <ScheduleComponent height="650px" selectedDate={new Date(new Date().setHours(new Date().getHours() - 3))} eventSettings={{ dataSource: my_calendar.data,
                  fields: {
                      id: 'Id', 
                      subject: { name: 'Subject' },
                      isAllDay: { name: 'IsAllDay' },
                      startTime: { name: 'StartTime' },
                      endTime: { name: 'EndTime' }
                  }
              }}>
              <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
              </ScheduleComponent>
          </div>
        </div>
        {/* <h3>Email: {currentUser.email}</h3>
        {error && <h3>{error}</h3>}
        <br /> */}
      </body>
    </>
  );
}
