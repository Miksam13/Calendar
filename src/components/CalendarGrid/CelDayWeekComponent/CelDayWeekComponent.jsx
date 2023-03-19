import React from "react";
import moment from "moment";

function CelDayWeekComponent(props) {
  return (
    <div
      className="cell_wrapper"
      style={{
        minHeight: "24px",
        color: "#DDDDDD",
      }}
      key={props.index}
    >
      <div
        className="row_in_cell"
        style={{
          paddingRight: "8px",
        }}
      >
        {moment()
          .day(props.index + 1)
          .format("ddd")}
      </div>
    </div>
  );
}

export default CelDayWeekComponent;
