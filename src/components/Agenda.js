import React, {useState} from "react";
import { useUserGroup } from "../contexts/UserGroupContext";
import AgendaItem from "./AgendaItem";

export default function Agenda() {
    const {userGroups} = useUserGroup();

    // The months start at 0
    const [currentWeek, setCurrentWeek] = useState('2021-10-28');

    React.useEffect(() => {
        getCurrentWeek();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    function getCurrentWeek(){
        const today = new Date();
        const todayDay = today.getDay();
        let firstDayOfWeek = new Date();
        firstDayOfWeek.setDate(today.getDate() - todayDay);
        setCurrentWeek(`${firstDayOfWeek.getFullYear()}-${firstDayOfWeek.getMonth()}-${firstDayOfWeek.getDate()}`);
    }

    function incrementWeek() {
        setCurrentWeek((prevWeek) => {
            const nextFirstDayOfWeek = new Date();
            const currentWeekSplit = prevWeek.split('-');
            nextFirstDayOfWeek.setFullYear(currentWeekSplit[0]);
            nextFirstDayOfWeek.setMonth(currentWeekSplit[1]);
            nextFirstDayOfWeek.setDate(currentWeekSplit[2]);
            // Increment the date by 7 for next week
            nextFirstDayOfWeek.setDate(nextFirstDayOfWeek.getDate() + 7);
            return `${nextFirstDayOfWeek.getFullYear()}-${nextFirstDayOfWeek.getMonth()}-${nextFirstDayOfWeek.getDate()}`;
        })
    }

    function decrementWeek() {
        setCurrentWeek((prevWeek) => {
            const nextFirstDayOfWeek = new Date();
            const currentWeekSplit = prevWeek.split('-');
            nextFirstDayOfWeek.setFullYear(currentWeekSplit[0]);
            nextFirstDayOfWeek.setMonth(currentWeekSplit[1]);
            nextFirstDayOfWeek.setDate(currentWeekSplit[2]);
            // Decrement the date by 7 for next week
            nextFirstDayOfWeek.setDate(nextFirstDayOfWeek.getDate() - 7);
            return `${nextFirstDayOfWeek.getFullYear()}-${nextFirstDayOfWeek.getMonth()}-${nextFirstDayOfWeek.getDate()}`;
        })
    }

    return (
    <>
    <p>{currentWeek}</p>
    <br/>
    <button onClick={incrementWeek}>Next Week</button>
    <br/>
    <button onClick={decrementWeek}>Last Week</button>
    <br/>
    {(userGroups).map((group) => {
        return (
          <AgendaItem
            key={group.id}
            date_time={group.date_time}
            id={group.id}
            name={group.name}
          />
        );
      })}
    </>);
}