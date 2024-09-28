import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export const AddNote = (props) => {
  const [addDisabled, setAddDisabled] = useState(false);
  const [newNote, setNewNote] = useState({
    title: "",
    description: "",
    color: "#ffffff",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNote({ ...newNote, [name]: value });
  };

  const saveNote = () => {
    const note = { ...newNote, pos: { x: 0, y: 0 } };
    props.setNotes([...props.notes, note]);
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
        <p className={"text-xl font-bold "}>Jegyzet jétrehozása</p>
        <p
          className={
            "text-xl text-red-800 hover:cursor-pointer hover:text-red-600 transition-all"
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
              className="block text-sm font-medium text-gray-700"
            >
              Jegyzet címe
            </label>
            <input
              type="text"
              name="title"
              value={newNote.title}
              onChange={handleChange}
              maxLength={50}
              className="mt-1 p-2 block w-full text-black border bg-white border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 "
              placeholder="Ide írja a címet!"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Jegyzet leírása
            </label>
            <textarea
              name="description"
              value={newNote.description}
              onChange={handleChange}
              maxLength={160}
              rows={4}
              className="mt-1 p-2 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-black"
              placeholder="Ide írja a leírást!"
            />
          </div>

          <div className=" flex flex-row justify-between items-end">
            <div>
              <label
                htmlFor="color"
                className="block text-sm font-medium text-gray-700"
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
                className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-red-600 disabled:hover:bg-red-500 transition-all disabled:hover:cursor-not-allowed"
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
