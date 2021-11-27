import React from "react";
import { useUserGroup } from "../contexts/UserGroupContext";
import AgendaItem from "./AgendaItem";

export default function Agenda() {
    const {userGroups} = useUserGroup();

    function logGroupsForUser() {
        console.log(userGroups);
    }

    return (
    <>
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