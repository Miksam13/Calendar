import React from "react";
import "./header.scss";

const HeaderComponent = (props) => {
  return (
    <div className="body_wrapper">
      <div>
        <span>
          <b>{props.today.format("MMMM")}</b>
        </span>
        <span>{props.today.format("YYYY")}</span>
      </div>
      <div className="buttons_wrapper">
        <button onClick={props.prevHandler}> &lt; </button>
        <button onClick={props.todayHandler} className="today_btn">
          Today
        </button>
        <button onClick={props.nextHandler}> &gt; </button>
      </div>
    </div>
  );
};

export default HeaderComponent;
