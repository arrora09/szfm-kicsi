import { React, useEffect, useState } from "react";
import { NotesMain } from "./components/NotesMain.jsx";
import ParticlesComponent from "./components/Particles";

function App() {
  return (
    <>
      <ParticlesComponent id="particles" />
      <NotesMain />
    </>
  );
}

export default App;
