import React, { useContext, useEffect } from "react";
import apiClient from "../services/apiClient";

const UserGroupContext = React.createContext();

export function useUserGroup() {
  return useContext(UserGroupContext);
}

export default function UserGroupProvider({ children }) {
  const [userGroups, setUserGroups] = React.useState([]);
  const [allGroups, setAllGroups] = React.useState([]);

  async function fetchGroupsForUser() {
    const { data, error } = await apiClient.getGroupsForUser();
    if (data) {
      console.log("groups for user");
      console.log(data);

      setUserGroups([...data]);
    } else if (error) {
      console.error(error);
    }
  }

  async function fetchAllGroups() {
    const { data, error } = await apiClient.getAllGroups();
    if (data) {
      console.log("all groups");
      console.log(data);
      setAllGroups([...data]);
    } else if (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchGroupsForUser();
  }, []);

  const value = {
    userGroups,
    setUserGroups,
    fetchGroupsForUser,
    allGroups,
    setAllGroups,
    fetchAllGroups,
  };

  return (
    <UserGroupContext.Provider value={value}>
      {children}
    </UserGroupContext.Provider>
  );
}
