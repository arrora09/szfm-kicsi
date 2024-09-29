import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsToDot, faX } from "@fortawesome/free-solid-svg-icons";

export const DelNote = (props) => {


  return (
<div className={"w-fit min-h-fit p-3 bg-gray-200 text-black rounded-xl"}>
  <div className={"mb-4 w-full text-center flex flex-row justify-between items-center"}>
    <p></p>
    <p className={"text-xl font-bold mx-8"}>Jegyzet törlése</p>
    <p
      className={"text-xl text-red hover:cursor-pointer hover:text-red transition-all"}
      onClick={props.closePopups}
    >
      <FontAwesomeIcon icon={faX} />
    </p>
  </div>

  <div className={"mb-4"}>
    <h3 className="text-lg font-semibold mb-2">Törlendő jegyzetek:</h3>
    <ul className="list-disc pl-5 text-sm">
      {props.notes.map((note, index) => (
        <li key={index} className="mb-1">
          {note.title}
        </li>
      ))}
    </ul>
  </div>

  <div className="flex justify-end mt-4">
    <button
      onClick={() => props.delNote()}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
    >
      Törlés
    </button>
  </div>
</div>
  );
};