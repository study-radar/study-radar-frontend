import React from 'react';
import { useUserGroup } from "../contexts/UserGroupContext";
import AgendaItem from "./AgendaItem";

export default function AgendaItemList(props) {
    const {userGroups} = useUserGroup();

    // Props should include the dateString to render
    return (
        <>
        {userGroups.filter((group) => {
            // Convert group date time
            const groupDateTimeStringSplit = group.date_time.split('T');
            const groupDateString = groupDateTimeStringSplit[0];
            // Covert to months that start with 0
            const groupDateStringSplit = groupDateString.split('-');
            groupDateStringSplit[1] = (parseInt(groupDateStringSplit[1]) - 1).toString();
            const convertedGroupDateString = groupDateStringSplit.join('-');
            return props.dateString === convertedGroupDateString;
        }).sort(function (firstGroup, secondGroup) {
            const firstGroupTime = firstGroup.date_time.split('T')[1];
            const secondGroupTime = secondGroup.date_time.split('T')[1];
            if (firstGroupTime > secondGroupTime) {
                return -1;
            }
            if (firstGroupTime < secondGroupTime) {
                return 1;
            }
            return 0;
        }).map((group) => <AgendaItem
            key={group.id}
            date_time={group.date_time}
            id={group.id}
            name={group.name}
        />)
        }
        </>
    );
}
