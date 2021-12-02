import React from "react";
import StudyGroupCard from "./StudyGroupCard";

export default function StudyGroupCardList() {
  const groups = [
    {
      groupName: "Final Review Session",
      groupID: 0,
      subject: "CS 35L",
      location: "Royce Hall",
      pictureURL:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/2019_UCLA_Royce_Hall_2.jpg/1600px-2019_UCLA_Royce_Hall_2.jpg",
      description: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
            illo inventore veritatis et quasi architecto beatae vitae dicta sunt
            explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
            odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt.`,
      numAttendence: 5,
      groupCreator: "Bryson",
    },
    {
      groupName: "Random Study Session",
      groupID: 1,
      subject: "CS M51A",
      location: "Young Research Library",
      pictureURL:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2019_UCLA_Charles_E._Young_Research_Library.jpg/600px-2019_UCLA_Charles_E._Young_Research_Library.jpg",
      description: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
            illo inventore veritatis et quasi architecto beatae vitae dicta sunt
            explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
            odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt.`,
      numAttendence: 5,
      groupCreator: "Bryson",
    },
  ];

  const listItems = groups.map((group) => (
    <StudyGroupCard
      groupName={group.groupName}
      subject={group.subject}
      location={group.location}
      pictureURL={group.pictureURL}
      description={group.description}
      numAttendence={group.numAttendence}
      groupCreator={group.groupCreator}
      key={group.groupID}
      date_time={group.date_time}
    />
  ));
  return <div>{listItems}</div>;
}
