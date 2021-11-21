import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import Calendar from "./Calendar";
import "./home.css";
import "./feed.css";

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
          <button onClick={handleLogout} className="logout">LOG OUT</button>
          <Link className="home-link" to="/update-profile">Update Profile</Link> 
        </div>
      </header>
      <body>
        <div className="container">
          <div className="feed">
          <div class="container">
<div class="row bootstrap snippets bootdey">
    <div class="col-md-7 col-xs-12 col-md-offset-3">
      <div class="panel" id="daily-feed">
        <div class="panel-heading">
          <h3 class="panel-title">Daily feed
            <span class="pull-right label label-round label-warning">10 Messages</span>
          </h3>
        </div>
        <div class="panel-body">
          <ul class="list-group list-group-dividered list-group-full">
            <li class="list-group-item">
              <div class="media">
                <div class="media-left">
                  <a class="avatar avatar-online" href="javascript:void(0)">
                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" /><i></i></a>
                </div>
                <div class="media-body">
                  <h4 class="media-heading">
                    <small class="pull-right">5m ago</small>
                    <a class="name">Edward Fletcher</a> posted a new blog.
                  </h4>
                  <small>Today 5:50 pm - 12.04.2015</small>
                </div>
              </div>
            </li>
            <li class="list-group-item">
              <div class="media">
                <div class="media-left">
                  <a class="avatar avatar-off" href="javascript:void(0)">
                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" /><i></i></a>
                </div>
                <div class="media-body">
                  <h4 class="media-heading">
                    <small class="pull-right">2h ago</small>
                    <a class="name">Justin Martin</a> posted message on
                    <a class="name">Crystal Bates</a> site.
                  </h4>
                  <small>Today 2:55 pm - 12.04.2015</small>
                  <div class="actions margin-top-10">
                    <button type="button" class="btn btn-danger btn-xs waves-effect waves-light"><i class="icon md-thumb-up" aria-hidden="true"></i>Like</button>
                    <button type="button" class="btn btn-danger btn-xs waves-effect waves-light"><i class="icon md-favorite" aria-hidden="true"></i>Love</button>
                  </div>
                </div>
              </div>
            </li>
            <li class="list-group-item">
              <div class="media">
                <div class="media-left">
                  <a class="avatar avatar-away" href="javascript:void(0)">
                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" /><i></i></a>
                </div>
                <div class="media-body">
                  <h4 class="media-heading">
                    <small class="pull-right">6h ago</small>
                    <a class="name">Terrance Arnold</a> posted message on
                    <a class="name">Nathan Watts</a> site.
                  </h4>
                  <small>Today 12:00 am - 12.04.2015</small>
                  <div class="content well">
                    Aspernatur ad aspernari sapienter constringendos conspiratione locatus. Ii maiores
                    aequo tollit, profecta iucundo pueros assentior velit circumcisaque
                    error fastidium nostros. Utuntur deserunt solvantur.
                  </div>
                </div>
              </div>
            </li>
            <li class="list-group-item">
              <div class="media">
                <div class="media-left">
                  <a class="avatar avatar-busy" href="javascript:void(0)">
                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" /><i></i></a>
                </div>
                <div class="media-body">
                  <h4 class="media-heading">
                    <small class="pull-right">20h ago</small>
                    <a class="name">Heather Harper</a> started following
                    <a class="name">Terrance Arnold</a>.
                  </h4>
                  <small>Yesterday 9:00 pm - 11.04.2015</small>
                </div>
              </div>
            </li>
          </ul>
          <button type="button" class="btn btn-block btn-primary waves-effect waves-light"><i class="icon md-chevron-down margin-right-5" aria-hidden="true"></i>Show
            More</button>
        </div>
      </div>
    </div>
</div>
</div>
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
