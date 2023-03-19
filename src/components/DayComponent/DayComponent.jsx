import React, { useEffect, useState } from "react";
import "./day.scss";
import moment from "moment";
import {
  isDayContainCurrentEvent,
  isDayContainCurrentTimeStamp,
} from "../../common/functions";
import { ITEMS_PER_DAY } from "../../common/constants";

const DayComponent = (props) => {
  const eventList = props.events.filter((event) =>
    isDayContainCurrentEvent(event, props.today)
  );

  const [showTimePicker, setTimePicker] = useState(false);

  const cells = [...new Array(ITEMS_PER_DAY)].map((_, index) => {
    const temp = [];
    eventList.forEach((event) => {
      if (+moment.unix(+event.date).format("H") === index) {
        temp.push(event);
      }
    });
    return temp;
  });

  const setTimeForEvent = (i) => {
    setTimePicker(false);
    const time = moment.unix(+props.selectedEvent.date).hours(i).format("X");
    props.changeEventHandler(time, "date");
  };

  const getRedLinePosition = () =>
    ((moment().format("X") - props.today.format("X")) / 86400) * 100;

  const [, setCounter] = useState(0);
  useEffect(() => {
    const timerId = setInterval(() => {
      setCounter((prevState) => prevState + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);
  return (
    <>
      <div className="day_show_wrapper">
        <div className="events_list_wrapper">
          <div className="scale_wrapper">
            {isDayContainCurrentTimeStamp(moment().format("X"), props.today) ? (
              <div
                className="red_line"
                style={{ top: `${getRedLinePosition()}%` }}
              />
            ) : null}
            {cells.map((eventsList, index) => (
              <div key={index} className="scale_cell_wrapper">
                <div className="scale_cell_time_wrapper">
                  {index ? <>{`${index}`.padStart(2, "0")}:00</> : null}
                </div>
                <div className="scale_cell_event_wrapper">
                  {eventsList.map((event, index) => (
                    <button
                      key={index}
                      onClick={() => props.openFormHandler("Update", event)}
                      className="btn_event_item"
                    >
                      {event.title}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="event_form_wrapper">
          {props.selectedEvent ? (
            <div>
              <input
                className="event_title"
                value={props.selectedEvent.title}
                onChange={(e) =>
                  props.changeEventHandler(e.target.value, "title")
                }
                placeholder="Write title event"
              />
              <div className="select_event_time_wrapper">
                <div style={{ position: "relative" }}>
                  <button>
                    {moment
                      .unix(+props.selectedEvent.date)
                      .format("dddd, D MMMM")}
                  </button>
                </div>
                <div style={{ position: "relative" }}>
                  <button onClick={() => setTimePicker(!showTimePicker)}>
                    {moment.unix(+props.selectedEvent.date).format("HH:mm")}
                  </button>
                  {showTimePicker ? (
                    <ul className="list_hours">
                      {[...new Array(ITEMS_PER_DAY)].map((_, index) => (
                        <li>
                          <button
                            className="hours_btn"
                            onClick={() => setTimeForEvent(index)}
                          >
                            {`${index}`.padStart(2, "0")}:00
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
              <textarea
                className="event_body"
                value={props.selectedEvent.description}
                onChange={(e) =>
                  props.changeEventHandler(e.target.value, "description")
                }
                placeholder="Write description event"
              />
              <div className="buttons_wrapper">
                <button onClick={props.closeModalEvent}>Cancel</button>
                <button onClick={props.eventFetchHandler}>
                  {props.method}
                </button>
                {props.method === "Update" ? (
                  <button onClick={props.eventDeleteHandler}>Delete</button>
                ) : null}
              </div>
            </div>
          ) : (
            <>
              <div>
                <button
                  onClick={() =>
                    props.openFormHandler("Create", null, props.today)
                  }
                >
                  Create a new event
                </button>
              </div>
              <div className="msg_not_event">No event selected</div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DayComponent;
