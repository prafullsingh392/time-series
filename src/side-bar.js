import React, { useState } from "react";
import { Calendar, TextInput } from "grommet";
import moment from "moment";
import { v4 as uuid } from "uuid";

export const RainfallSideBar = ({ getData, setData }) => {
  const [getAmount, setAmount] = useState(0);
  // const [getDate, setDate] = useState(new Date().toISOString());
  const [{ day, month, year }, setFormattedDate] = useState({});

  const handleConfirm = () => {
    if (day && month && year) {
      setData([
        ...getData,
        { id: uuid(), amount: getAmount, day, month, year }
      ]);
    } else {
      alert("Select date");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <Calendar
        size="small"
        // date={getDate}
        onSelect={date => {
          // setDate(date);
          const formatDate = moment(date).format("DD-MM-YY");
          const [day, month, year] = formatDate.split("-");
          setFormattedDate({ day, month, year });
        }}
      />
      <TextInput
        value={getAmount}
        type="number"
        style={{ width: "auto", margin: "1rem 2rem" }}
        onChange={({ target: { value } }) => {
          setAmount(value);
        }}
      />
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  );
};
