import React from "react";
import "../screens/feed.css";

const locationImages = {
  "royce hall":
    "https://upload.wikimedia.org/wikipedia/commons/9/9a/2019_UCLA_Royce_Hall_2.jpg",
  "young research library":
    "https://upload.wikimedia.org/wikipedia/commons/6/6e/2019_UCLA_Charles_E._Young_Research_Library.jpg",
  yrl: "https://upload.wikimedia.org/wikipedia/commons/6/6e/2019_UCLA_Charles_E._Young_Research_Library.jpg",
  "moore hall":
    "https://www.mse.ucla.edu/wp-content/uploads/mse/Moore-Hall-e1567788207682.jpg",
  "powell library":
    "https://upload.wikimedia.org/wikipedia/commons/0/05/Powell_Library%2C_UCLA_%2810_December_2005%29.jpg",
  "kaplan hall":
    "https://www.college.ucla.edu/wp-content/uploads/2019/10/083A7703_email.jpg",
  "bunche hall":
    "https://wp.dailybruin.com/images/2017/02/web.ns_.bunche.FIle_.jpg",
  "public affairs":
    "https://luskin.ucla.edu/wp-content/uploads/2016/05/UCLA_PublicAffairs1_1.jpg",
};

const subjectImages = {
  "cs 35l":
    "https://samueli.ucla.edu/wp-content/uploads/samueli/Paul_Eggert.jpg",
};

export default function StudyGroupCard(props) {
  function getImageURL(location, description, name) {
    for (let subject in subjectImages) {
      if (
        description.toLowerCase().includes(subject) ||
        name.toLowerCase().includes(subject)
      ) {
        return subjectImages[subject];
      }
    }
    for (let place in locationImages) {
      if (location.toLowerCase().includes(place)) {
        return locationImages[place];
      }
    }
    return "https://s3.amazonaws.com/cms.ipressroom.com/173/files/20198/5d72b4772cfac209ff04c634_Royce+Quad/Royce+Quad_hero.jpg";
  }
  return (
    <div
      id="card-container"
      className="w-full h-auto flex flex-col card"
      style={{ border: "3px solid black", padding: "8px" }}
    >
      <div id="card-header" className="w-full h-auto px-8 py-4 card-head">
        <h2 className="text-xl">{props?.name}</h2>
        <h2 className="text-xl">📍{props.location}</h2>
        <h4 className="text-base">Created by: {props.created_by}</h4>
        <h4 className="text-base">
          Availability: {props.numAttendence}/{props.capacity}
        </h4>
      </div>
      <div
        id="card-image"
        className="w-full h-auto back rounded-lg"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <img
          height="110"
          width="300"
          src={getImageURL(props.location, props.description, props.name)}
          alt={props.location}
        />
      </div>
      <div id="card-footer" className="w-full h-auto card-foot px-8 py-4">
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
