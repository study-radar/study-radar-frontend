
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
                <div className="feed">
                    FEED
                </div>
                <div class="calendar">
                    <ScheduleComponent height="650px" selectedDate={new Date(new Date().setHours(new Date().getHours() - 3))} eventSettings={{ dataSource: this.data,
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
        </div>;
    }
};

export default Calendar;


// ReactDOM.render(<App />, document.getElementById('schedule'));