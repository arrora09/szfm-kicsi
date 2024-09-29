import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";

export const Note = (props) => {
  const [x, setX] = useState(props.pos.x);
  const [y, setY] = useState(props.pos.y);

  return (
    <Draggable
      position={{ x, y }} // Use shorthand for position
      cancel=".react-resizable-handle"
      onDrag={(e, data) => {
        // Use data to get movement
        setX((prev) => prev + data.deltaX); // Update x position
        setY((prev) => prev + data.deltaY); // Update y position
      }}
      onStop={async () => {
        const getDeleteZonePosition = () => {
          const deleteZone = document.getElementById("delete_zone");
          if (deleteZone) {
            const rect = deleteZone.getBoundingClientRect();
            return {
              x: rect.left + (rect.width / 2) - 45,  // Center x position of the red minus
              y: rect.bottom + (rect.height / 2) - 95,
              radius: Math.max(rect.width, rect.height) / 2, // Assume circular radius
            };
          }
          return null;
        };

        console.log(getDeleteZonePosition());

        const deleteZone = getDeleteZonePosition();

        if (deleteZone) {
          const distanceToDeleteZone = Math.sqrt(
            Math.pow(deleteZone.x - x, 2) + Math.pow(deleteZone.y - y, 2)
          );

          const deleteThreshold = deleteZone.radius + 45;

          if (distanceToDeleteZone <= deleteThreshold) {
            // Delete the note by filtering it out of the notes array
            const updatedNotes = props.notes.filter((note) => note.id !== props.id);
            props.setNotes(updatedNotes);

            const response = await fetch("http://localhost:4000/save", {
              method: "POST",
              headers: {
               "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedNotes),
            });

            if (!response.ok) console.error("Error saving data after deleting note");
            return;
          }
        }

        const newNotes = props.notes.map((note) => {
          if (note.id === props.id) {
            return {
              ...note,
              pos: { x, y },
            };
          }
          return note;
        });

        props.setNotes(newNotes);
        console.log("x:" + x, "y:" + y);

        const response = await fetch("http://localhost:4000/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newNotes),
        });
        if (!response.ok) console.error("Error saving data");
      }}>
      <div
        className={`shadow-lg font-sans text-sm p-2 rounded-lg text-center`}
        style={{ backgroundColor: props.color }}>
        <span className="font-sans text-xl px-4 mix-blend-normal">
          {props.title}
        </span>

        {props.description && (
          <p className="font-sans text-xs px-4 mix-blend-normal max-w-48 break-words">
            {props.description}
          </p>
        )}
      </div>
    </Draggable>
  );
};
