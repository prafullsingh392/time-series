import React from "react";
import moment from "moment";

export const CustomTooltip = ({ active, payload }) => {
  const [time, value] = payload;
  if (active) {
    return (
      <div className="custom-tooltip">
        <p>Rainfall: {value.value}</p>
        <p>Date: {moment(time.value).format("DD-MM-YY")}</p>
      </div>
    );
  }
  return null;
};
