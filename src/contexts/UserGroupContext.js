import React, { useContext } from "react";
import apiClient from "../services/apiClient";

const UserGroupContext = React.createContext();

export function useUserGroup() {
  return useContext(UserGroupContext);
}

export default function UserGroupProvider({ children }) {
  const [userGroups, setUserGroups] = React.useState([]);
  const [groups, setGroups] = React.useState([]);

  async function fetchGroupsForUser() {
    // resemble refresh
    setUserGroups([]);
    const { data, error } = await apiClient.getGroupsForUser();
    if (data) {
      console.log("groups for user");
      console.log(data);

      setUserGroups([...data]);
    } else if (error) {
      console.error(error);
    }
  }
  const value = {
    fetchGroupsForUser,
  };
  return (
    <UserGroupContext.Provider value={value}>
      {children}
    </UserGroupContext.Provider>
  );
}
