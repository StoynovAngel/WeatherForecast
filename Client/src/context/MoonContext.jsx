import React, { createContext, useContext } from "react";
const MoonContext = createContext();
export const MoonProvider = ({ children, moon_phase }) => {
  const moonPhases = [
    { phase: "New Moon", src: "./src/assets/moonphase1.svg" },
    { phase: "Waxing Crescent", src: "./src/assets/moonphase2.svg" },
    { phase: "First Quarter", src: "./src/assets/moonphase3.svg" },
    { phase: "Waxing Gibbous", src: "./src/assets/moonphase4.svg" },
    { phase: "Full Moon", src: "./src/assets/moonphase5.svg" },
    { phase: "Waning Gibbous", src: "./src/assets/moonphase6.svg" },
    { phase: "Last Quarter", src: "./src/assets/moonphase7.svg" },
    { phase: "Waning Crescent", src: "./src/assets/moonphase8.svg" },
  ];

  return (
    <MoonContext.Provider value={{ moonPhases, moon_phase }}>
      {children}
    </MoonContext.Provider>
  );
};

export const useMoonContext = () => useContext(MoonContext);
