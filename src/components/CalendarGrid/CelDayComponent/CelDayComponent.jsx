import React from "react";
import { DISPLAY_MODE_DAY } from "../../../common/constants";

function CelDayComponent(props) {
  return (
    <>
      <div
        className="cell_wrapper"
        key={props.dayItem.format("DDMMYYYY")}
        style={{
          minHeight: "94px",
          backgroundColor:
            props.dayItem.day() === 6 || props.dayItem.day() === 0
              ? "#272829"
              : "#1E1F21",
          color: props.isSelectedMonth(props.dayItem, props.today)
            ? "#DDDDDD"
            : "#555759",
        }}
      >
        <div className="row_in_cell">
          <div className="show_day_wrapper">
            <div
              onDoubleClick={(e) =>
                props.openModalEvent("Create", null, props.dayItem)
              }
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
            {props.events.slice(0, 2).map((event) => (
              <li key={event.id}>
                <button
                  className="event_item_wrapper"
                  onDoubleClick={(e) => props.openModalEvent("Update", event)}
                >
                  {event.title}
                </button>
              </li>
            ))}
            {props.events.length > 2 ? (
              <li key="show more">
                <button
                  onClick={() => props.setDisplayMode(DISPLAY_MODE_DAY)}
                  className="event_item_wrapper"
                >
                  show more...
                </button>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </>
  );
}

export default CelDayComponent;
