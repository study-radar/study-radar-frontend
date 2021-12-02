import React, { useState, useEffect } from "react";
import { useUserGroup } from "../contexts/UserGroupContext";
import AgendaItemList from "./AgendaItemList";
import "./agenda.css";

const monthIndex = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Agenda() {
  const { userGroups } = useUserGroup();

  // The months start at 0
  const [currentWeekStart, setCurrentWeekStart] = useState("2021-10-28");
  // List of strings for the week
  const [currentWeek, setCurrentWeek] = useState([]);
  // Dictionary from dates to date strings of groups the user is in
  const [userGroupDateDict, setUserGroupDateDict] = useState(null);

  useEffect(() => {
    getCurrentWeek();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Makes sure to refresh the week everytime the currentWeekStart changes
  useEffect(() => {
    createWeek(currentWeekStart);
  }, [currentWeekStart]);

  // Everytime userGroups changes, we want to update the userGroupDateSet
  useEffect(() => {
    createUserGroupDateDict();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userGroups]);

  function createUserGroupDateDict() {
    const userGroupDateTimeDict = {};
    for (let group of userGroups) {
      const groupDateTimeStringSplit = group.date_time.split("T");
      const groupDateString = groupDateTimeStringSplit[0];
      const groupTimeString = groupDateTimeStringSplit[1];
      // Covert to months that start with 0
      const groupDateStringSplit = groupDateString.split("-");
      groupDateStringSplit[1] = (
        parseInt(groupDateStringSplit[1]) - 1
      ).toString();
      const convertedGroupDateString = groupDateStringSplit.join("-");
      userGroupDateTimeDict[convertedGroupDateString] = groupTimeString;
    }
    setUserGroupDateDict(userGroupDateTimeDict);
  }

  function getCurrentWeek() {
    const today = new Date();
    const todayDay = today.getDay();
    let firstDayOfWeek = new Date();
    firstDayOfWeek.setDate(today.getDate() - todayDay);
    setCurrentWeekStart(
      `${firstDayOfWeek.getFullYear()}-${firstDayOfWeek.getMonth()}-${firstDayOfWeek.getDate()}`
    );
    // createWeek(currentWeekStart);
  }

  function incrementWeek() {
    setCurrentWeekStart((prevWeek) => {
      const nextFirstDayOfWeek = new Date();
      const currentWeekSplit = prevWeek.split("-");
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
      const currentWeekSplit = prevWeek.split("-");
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
    const currentWeekSplit = weekStart.split("-");
    currentWeekStartDate.setFullYear(currentWeekSplit[0]);
    currentWeekStartDate.setMonth(currentWeekSplit[1]);
    currentWeekStartDate.setDate(currentWeekSplit[2]);
    // Go through and create strings for each day in this week
    const weekDayStrings = [];
    for (let i = 0; i < 7; i++) {
      // Note: Need to set the day to today, then set date
      const dayOfWeek = new Date();
      dayOfWeek.setFullYear(currentWeekSplit[0]);
      dayOfWeek.setMonth(currentWeekSplit[1]);
      dayOfWeek.setDate(currentWeekSplit[2]);
      dayOfWeek.setDate(currentWeekStartDate.getDate() + i);
      weekDayStrings.push(
        `${dayOfWeek.getFullYear()}-${dayOfWeek.getMonth()}-${dayOfWeek.getDate()}`
      );
    }
    setCurrentWeek(weekDayStrings);
  }

  function expandDateString(dateString) {
    const splitDateString = dateString.split("-");
    return `${monthIndex[splitDateString[1]]} ${splitDateString[2]}, ${
      splitDateString[0]
    }`;
  }

  return (
    <>
      <div className="agenda w-full h-full box">
        <p className="text-5xl week">
          Week of {expandDateString(currentWeekStart)}
        </p>
        <div className="change-week">
          <button
            onClick={decrementWeek}
            className="prev-week bg-gray-400 border-none text-black py-2 px-9 text-center no-underline inline-block text-2xl rounded-lg"
          >
            Last Week
          </button>
          <button
            onClick={incrementWeek}
            className="next-week bg-gray-400 border-none text-black py-2 px-9 text-center no-underline inline-block text-2xl rounded-lg"
          >
            Next Week
          </button>
        </div>
        <div className="study-groups">
          {currentWeek.map((dateString) => {
            const padSplitDateString = dateString.split("-");
            const paddedDateString = `${padSplitDateString[0]}-${String(
              padSplitDateString[1]
            ).padStart(2, "0")}-${String(padSplitDateString[2]).padStart(
              2,
              "0"
            )}`;
            if (paddedDateString in userGroupDateDict) {
              return (
                <>
                  <div className="agenda-item">
                    <p className="text-4xl date-str">
                      {expandDateString(dateString)}
                    </p>
                    <AgendaItemList dateString={paddedDateString} />
                    <br />
                  </div>
                </>
              );
            } else {
              return (
                <>
                  <div className="agenda-item">
                    <p className="text-4xl">{expandDateString(dateString)}</p>
                    <p className="text-3xl text-gray-300">
                      No Study Groups for Today!
                    </p>
                    <br />
                  </div>
                </>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}
