export const dateToString = (date, separator = "/", lang = "tr") => {
  const formatterDate = new Date(date);
  let day = formatterDate.getDate();
  let month = formatterDate.getMonth() + 1;
  const year = formatterDate.getFullYear();

  if (lang === "en") {
    return `${year + separator}${
      (month < 10 ? `0${month}` : month) + separator
    }${day < 10 ? `0${day}` : day}`;
  }

  return `${(day < 10 ? `0${day}` : day) + separator}${
    (month < 10 ? `0${month}` : month) + separator
  }${year}`;
};

export const timeToString = (date) => {
  const formatterDate = new Date(date);
  let hours = formatterDate.getHours().toString();
  let minutes = formatterDate.getMinutes().toString();

  minutes = Number(minutes) < 10 ? "0" + minutes : minutes;
  hours = Number(hours) < 10 ? "0" + hours : hours;
  return `${hours}:${minutes}`;
};

export const dateToMask = (date, separator = "/") => {
  const getDate = new Date(date);
  const getDay =
    getDate.getDate() < 10 ? `0${getDate.getDate()}` : getDate.getDate();
  const getMonth =
    getDate.getMonth() + 1 < 10
      ? `0${getDate.getMonth() + 1}`
      : getDate.getMonth() + 1;
  const getYear = getDate.getFullYear();

  return `${getDay}${separator}${getMonth}${separator}${getYear}`;
};
