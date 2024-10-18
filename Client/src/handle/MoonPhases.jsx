import React from "react";
import { useMoonContext } from "../context/MoonContext";
import Moon from "../pages/Moon";

const MoonPhases = () => {
  const { moonPhases } = useMoonContext();
  return (
    <>
      <div className="moon-phases">
        <div className="moon-phase-container">
          {moonPhases.map((p) => {
            return <Moon key={p.phase} src={p.src} phase={p.phase} />;
          })}
        </div>
      </div>
    </>
  );
};

export default MoonPhases;
