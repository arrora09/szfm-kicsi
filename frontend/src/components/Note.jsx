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
