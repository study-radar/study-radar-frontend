import React from "react";
import styled from 'styled-components'
import apiClient from "../services/apiClient";

export default function StudyGroupCard(props) {
  console.log(props);
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

  /* background: #7aade; */
    `

  async function handleJoinEvent(){
    const {data, error} = await apiClient.addUserToGroup({
      groupId: 3
    })
  }

  return (
    <div
      id="card-container"
      className="w-full h-auto flex flex-col shadow-lg rounded-lg"
    >
      <div
        id="card-header"
        className="w-full h-auto bg-gray-50 font-sans px-8 py-4"
      >
        <h2 className="text-xl">{props?.name}</h2>
        <h1 className="text-4xl">{props.groupName}</h1>
        <h2 className="text-xl">📍 {props.location}</h2>
        <h4 className="text-base">Created by: {props.groupCreator}</h4>
        <h4 className="text-base">Attending: {props.numAttendence}</h4>
      </div>
      <div id="card-image" className="w-full h-auto bg-blue-400 rounded-lg">
        <img src={props.pictureURL} alt={props.location} />
      </div>
      <div
        id="card-footer"
        className="w-full h-auto bg-gray-50 font-sans px-8 py-4"
      >
        {props.description}
      </div>
      <div style={{ width: '100%', display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
        <JoinButton onClick={handleJoinEvent}>Join</JoinButton>
      </div>
    </div>
  );
}
