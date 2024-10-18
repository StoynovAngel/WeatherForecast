import React, { useEffect, useState } from "react";
import axios from "axios";
import "../pages/Home.css";
import Navigation from "./Navigation";
import Moon from "./Moon";
const Home = () => {
  const [location, setLocation] = useState("Sofia");
  const [weather, setWeather] = useState(null);
  const [moon, setMoon] = useState(null);
  const [searchTerm, setSearchTerm] = useState(location);
  const [language, setLanguage] = useState("eu");

  useEffect(() => {
    fetchData(location);
  }, [location, language]);

  const fetchData = async (query) => {
    const apiKey = import.meta.env.VITE_API_URL;

    const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}&aqi=yes&lang=${language}`;
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

  const setBackground = () => {
    if (!weather) return null;
    const condition = weather.current.condition.text.toLowerCase();
    if (weather.current.is_day == 1) {
      if (condition.includes("sunny")) return "./src/assets/sunny.jpg";
      if (condition.includes("rain")) return "./src/assets/rainy.jpg";
      if (condition.includes("thunder")) return "./src/assets/stormy.jpg";
      if (condition.includes("cloudy")) return "./src/assets/cloudy.jpg";
    } else {
      if (condition.includes("clear")) return "./src/assets/night-clear.jpg";
      if (condition.includes("cloudy")) return "./src/assets/night-cloud.jpg";
      if (condition.includes("overcast")) return "./src/assets/overcast.jpg";
      if (condition.includes("thunder")) return "./src/assets/stormy.jpg";
    }
    return "./src/assets/default.jpg";
  };

  const setContinent = () => {
    if (!weather) return null;
    const condition = weather.location.tz_id.toLowerCase();
    if (condition.includes("europe")) return "./src/assets/europe.svg";
    if (condition.includes("asia")) return "./src/assets/asia.svg";
    if (condition.includes("thunder")) return "./src/assets/stormy.jpg";
    if (condition.includes("cloudy")) return "./src/assets/cloudy.jpg";
  };

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

  const dateHandler = () => {
    if (!weather) return null;
    const date = new Date(weather.location.localtime);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  return (
    <>
      {weather && (
        <>
          <div className="img-background">
            <div
              className="img-background"
              style={{
                backgroundImage: `url(${setBackground()})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "100vh",
                width: "100%",
              }}
            ></div>
          </div>
          <div className="container-nav">
            <Navigation
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onSearch={handleSearch}
              logo={weather.current.condition.icon}
            />
            <h1 style={{ color: "white" }}>{dateHandler()}</h1>
          </div>
          <div className="container">
            <div className="left-column">
              <div className="header-row">
                <h1>{weather.current.condition.text}</h1>
                <img src={weather.current.condition.icon} />
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
              <div
                style={{
                  backgroundImage: `url(${setContinent()})`,
                  height: "300px",
                  margin: "40px",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            </div>
            {moon && (
              <div className="middle-space">
                <div className="moon-phases">
                  <h2>Moon Phases:</h2>
                  <div className="moon-phase-container">
                    {moonPhases.map((p) => {
                      return (
                        <Moon
                          key={p.phase}
                          src={p.src}
                          moon={moon.moon_phase}
                          phase={moon.moon_phase}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
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
