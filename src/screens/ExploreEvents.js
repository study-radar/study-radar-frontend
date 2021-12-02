import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Agenda from "../components/Agenda";
//import StudyGroupCardList from "../components/StudyGroupCardList";
import "./home.css";
import "./feed.css";
import StudyGroupCard from "../components/StudyGroupCard";
import apiClient from "../services/apiClient";
import Navbar from "./Navbar";
import { useUserGroup } from "../contexts/UserGroupContext";
import JoinLeaveButton from "../components/JoinLeaveButton";

export default function ExploreEvents() {
  const { userGroups, fetchGroupsForUser, allGroups, fetchAllGroups } =
    useUserGroup();

  const { currentUser } = useAuth();

  const [searchedGroups, setSearchedGroups] = useState([]);
  const [searching, setSearching] = useState(false);

  React.useEffect(() => {
    fetchGroupsForUser();
    fetchAllGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function filterGroups(e) {
    setSearching(!!e.target.value);
    setSearchedGroups(
      allGroups.filter((el) => el.name.toLowerCase().includes(e.target.value.toLowerCase()))
    );
  }

  async function handleJoinGroup(groupId) {
    const { data, error } = await apiClient.addUserToGroup({
      groupId: groupId,
    });
    if (data) {
      console.log("user joined group");
      console.log(data);
      // Update allGroups and userGroups
      fetchAllGroups();
      fetchGroupsForUser();
    } else if (error) console.error(error);
  }

  async function handleLeaveGroup(groupId) {
    const { data, error } = await apiClient.removeUserFromGroup({
      email: currentUser.email,
      groupId: groupId,
    });
    if (data) {
      console.log("user left group");
      console.log(data);
      fetchAllGroups();
      fetchGroupsForUser();
    } else if (error) console.error(error);
  }

  function createEventButton(group) {
    const userGroupIds = userGroups.map(({ id }) => id);
    if (userGroupIds.includes(group.id)) {
      return (
        <div className="join-leave">
          <JoinLeaveButton
            onClick={() => handleLeaveGroup(group.id)}
            type="leave"
          />
        </div>
      );
    }
    if (
      group.users.length < group.capacity &&
      !userGroupIds.includes(group.id)
    ) {
      return (
        <div className="join-leave">
          <JoinLeaveButton
            onClick={() => handleJoinGroup(group.id)}
            type="join"
          />
        </div>
        
      );
    }

    return <JoinLeaveButton onClick={() => {}} type="unavailable" />;
  }

  return !currentUser ? (
    <Navigate to="/signup" replace={true} />
  ) : (
    <div className="signup flex flex-col">
      <Navbar />
      <body className="w-screen h-screen flex">
        <div className="wrap">
          <div className="w-full h-full box">
            <div class="topnav search" style={{ display: "relative" }}>
              <input
                type="text"
                placeholder="Search study sessions to join..."
                onChange={filterGroups}
              />
            </div>
            {/* <StudyGroupCardList /> */}
            {(searching ? searchedGroups : allGroups).map((group) => {
              return (
                <StudyGroupCard
                  key={group.id}
                  id={group.id}
                  name={group.name}
                  subject={group.subject}
                  location={group.location}
                  imgurl={group.imgurl}
                  description={group.description}
                  numAttendence={group.users.length}
                  capacity={group.capacity}
                  created_by={group.created_by}
                  eventButton={createEventButton(group)}
                  date_time={group.date_time}
                />
              );
            })}
          </div>
          <div>
            <Agenda />
          </div>
        </div>
      </body>
    </div>
  );
}
