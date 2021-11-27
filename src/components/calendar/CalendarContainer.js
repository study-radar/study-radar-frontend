import React from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
} from "@syncfusion/ej2-react-schedule";

// Props should include calendar
export default function Calendar({ userGroups, fetchGroupsForUser}) {

  const [dateTimes, setDateTimes] = React.useState([])


  React.useEffect(() => {
    fetchGroupsForUser().then(()=>{
      let tmpDateTimes = userGroups.map(e => (e.date_time))
      tmpDateTimes.map(e => {
        let endTime = e.split('T')[1].split(':')[0]
        endTime = Number(endTime) + 1
        endTime = e.split('T')[0] + 'T' + endTime + ':' + e.split(':')[1]

        return {
          Id: 3,
          Subject: 'jfsdl',
          StartTime: new Date(e),
          EndTime: new Date(endTime),
          isAllDay: false,
          Status: 'Completed',
          Priority: 'High'
        }
      })
      console.log(tmpDateTimes);
      setDateTimes(tmpDateTimes)
    })

    // setDateTimes([{
    //   Id: 2,
    //   Subject: 'Meeting',
    //   StartTime: new Date(new Date().setHours(new Date().getHours() - 3)),
    //   EndTime: new Date(new Date().setHours(new Date().getHours() + 3)),
    //   IsAllDay: false,
    //   Status: 'Completed',
    //   Priority: 'High'
    // }])
  }, [])
  return (
    <div class="calendar">
      <ScheduleComponent
        height="650px"
        selectedDate={new Date(new Date().setHours(new Date().getHours() - 3))}
        eventSettings={{
          dataSource: dateTimes,
          fields: {
            id: "Id",
            subject: { name: "Subject" },
            isAllDay: { name: "IsAllDay" },
            startTime: { name: "StartTime" },
            endTime: { name: "EndTime" },
          },
        }}
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  );
}
