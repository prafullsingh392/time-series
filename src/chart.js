import moment from "moment";
import React, { useState } from "react";
import styled from "styled-components";
import {
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import { CustomTooltip } from "./custom-tooltip";
import { formatData } from "./app";

const Box = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const BtnBox = styled.div`
  display: flex;
`;

const BtnDateUnit = styled.p`
  color: green;
  border-bottom: ${p => p.activeKey === p.getActiveKey && `1px solid green`};
  cursor: pointer;
  margin-right: 1rem;
  &::last-of-type {
    margin-right: 0;
  }
`;

export const TimeSeriesChart = ({ getData }) => {
  // Constants
  const oneMonth = 30;
  const threeMonths = 90;
  const oneYear = 365;
  const oneMonthStr = "one-month";
  const threeMonthsStr = "three-months";
  const oneYearStr = "one-year";
  // State
  const [getDateUnit, setDateUnit] = useState(oneMonth);
  const [getActiveKey, setActiveKey] = useState(oneMonthStr);
  // Click handlers
  const handleDateUnit = (days, activeKey) => () => {
    setActiveKey(activeKey);
    setDateUnit(days);
  };
  const handleOneMonth = handleDateUnit(oneMonth, oneMonthStr);
  const handleThreeMonths = handleDateUnit(threeMonths, threeMonthsStr);
  const handleOneYear = handleDateUnit(oneYear, oneYearStr);
  // Filter data
  const formattedData = formatData(getData);
  const filteredData = formattedData.filter(({ time }) =>
    moment(time).isAfter(moment().subtract(getDateUnit, "days"))
  );
  const sortedData = filteredData.sort((a, b) => b.time - a.time);

  // JSX
  return (
    <Box>
      <ResponsiveContainer width="100%" height={500}>
        <ScatterChart>
          <XAxis
            dataKey="time"
            domain={["auto", "auto"]}
            name="Time"
            tickFormatter={unixTime => moment(unixTime).format("DD-MM-YY")}
            type="number"
          />
          <YAxis dataKey="value" name="Value" />
          <Scatter
            data={sortedData}
            line={{ stroke: "#d3d3d3" }}
            lineType="joint"
            lineJointType="monotoneX"
            name="Values"
          />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid strokeDasharray="3 3" />
        </ScatterChart>
      </ResponsiveContainer>
      <BtnBox>
        <BtnDateUnit
          getActiveKey={getActiveKey}
          activeKey={oneMonthStr}
          onClick={handleOneMonth}
        >
          1M
        </BtnDateUnit>
        <BtnDateUnit
          getActiveKey={getActiveKey}
          activeKey={threeMonthsStr}
          onClick={handleThreeMonths}
        >
          3M
        </BtnDateUnit>
        <BtnDateUnit
          getActiveKey={getActiveKey}
          activeKey={oneYearStr}
          onClick={handleOneYear}
        >
          1Y
        </BtnDateUnit>
      </BtnBox>
    </Box>
  );
};
