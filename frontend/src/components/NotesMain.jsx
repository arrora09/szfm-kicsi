import { React, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { DATA } from "../utils.jsx";
import { AddNote } from "./AddNote.jsx";

export const NotesMain = () => {
  const [notes, setNotes] = useState([]);
  const [isBlured, setIsBlured] = useState(false);
  const [isAddVisible, setIsAddVisible] = useState(false);

  useEffect(() => {
    setNotes([]);
    //setNotes([...DATA.notes]);
  }, []);

  const closePopups = () => {
    setIsBlured(false);
    setIsAddVisible(false);
  };

  useEffect(() => {
    console.log(notes);
  }, [notes]);

  return (
    <div className={"w-screen h-screen bg-black"}>
      {isBlured && (
        <div className={"absolute backdrop-blur w-screen h-screen z-10"}></div>
      )}
      {isAddVisible && (
        <div
          className={
            "absolute w-screen h-screen flex flex-col justify-center items-center text-white z-20"
          }
        >
          <AddNote
            notes={notes}
            setNotes={setNotes}
            closePopups={closePopups}
          />
        </div>
      )}
      <div className={"absolute"}>
        <p
          className={
            "mt-4 ml-4 w-14 h-14 text-4xl bg-green-900  flex flex-col justify-center items-center hover:bg-green-700 hover:cursor-pointer hover:text-black transition-all duration-100"
          }
          style={{ borderRadius: "50%" }}
          onClick={() => {
            setIsBlured(true);
            setIsAddVisible(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </p>
      </div>
    </div>
  );
};
