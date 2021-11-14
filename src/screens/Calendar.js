
import * as React from 'react';
// import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate, Navigate } from "react-router-dom";

import * as ReactDOM from 'react-dom';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';



class Calendar extends React.Component {
    constructor() {
        super(...arguments);
        this.data = [{
                Id: 2,
                Subject: 'Meeting',
                StartTime: new Date(2018, 1, 15, 10, 0),
                EndTime: new Date(2018, 1, 15, 12, 30),
                IsAllDay: false,
                Status: 'Completed',
                Priority: 'High'
            }];
            document.getElementById('schedule');
    }

    // navigate = useNavigate();
    // handleGoBack() {
    //     navigate(-1);
    // }

    render() {
        return <div><ScheduleComponent height='550px' selectedDate={new Date(2018, 1, 15)} eventSettings={{ dataSource: this.data,
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
    <br />
    <button 
            className = "buttonProp"
            onclick = "useNavigate(-1)"
            // history.go(-1), history.back() --> doesn't work
            type="submit"
            
            // onclick = "/"
            // disabled={loading}
            >BACK TO HOMEPAGE
    </button>
    </div>;
    
    }
};

export default Calendar;


// ReactDOM.render(<App />, document.getElementById('schedule'));