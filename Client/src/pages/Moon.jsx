import React from "react";
import { useMoonContext } from "../context/MoonContext";

const Moon = ({ src, phase }) => {
  const { moon_phase } = useMoonContext();
  return (
    <>
      <img
        src={src}
        className={moon_phase === phase ? "highlighted-phase" : ""}
        alt={phase}
      />
    </>
  );
};

export default Moon;
