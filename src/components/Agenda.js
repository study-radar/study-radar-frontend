import React, { useState, useEffect } from "react";
import { useUserGroup } from "../contexts/UserGroupContext";
import AgendaItem from "./AgendaItem";

export default function Agenda() {
    const {userGroups} = useUserGroup();

    // The months start at 0
    const [currentWeekStart, setCurrentWeekStart] = useState('2021-10-28');
    // List of strings for the week
    const [currentWeek, setCurrentWeek] = useState([]);

    useEffect(() => {
      getCurrentWeek();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Makes sure to refresh the week everytime the currentWeekStart changes
    useEffect(() => {
      createWeek(currentWeekStart);
    }, [currentWeekStart]);

    function getCurrentWeek(){
        const today = new Date();
        const todayDay = today.getDay();
        let firstDayOfWeek = new Date();
        firstDayOfWeek.setDate(today.getDate() - todayDay);
        setCurrentWeekStart(`${firstDayOfWeek.getFullYear()}-${firstDayOfWeek.getMonth()}-${firstDayOfWeek.getDate()}`);
        // createWeek(currentWeekStart);
    }

    function incrementWeek() {
      setCurrentWeekStart((prevWeek) => {
            const nextFirstDayOfWeek = new Date();
            const currentWeekSplit = prevWeek.split('-');
            nextFirstDayOfWeek.setFullYear(currentWeekSplit[0]);
            nextFirstDayOfWeek.setMonth(currentWeekSplit[1]);
            nextFirstDayOfWeek.setDate(currentWeekSplit[2]);
            // Increment the date by 7 for next week
            nextFirstDayOfWeek.setDate(nextFirstDayOfWeek.getDate() + 7);
            return `${nextFirstDayOfWeek.getFullYear()}-${nextFirstDayOfWeek.getMonth()}-${nextFirstDayOfWeek.getDate()}`;
        });
        // createWeek(currentWeekStart);
    }

    function decrementWeek() {
      setCurrentWeekStart((prevWeek) => {
            const nextFirstDayOfWeek = new Date();
            const currentWeekSplit = prevWeek.split('-');
            nextFirstDayOfWeek.setFullYear(currentWeekSplit[0]);
            nextFirstDayOfWeek.setMonth(currentWeekSplit[1]);
            nextFirstDayOfWeek.setDate(currentWeekSplit[2]);
            // Decrement the date by 7 for next week
            nextFirstDayOfWeek.setDate(nextFirstDayOfWeek.getDate() - 7);
            return `${nextFirstDayOfWeek.getFullYear()}-${nextFirstDayOfWeek.getMonth()}-${nextFirstDayOfWeek.getDate()}`;
        });
      // createWeek(currentWeekStart);
    }

    function createWeek(weekStart) {
      // Create a Date object for current week start
      const currentWeekStartDate = new Date();
      const currentWeekSplit = weekStart.split('-');
      console.log(currentWeekSplit);
      currentWeekStartDate.setFullYear(currentWeekSplit[0]);
      currentWeekStartDate.setMonth(currentWeekSplit[1]);
      currentWeekStartDate.setDate(currentWeekSplit[2]);
      // Go through and create strings for each day in this week
      const weekDayStrings = [];
      for (let i = 0; i < 7; i++){
        // Note: Need to set the day to today, then set date
        const dayOfWeek = new Date();
        dayOfWeek.setFullYear(currentWeekSplit[0]);
        dayOfWeek.setMonth(currentWeekSplit[1]);
        dayOfWeek.setDate(currentWeekSplit[2]);
        dayOfWeek.setDate(currentWeekStartDate.getDate() + i);
        weekDayStrings.push(`${dayOfWeek.getFullYear()}-${dayOfWeek.getMonth()}-${dayOfWeek.getDate()}`);
      }
      setCurrentWeek(weekDayStrings);
    }

    return (
    <>
    <p>{currentWeekStart}</p>
    <br/>
    {(currentWeek).map((dateString) => {
        return (
          <>
          <p>{dateString}</p>
          <br/>
          </>
        );
      })}
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