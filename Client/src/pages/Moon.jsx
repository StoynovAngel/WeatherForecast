import React from "react";

const Moon = ({ src, moon, phase }) => {
  return (
    <>
      <img
        src={src}
        className={moon.moon_phase === phase ? "highlighted-phase" : ""}
        alt={phase}
      />
    </>
  );
};

export default Moon;
