import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export const AddNote = (props) => {
  const [addDisabled, setAddDisabled] = useState(false);
  const [newNote, setNewNote] = useState({
    title: "",
    description: "",
    color: "#ffff00",
    isInTrash: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNote({ ...newNote, [name]: value });
  };

  const genID = (l) => {
    return l.length !== 0 ? Math.max(...l.map((value) => value.id)) + 1 : 0;
  };

  const saveNote = async () => {
    const note = {
      ...newNote,
      pos: { x: 200, y: 200 },
      id: genID([...props.notes, ...props.deleted]),
    };
    const newNotes = [...props.notes, note];
    props.setNotes(newNotes);

    const response = await fetch("http://localhost:4000/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNotes),
    });
    if (!response.ok) console.error("Error saving data");

    props.closePopups();
  };

  useEffect(() => {
    if (!newNote.title.trim()) {
      setAddDisabled(true);
      return;
    }

    if (!newNote.color.trim()) {
      setAddDisabled(true);
      return;
    }

    setAddDisabled(false);
  }, [newNote]);

  return (
    <div className={"w-fit min-h-fit p-3 bg-gray-200 text-black rounded-xl"}>
      <div
        className={
          "mb-4 w-full text-center flex flex-row justify-between items-center"
        }
      >
        <p></p>
        <p className={"text-xl font-bold mx-8"}>Jegyzet létrehozása</p>
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
        <div>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray"
            >
              Jegyzet címe
            </label>
            <input
              type="text"
              name="title"
              value={newNote.title}
              onChange={handleChange}
              maxLength={50}
              className="mt-1 p-2 block w-full text-black border bg-white border-gray rounded-md shadow-sm focus:ring-green focus:border-green "
              placeholder="Ide írja a címet!"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray"
            >
              Jegyzet leírása
            </label>
            <textarea
              name="description"
              value={newNote.description}
              onChange={handleChange}
              maxLength={160}
              rows={4}
              className="mt-1 p-2 block w-full resize-none bg-white border border-gray rounded-md shadow-sm focus:ring-green focus:border-green text-black"
              placeholder="Ide írja a leírást!"
            />
          </div>

          <div className=" flex flex-row justify-between items-end">
            <div>
              <label
                htmlFor="color"
                className="block text-sm font-medium text-gray"
              >
                Jegyzet színe
              </label>
              <input
                type="color"
                name="color"
                value={newNote.color}
                onChange={handleChange}
                className="mt-1 p-2 h-10 w-24  rounded-md shadow-sm hover:cursor-pointer"
              />
            </div>
            <div className="">
              <button
                onClick={() => saveNote()}
                disabled={addDisabled}
                className="px-4 py-2 bg-green text-white rounded-md hover:bg-green hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green disabled:bg-red disabled:hover:bg-red transition-all disabled:hover:cursor-not-allowed"
              >
                Létrehozás
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
