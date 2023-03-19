import React from "react";
import "./header.scss";
import { DISPLAY_MODE_MONTH, DISPLAY_MODE_DAY } from "../../common/constants";

const HeaderComponent = (props) => {
  return (
    <div className="header_wrapper">
      <div>
        {props.displayMode === DISPLAY_MODE_DAY ? (
          <span>{props.today.format("DD")}</span>
        ) : null}
        <span>
          <b>{props.today.format("MMMM")}</b>
        </span>
        <span>{props.today.format("YYYY")}</span>
      </div>
      <div className="buttons_center_wrapper">
        <button
          style={
            props.displayMode === DISPLAY_MODE_MONTH
              ? { color: "#a4a6a9", backgroundColor: "#27282A" }
              : { color: "#E6E6E6", backgroundColor: "#565759" }
          }
          onClick={() => props.setDisplayMode(DISPLAY_MODE_MONTH)}
        >
          Month
        </button>
        <button
          style={
            props.displayMode === DISPLAY_MODE_DAY
              ? { color: "#a4a6a9", backgroundColor: "#27282A" }
              : { color: "#E6E6E6", backgroundColor: "#565759" }
          }
          onClick={() => props.setDisplayMode(DISPLAY_MODE_DAY)}
          className="today_btn"
        >
          Day
        </button>
      </div>
      <div className="buttons_wrapper">
        <button onClick={props.prevHandler}> &lt; </button>
        <button
          style={{ backgroundColor: "#565759" }}
          onClick={props.todayHandler}
          className="today_btn"
        >
          Today
        </button>
        <button onClick={props.nextHandler}> &gt; </button>
      </div>
    </div>
  );
};

export default HeaderComponent;
