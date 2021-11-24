
import * as React from 'react';
import { Link } from "react-router-dom";

import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import "./calendar.css";


class Calendar extends React.Component {
    constructor() {
        super(...arguments);
        this.data = [{
                Id: 2,
                Subject: 'Meeting',
                StartTime: new Date(new Date().setHours(new Date().getHours() - 3)),
                EndTime: new Date(new Date().setHours(new Date().getHours() + 3)),
                IsAllDay: false,
                Status: 'Completed',
                Priority: 'High'
            }];
            document.getElementById('schedule');
    }

    render() {
        return <div className="home">
            <header>
                <div className="navbar">
                {/* <button onClick={handleLogout} className="logout">Log Out</button> */}
                <Link to="/update-profile">Update Profile</Link> 
                </div>
            </header>
            <div className="container">
                <div class="calendar">
                    <ScheduleComponent selectedDate={new Date(new Date().setHours(new Date().getHours() - 3))} eventSettings={{ dataSource: this.data }} enablePersistence={true}>
                    <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
                    </ScheduleComponent>
                </div>
            </div>
        </div>;
    }
};

export default Calendar;


// ReactDOM.render(<App />, document.getElementById('schedule'));