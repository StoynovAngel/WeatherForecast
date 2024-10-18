import React, { useEffect, useState } from "react";
import axios from "axios";
import "../pages/Home.css";
import Navigation from "./Navigation";
import Background from "../handle/Background";
import MoonPhases from "../handle/MoonPhases";
import { MoonProvider } from "../context/MoonContext";
import DateManager from "../handle/DateManager";

const Home = () => {
  const [location, setLocation] = useState("Sofia");
  const [weather, setWeather] = useState(null);
  const [moon, setMoon] = useState(null);
  const [searchTerm, setSearchTerm] = useState(location);

  useEffect(() => {
    fetchData(location);
  }, [location]);

  const fetchData = async (query) => {
    const apiKey = import.meta.env.VITE_API_URL;

    const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}&aqi=yes`;
    const astronomyUrl = `https://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${query}`;
    try {
      const weatherResponse = await axios.get(weatherUrl);
      const astronomyResponse = await axios.get(astronomyUrl);

      setWeather(weatherResponse.data);
      setMoon(astronomyResponse.data.astronomy.astro);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLocation(searchTerm);
  };

  return (
    <>
      {weather && (
        <>
          <Background weather={weather} />
          <div className="container-nav">
            <Navigation
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onSearch={handleSearch}
              logo={weather.current.condition.icon}
              weather={weather}
            />
          </div>
          <div className="container">
            <div className="left-column">
              <div className="header-row">
                <h1>{weather.current.condition.text}</h1>
              </div>

              <div className="temperature-row">
                <img src="./src/assets/cloud.svg" alt="Cloud" />
                <img src="./src/assets/compass.svg" alt="Compass" />
                <img src="./src/assets/degree.svg" alt="Degree" />
              </div>
              <div className="temperature-row">
                <p>{weather.current.wind_kph}</p>
                <p>{weather.current.wind_dir}</p>
                <p>{weather.current.wind_degree}</p>
              </div>
              <div className="specific-content">
                <p>Pressure: {weather.current.pressure_mb} mb</p>
                <p>Uv: {weather.current.uv}</p>
                <p>Visibility: {weather.current.vis_km} km</p>
                <p>Cloud: {weather.current.cloud}</p>
              </div>
            </div>
            <div className="middle-space">
              {!moon.is_moon_up && (
                <MoonProvider moon_phase={moon.moon_phase}>
                  <div className="moon-phases">
                    <h2>Moon Phases:</h2>
                    <div className="moon-phase-container">
                      <MoonPhases />
                    </div>
                  </div>
                </MoonProvider>
              )}
            </div>
            <div className="right-column">
              <h1>{weather.current.temp_c}&deg; C</h1>
              <h3>-{weather.location.tz_id}</h3>
              <div className="context">
                <h2>
                  -{weather.location.name}, {weather.location.country}
                </h2>
                <img src="./src/assets/planet.svg" alt="Planet" />
              </div>
              <div className="context">
                <img src="./src/assets/sunrise.svg" alt="Sunrise " />
                <h2>{moon.sunrise}</h2>
                <img src="./src/assets/sunset.svg" alt="Sunset" />
                <h2>{moon.sunset}</h2>
              </div>

              <div className="context">
                <img src="./src/assets/temp.svg" alt="temp" />
                <h2>{weather.current.feelslike_c}&deg; C</h2>
                <img src="./src/assets/temp.svg" alt="temp" />
                <h2>{weather.current.feelslike_f}&deg; F</h2>
              </div>
              <div className="context">
                <img src="./src/assets/co2.svg" alt="Co2" />
                <h2>{weather.current.air_quality.co} μg/m3</h2>
                <img src="./src/assets/ozone.svg" alt="Ozone" />
                <h2>{weather.current.feelslike_f} μg/m3</h2>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
