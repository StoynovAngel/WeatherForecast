const DateManager = ({ weather }) => {
  if (!weather) return null;
  const date = new Date(weather.location.localtime);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};
export default DateManager;
