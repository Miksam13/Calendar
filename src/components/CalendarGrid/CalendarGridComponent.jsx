import React from "react";
import "./calendargrid.scss";
import moment from "moment";
import CelComponent from "./CelComponent/CelComponent";

const CalendarGridComponent = (props) => {
  const totalDays = 42;
  const day = props.startDay.clone().subtract(1, "day");
  const daysArray = [...Array(totalDays)].map(() => day.add(1, "day").clone());
  const isCurrentDay = (day) => moment().isSame(day, "day");
  const isSelectedMonth = (month) => props.today.isSame(month, "month");

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
          <div
            className="cell_wrapper"
            style={{
              minHeight: "24px",
              color: "#DDDDDD",
            }}
            key={index}
          >
            <div
              className="row_in_cell"
              style={{
                paddingRight: "8px",
              }}
            >
              {moment()
                .day(index + 1)
                .format("ddd")}
            </div>
          </div>
        ))}
      </div>
      <div className="grid_wrapper">
        {daysArray.map((dayItem, index) => (
          <CelComponent
            key={index}
            dayItem={dayItem}
            moment={moment}
            isSelectedMonth={isSelectedMonth}
            isCurrentDay={isCurrentDay}
            events={props.events}
            openModalEvent={props.openModalEvent}
          />
        ))}
      </div>
    </>
  );
};

export default CalendarGridComponent;
