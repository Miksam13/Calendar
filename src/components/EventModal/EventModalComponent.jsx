import React from "react";
import "./eventmodal.scss";

const EventModalComponent = (props) => {
  return (
    <div className="event_popup" onClick={props.closeModalEvent}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        className="event_popup_body"
      >
        <input
          className="event_title"
          value={props.title}
          onChange={(e) => props.changeEventHandler(e.target.value, "title")}
          placeholder="Write title event"
        />
        <textarea
          className="event_body"
          value={props.description}
          onChange={(e) =>
            props.changeEventHandler(e.target.value, "description")
          }
          placeholder="Write description event"
        />
        <div className="buttons_wrapper">
          <button onClick={props.closeModalEvent}>Cancel</button>
          <button onClick={props.eventFetchHandler}>{props.method}</button>
          {props.method === "Update" ? (
            <button onClick={props.eventDeleteHandler}>Delete</button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default EventModalComponent;
