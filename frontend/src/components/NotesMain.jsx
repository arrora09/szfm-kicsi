import { React, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { DATA } from "../utils.jsx";
import { AddNote } from "./AddNote.jsx";
import { Note } from "./Note.jsx";

export const NotesMain = () => {
  const [notes, setNotes] = useState([]);
  const [isBlured, setIsBlured] = useState(false);
  const [isAddVisible, setIsAddVisible] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:4000/load");
        if (!response.ok) throw new Error("Error loading data");

        const jsonData = await response.json();
        setNotes(jsonData);
      } catch (error) {
        console.error(error);
        // Optionally handle errors here, e.g., show a message
      }
    };

    fetchNotes(); // Call the async function
  }, []); // Empty dependency array means this runs once on mount

  const closePopups = () => {
    setIsBlured(false);
    setIsAddVisible(false);
  };

  /*useEffect(() => {
    console.log(notes);
  }, [notes]);*/

  return (
    <div className={"w-screen h-screen bg-black"}>
      {isBlured && (
        <div className={"absolute backdrop-blur w-screen h-screen z-10"}></div>
      )}
      {isAddVisible && (
        <div
          className={
            "absolute w-screen h-screen flex flex-col justify-center items-center text-white z-20"
          }>
          <AddNote
            notes={notes}
            setNotes={setNotes}
            closePopups={closePopups}
          />
        </div>
      )}
      <div className={"absolute z-10"}>
        <p
          className={
            "mt-4 ml-4 w-14 h-14 text-4xl text-white bg-green  flex flex-col justify-center items-center hover:bg-green hover:cursor-pointer hover:text-black transition-all duration-200"
          }
          style={{ borderRadius: "50%" }}
          onClick={() => {
            setIsBlured(true);
            setIsAddVisible(true);
          }}>
          <FontAwesomeIcon icon={faPlus} />
        </p>
      </div>

      <div className={"absolute z-10 bottom-5 right-5"}>
        <p
          className={
            "mt-4 ml-4 w-14 h-14 text-4xl text-white bg-red  flex flex-col justify-center items-center hover:bg-red hover:cursor-pointer hover:text-black transition-all duration-200"
          }
          style={{ borderRadius: "50%" }}
          onClick={() => {
            console.log("Margithai");
          }}>
          <FontAwesomeIcon icon={faMinus} />
        </p>
      </div>
      {notes.map((note) => {
        return (
          <div key={note.id} className="absolute z-0">
            <Note notes={notes} setNotes={setNotes} {...note}></Note>
          </div>
        );
      })}
    </div>
  );
};
