import React from "react";

export default function JoinLeaveButton(props) {
  // Props should have onClick attribute
  // Props should have type of { 'join', 'leave', 'unavailable' }

  const createButton = (buttonType) => {
    if (buttonType === "join") {
      return (
        <button
          onClick={props.onClick}
          className="bg-green-400 border-none text-white py-2 px-9 text-center no-underline inline-block text-2xl rounded-lg"
        >
          Join
        </button>
      );
    }
    if (buttonType === "leave") {
      return (
        <button
          onClick={props.onClick}
          className="border-none bg-red-500 text-white py-2 px-9 text-center no-underline inline-block text-2xl rounded-lg"
        >
          Leave
        </button>
      );
    }
    if (buttonType === "unavailable") {
      return (
        <button
          onClick={props.onClick}
          className="border-none bg-gray-300 text-gray-400 py-2 px-9 text-center no-underline inline-block text-2xl rounded-lg"
          disabled={true}
        >
          Unavailable
        </button>
      );
    }
  };

  return createButton(props.type);
}
