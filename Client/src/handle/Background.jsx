import React from "react";

const Background = ({ weather }) => {
  const setBackground = () => {
    if (!weather) return null;
    const condition = weather.current.condition.text.toLowerCase();
    if (weather.current.is_day) {
      if (condition.includes("sunny")) return "./src/assets/sunny.jpg";
      if (condition.includes("rain")) return "./src/assets/rainy.jpg";
      if (condition.includes("thunder")) return "./src/assets/stormy.jpg";
      if (condition.includes("cloudy")) return "./src/assets/cloudy.jpg";
    } else {
      if (condition.includes("clear")) return "./src/assets/night-clear.jpg";
      if (condition.includes("cloudy")) return "./src/assets/night-cloud.jpg";
      if (condition.includes("rain")) return "./src/assets/light-rain.jpg";
      if (condition.includes("overcast")) return "./src/assets/overcast.jpg";
      if (condition.includes("thunder")) return "./src/assets/stormy.jpg";
      if (condition.includes("mist")) return "./src/assets/night-mist.jpg";
    }
    return "./src/assets/default.jpg";
  };
  const value = setBackground();

  return (
    value && (
      <div className="img-background">
        <div
          className="img-background"
          style={{
            backgroundImage: `url(${value})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            width: "100%",
          }}
        ></div>
      </div>
    )
  );
};

export default Background;
