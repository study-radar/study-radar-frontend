import React, { useState } from "react";
import apiClient from "../services/apiClient";
import { useAuth } from "../contexts/AuthContext";
import JoinLeaveButton from "./JoinLeaveButton";

export default function StudyGroupCard(props) {
  const { groups, setGroups, userGroups, fetchGroups, fetchGroupsForUser } =
    props;

  const { signUp, currentUser, setCurrentUser } = useAuth();
  const [isJoinable, setIsJoinable] = useState(
    !groups.map(({ id }) => id).includes(props.id) &&
      props.numAttendence < props.capacity
  );

  const [joinWidget, setJoinWidget] = React.useState();

  function getJoinWidget() {
    const groupIds = userGroups.map(({ id }) => id);
    if (props.numAttendence < props.capacity && !groupIds.includes(props.id))
      return <JoinLeaveButton onClick={handleJoinEvent} type="join" />;
    else if (groupIds.includes(props.id))
      return <JoinLeaveButton onClick={handleLeaveEvent} type="leave" />;

    return <JoinLeaveButton onClick={handleLeaveEvent} type="unavailable" />;
  }
  function _getJoinWidget(a) {
    if (a === 0)
      return <JoinLeaveButton onClick={handleJoinEvent} type="join" />;
    if (a === 1)
      return <JoinLeaveButton onClick={handleLeaveEvent} type="leave" />;

    return <JoinLeaveButton onClick={handleLeaveEvent} type="unavailable" />;
  }
  function userInGroup(groupId, a, b) {
    const groupIds = userGroups.map(({ id }) => id);
    return groupIds.includes(groupId);
  }

  async function handleJoinEvent() {
    const { data, error } = await apiClient.addUserToGroup({
      groupId: props.id,
    });
    if (data) {
      console.log("user joined group");
      console.log(data);
      fetchGroups();
      // setIsJoinable(!isJoinable)
      setJoinWidget(_getJoinWidget(1));
    } else if (error) console.error(error);
  }
  async function handleLeaveEvent() {
    const { data, error } = await apiClient.removeUserFromGroup({
      email: currentUser.email,
      groupId: props.id,
    });
    if (data) {
      console.log("user left group");
      console.log(data);
      fetchGroups();
      setJoinWidget(_getJoinWidget(0));
    } else if (error) console.error(error);
  }
  React.useEffect(() => {
    setJoinWidget(getJoinWidget());
  }, []);

  return (
    <div
      id="card-container"
      className="w-full h-auto flex flex-col shadow-lg rounded-lg"
      style={{ border: "1px solid black", padding: "8px" }}
    >
      <div
        id="card-header"
        className="w-full h-auto bg-gray-50 font-sans px-8 py-4"
      >
        <h2 className="text-xl">{props?.name}</h2>
        <h2 className="text-xl">📍 {props.location}</h2>
        <h4 className="text-base">Created by: {props.created_by}</h4>
        <h4 className="text-base">
          Availability: {props.numAttendence}/{props.capacity}
        </h4>
      </div>
      <div
        id="card-image"
        className="w-full h-auto bg-blue-400 rounded-lg"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <img
          height="110"
          width="300"
          src={
            props.imgurl ||
            "https://s3.amazonaws.com/cms.ipressroom.com/173/files/20198/5d72b4772cfac209ff04c634_Royce+Quad/Royce+Quad_hero.jpg"
          }
          alt={props.location}
        />
      </div>
      <div
        id="card-footer"
        className="w-full h-auto bg-gray-50 font-sans px-8 py-4"
      >
        {props.description}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {
          // (isJoinable) ?
          // <JoinButton onClick={handleJoinEvent}>Join</JoinButton>
          // : <LeaveButton onClick={handleLeaveEvent}>Leave</LeaveButton>

          // isJoinable ? getJoinWidget() : getJoinWidget()
          joinWidget
        }
      </div>
    </div>
  );
}
