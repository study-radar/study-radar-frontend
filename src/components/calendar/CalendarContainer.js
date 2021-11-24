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
export default function Calendar(props) {
  return (
    <div class="calendar">
      <ScheduleComponent
        height="650px"
        selectedDate={new Date(new Date().setHours(new Date().getHours() - 3))}
        eventSettings={{
          dataSource: props.calendar.data,
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
