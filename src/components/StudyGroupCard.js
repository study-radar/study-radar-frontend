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
        <h2 className="text-xl">CS 35L</h2>
        <h1 className="text-4xl">Final Review Session</h1>
        <h2 className="text-xl">📍 Royce Hall</h2>
        <h4 className="text-base">Created by: Bryson</h4>
        <h4 className="text-base">Attending: 5</h4>
      </div>
      <div id="card-image" className="w-full h-auto bg-blue-400 rounded-lg">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/2019_UCLA_Royce_Hall_2.jpg/1600px-2019_UCLA_Royce_Hall_2.jpg"
          alt="Royce Hall"
        />
      </div>
      <div
        id="card-footer"
        className="w-full h-auto bg-gray-50 font-sans px-8 py-4"
      >
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt.
      </div>
    </div>
  );
}
