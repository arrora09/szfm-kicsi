import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsToDot, faX } from "@fortawesome/free-solid-svg-icons";

export const DelNote = (props) => {
  const [deleted, setDeleted] = useState(props.deleted);

  useEffect(() => {
    setDeleted(props.deleted);
  }, [props.deleted]);

  const delNote = async () => {
      props.setDeleted([]);
      const response = await fetch("http://localhost:4000/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...props.notes]),
      });
      if (!response.ok) {
        console.error("Error saving data after restoring note");
      }
  }

  const restoreNote = async (noteId) => {
    const noteToRestore = deleted.find((note) => note.id === noteId);
    if (!noteToRestore) return;

    const updatedNotes = [...props.notes, { ...noteToRestore, isInTrash: false}];
    const updatedDeleted = deleted.filter((note) => note.id !== noteId);

    props.setNotes(updatedNotes);
    props.setDeleted(updatedDeleted);

    const response = await fetch("http://localhost:4000/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...updatedNotes, ...updatedDeleted]),
    });

    if (!response.ok) {
      console.error("Error saving data after restoring note");
    }
  };


  return (
    <div className={"w-96 min-h-fit p-3 bg-gray-200 text-black rounded-xl"}>
      <div
        className={
          "mb-4 w-full text-center flex flex-row justify-between items-center"
        }
      >
        <p></p>
        <p className={"text-xl font-bold mx-8"}>Jegyzet törlése</p>
        <p
          className={
            "text-xl text-red hover:cursor-pointer hover:text-red transition-all"
          }
          onClick={props.closePopups}
        >
          <FontAwesomeIcon icon={faX} />
        </p>
      </div>

      <div className={"mb-4"}>
        <h3 className="text-lg font-semibold mb-2">Törlendő jegyzetek:</h3>
        <ul className="list-disc pl-5 text-sm">
          {props.deleted.map((note, index) => (
            <li key={index}
                className="mb-1 flex flex-row justify-between items-center text-black"
                >
                  <p
                  className="text-xl max-w-72 font-semibold">
                    {note.title}
                  </p>
                  <button
                  className="bg-green text-white hover:cursor-pointer hover:text-black transition-all w-fit h-fit"
                  onClick={() => restoreNote(note.id)}>
                    Visszaállítás
                  </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={() => delNote()}
          className="px-4 py-2 bg-red text-white rounded-md hover:bg-red-hover hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
        >
          Törlés
        </button>
      </div>
    </div>
  );
}