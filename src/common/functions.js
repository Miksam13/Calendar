import moment from "moment/moment";

export const isCurrentDay = (day) => moment().isSame(day, "day");
export const isSelectedMonth = (month, today) => today.isSame(month, "month");
export const isDayContainCurrentTimeStamp = (firstArg, secondArg) =>
  firstArg >= secondArg.startOf("day").format("X") &&
  firstArg <= secondArg.clone().endOf("day").format("X");
export const isDayContainCurrentEvent = (event, dayItem) =>
  isDayContainCurrentTimeStamp(event.date, dayItem);
