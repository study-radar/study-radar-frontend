import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
//import StudyGroupCardList from "../components/StudyGroupCardList";
//hello world
import "./home.css";
import "./feed.css";
import StudyGroupCard from "../components/StudyGroupCard";
import Agenda from "../components/Agenda";
import Navbar from "./Navbar";
import { useUserGroup } from "../contexts/UserGroupContext";

export default function Home() {
  const { userGroups, fetchGroupsForUser } = useUserGroup();

  const { currentUser } = useAuth();

  const [searchedUserGroups, setSearchedUserGroups] = useState([]);
  const [searching, setSearching] = useState(false);

  function filterUserGroups(e) {
    setSearching(!!e.target.value);

    setSearchedUserGroups(
      userGroups.filter((el) => el.name.startsWith(e.target.value))
    );
  }

  React.useEffect(() => {
    fetchGroupsForUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !currentUser ? (
    <Navigate to="/signup" replace={true} />
  ) : (
    <div className="signup flex flex-col">
      <Navbar />
      <body className="w-screen h-screen flex">
        <div className="wrap">
          <div className="w-full h-full box">
            <div class="topnav" style={{ display: "relative" }}>
              <div className="searchPrompt">
                Search for the study sessions you want to join:
              </div>
              <input
                type="text"
                placeholder="Search.."
                onChange={filterUserGroups}
              />
            </div>
            {/* <StudyGroupCardList /> */}
            {(searching ? searchedUserGroups : userGroups).map((group) => {
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
                />
              );
            })}
          </div>
          <div>
            <Agenda/>
          </div>
        </div>
      </body>
    </div>
  );
}
