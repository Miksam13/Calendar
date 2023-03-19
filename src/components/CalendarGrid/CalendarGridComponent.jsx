import React from "react";
import "./calendargrid.scss";
import moment from "moment";
import CelDayWeekComponent from "./CelDayWeekComponent/CelDayWeekComponent";
import CelDayComponent from "./CelDayComponent/CelDayComponent";
import {
  isSelectedMonth,
  isCurrentDay,
  isDayContainCurrentEvent,
} from "../../common/functions";

function CalendarGridComponent(props) {
  const totalDays = 42;
  const day = props.startDay.clone().subtract(1, "day");
  const daysArray = [...Array(totalDays)].map(() => day.add(1, "day").clone());

  return (
    <>
      <div
        className="grid_wrapper"
        style={{
          backgroundColor: "#1E1F21",
          borderBottom: "1px solid #4D4C4D",
        }}
      >
        {[...Array(7)].map((_, index) => (
          <CelDayWeekComponent index={index} key={index} />
        ))}
      </div>
      <div className="grid_wrapper">
        {daysArray.map((dayItem, index) => (
          <CelDayComponent
            key={index}
            dayItem={dayItem}
            moment={moment}
            today={props.today}
            isSelectedMonth={isSelectedMonth}
            isCurrentDay={isCurrentDay}
            events={props.events.filter((event) =>
              isDayContainCurrentEvent(event, dayItem)
            )}
            openModalEvent={props.openModalEvent}
            setDisplayMode={props.setDisplayMode}
          />
        ))}
      </div>
    </>
  );
}

export default CalendarGridComponent;
