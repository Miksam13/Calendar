import React from "react";

const CelComponent = (props) => {
  return (
    <div
      className="cell_wrapper"
      key={props.dayItem.format("DDMMYYYY")}
      style={{
        minHeight: "80px",
        backgroundColor:
          props.dayItem.day() === 6 || props.dayItem.day() === 0
            ? "#272829"
            : "#1E1F21",
        color: props.isSelectedMonth(props.dayItem) ? "#DDDDDD" : "#555759",
      }}
    >
      <div className="row_in_cell">
        <div className="show_day_wrapper">
          <div
            onDoubleClick={(e) => props.openModalEvent("Create")}
            className="day_wrapper"
          >
            {props.isCurrentDay(props.dayItem) ? (
              <div className="current_day">{props.dayItem.format("D")}</div>
            ) : (
              props.dayItem.format("D")
            )}
          </div>
        </div>
        <ul className="event_list">
          {props.events
            .filter(
              (event) =>
                event.date >= props.dayItem.format("X") &&
                event.date <= props.dayItem.clone().endOf("day").format("X")
            )
            .map((event) => (
              <li key={event.id}>
                <button
                  className="event_item_wrapper"
                  onDoubleClick={(e) => props.openModalEvent("Update", event)}
                >
                  {event.title}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CelComponent;
