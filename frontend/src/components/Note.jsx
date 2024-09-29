import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";

export const Note = (props) => {
  const [x, setX] = useState(props.note.pos.x);
  const [y, setY] = useState(props.note.pos.y);

  useEffect(() => {
    setX(props.note.pos.x);
    setY(props.note.pos.y);
  }, [props.note]);

  return (
    <Draggable
      position={{ x, y }}
      cancel=".react-resizable-handle"
      onDrag={(e, data) => {
        setX((prev) => prev + data.deltaX);
        setY((prev) => prev + data.deltaY);
      }}
      onStop={async () => {
        const getDeleteZonePosition = () => {
          const deleteZone = document.getElementById("delete_zone");
          if (deleteZone) {
            const rect = deleteZone.getBoundingClientRect();
            return {
              x: rect.left + rect.width / 2 - 45,
              y: rect.bottom + rect.height / 2 - 95,
              radius: Math.max(rect.width, rect.height) / 2,
            };
          }
          return null;
        };

        //console.log(getDeleteZonePosition());

        const deleteZone = getDeleteZonePosition();

        if (deleteZone) {
          const distanceToDeleteZone = Math.sqrt(
            Math.pow(deleteZone.x - x, 2) + Math.pow(deleteZone.y - y, 2),
          );

          const deleteThreshold = deleteZone.radius + 45;

          if (distanceToDeleteZone <= deleteThreshold) {
            const updatedNotes = props.notes.map((value) =>
              value.id === props.note.id
                ? {
                    ...value,
                    isInTrash: true,
                  }
                : value,
            );

            //props.setNotes(updatedNotes);
            const updatedDelete = [
              ...props.deleted,
              ...updatedNotes.filter((value) => value.isInTrash),
            ];
            props.setNotes(updatedNotes.filter((value) => !value.isInTrash));
            props.setDeleted(updatedDelete);
            const response = await fetch("http://localhost:4000/save", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify([
                ...updatedNotes.filter((value) => !value.isInTrash),
                ...updatedDelete,
              ]),
            });

            if (!response.ok)
              console.error("Error saving data after deleting note");
            return;
          }
        }

        const newNotes = props.notes.map((note) => {
          if (note.id === props.note.id) {
            return {
              ...note,
              pos: { x, y },
            };
          }
          return note;
        });

        props.setNotes(newNotes);
        // console.log("x:" + x, "y:" + y);

        const response = await fetch("http://localhost:4000/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newNotes),
        });
        if (!response.ok) console.error("Error saving data");
      }}
    >
      <div
        className={`shadow-lg font-sans text-sm p-2 rounded-lg text-center text-black`}
        style={{ backgroundColor: props.note.color }}
      >
        <span className="font-sans text-xl px-4 mix-blend-normal">
          {props.note.title}
        </span>

        {props.note.description && (
          <p className="font-sans text-xs px-4 mix-blend-normal max-w-48 break-words">
            {props.note.description}
          </p>
        )}
      </div>
    </Draggable>
  );
};
