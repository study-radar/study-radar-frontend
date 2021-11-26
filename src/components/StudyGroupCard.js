import React from "react";
import styled from 'styled-components'
import apiClient from "../services/apiClient";
import { useAuth } from "../contexts/AuthContext";

export default function StudyGroupCard(props) {
  const {groups, setGroups, userGroups, fetchGroups, fetchGroupsForUser} = props

  const { signUp, currentUser, setCurrentUser } = useAuth();

  const [joinWidget, setJoinWidget] = React.useState()
  
  // console.log(props);
  /* Contained inside of props
    Study Group Name
    Subject
    Location
    Picture
    Description
    Other people attending
    Group creator
    */

    const JoinButton = styled("button")`
      background-color: #4CAF50; /* Green */
      border: none;
      color: white;
      padding: 5px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      border-radius: 40%;
      font-size: 15px;
    `
  const LeaveButton = styled("button")`
      background-color: red; /* Green */
      border: none;
      color: white;
      padding: 5px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      border-radius: 40%;
      font-size: 15px;
    `

  function getJoinWidget(){
    const groupIds = userGroups.map(({id}) => id)
    if(props.numAttendence < props.capacity && !groupIds.includes(props.id)) 
      return <JoinButton onClick={handleJoinEvent}>Join</JoinButton>
    else if(groupIds.includes(props.id))
      return <LeaveButton onClick={handleLeaveEvent}>Leave</LeaveButton>

    return  <p>Unavailable</p>
  }
  function userInGroup(groupId, a,b){
    const groupIds = userGroups.map(({ id }) => id)
    return groupIds.includes(groupId)
  }


  async function handleJoinEvent(){
    const {data, error} = await apiClient.addUserToGroup({
      groupId: props.id
    })
    if(data){
      console.log('user joined group');
      console.log(data);
      fetchGroups()
      setGroups(g => ({...g}))
    }else if(error) console.error(error);
   

  }
  async function handleLeaveEvent(){
    const {data, error} = await apiClient.removeUserFromGroup({
      email: currentUser.email,
      groupId: props.id
    })
    if(data){
      console.log('user left group');
      console.log(data);
      fetchGroups()

      props.setGroups({...props.groups})
    }else if(error) console.error(error);

  }
  React.useEffect(() => {
    setJoinWidget(getJoinWidget())
  }, [])


  return (
    <div
      id="card-container"
      className="w-full h-auto flex flex-col shadow-lg rounded-lg"
      style={{border: '1px solid black', padding: '8px'}}
    >
      <div
        id="card-header"
        className="w-full h-auto bg-gray-50 font-sans px-8 py-4"
      >
        <h2 className="text-xl">{props?.name}</h2>
        <h2 className="text-xl">📍 {props.location}</h2>
        <h4 className="text-base">Created by: {props.created_by}</h4>
        <h4 className="text-base">Availability: {props.numAttendence}/{props.capacity}</h4>
      </div>
      <div id="card-image" className="w-full h-auto bg-blue-400 rounded-lg"
        style={{display: 'flex', justifyContent: 'center'}}>
        <img height='110' width='300' src={props.imgurl || 'https://s3.amazonaws.com/cms.ipressroom.com/173/files/20198/5d72b4772cfac209ff04c634_Royce+Quad/Royce+Quad_hero.jpg'} alt={props.location} />
      </div>
      <div
        id="card-footer"
        className="w-full h-auto bg-gray-50 font-sans px-8 py-4"
      >
        {props.description}
      </div>
      <div style={{ width: '100%', display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
        {
          (
            getJoinWidget()
          )
        }
      </div>
    </div>
  );
}
