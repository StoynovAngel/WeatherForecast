const HourManager = ({ weather }) => {
  if (!weather) return null;
  const date = new Date(weather.location.localtime);
  const options = { hour: "numeric", minute: "numeric", second: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

export default HourManager;
