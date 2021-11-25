import React from "react";

export default function StudyGroupCard(props) {
  /* Contained inside of props
    Study Group Name
    Subject
    Location
    Picture
    Description
    Other people attending
    Group creator
    */

  return (
    <div
      id="card-container"
      className="w-full h-auto flex flex-col shadow-lg rounded-lg"
    >
      <div
        id="card-header"
        className="w-full h-auto bg-gray-50 font-sans px-8 py-4"
      >
        <h2 className="text-xl">{props.subject}</h2>
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
      <button>jfsdlkjfsdklfj</button>
    </div>
  );
}
