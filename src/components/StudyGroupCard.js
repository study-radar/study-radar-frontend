import React from "react";

export default function StudyGroupCard(props) {
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
        {props.eventButton ? props.eventButton : <></>}
      </div>
    </div>
  );
}
