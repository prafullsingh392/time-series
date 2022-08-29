import React, { useState } from "react";
import { TimeSeriesChart } from "./chart";
import { RainfallSideBar } from "./side-bar";
import moment from "moment";

const dateToUnix = (day, month, year) => {
  const toDate = moment(`${day}-${month}-${year}`, "DD-MM-YY").toDate();
  const toUnix = toDate.getTime();
  return toUnix;
};

export const formatData = data =>
  data.map(({ id, amount, day, month, year }) => {
    return {
      id,
      value: amount,
      time: dateToUnix(day, month, year)
    };
  });

export const App = () => {
  const [getData, setData] = useState([]);
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "grid",
        gridTemplateColumns: "2fr 1fr"
      }}
    >
      <TimeSeriesChart getData={getData} />
      <RainfallSideBar getData={getData} setData={setData} />
    </div>
  );
};
