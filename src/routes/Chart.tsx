import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React from "react";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import { fetchCoinChart } from "../api";

interface IHistorical {
  close: string;
  high: string;
  low: string;
  market_cap: number;
  open: string;
  time_close: number;
  time_open: number;
  volume: string;
}

interface ChartProps {
  coinId: string;
  darkMode: boolean;
}

const ChartContainer = styled.div<{ darkMode: boolean }>`
  background-color: ${(props) =>
    props.darkMode ? props.theme.textColor : props.theme.bgColor};
  border-radius: 16px;
`;

const Chart: React.FC<ChartProps> = ({ coinId, darkMode }) => {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinChart(coinId),
    { refetchInterval: 10000 }
  );
  return isLoading ? (
    <div>Loading Price...</div>
  ) : (
    <ChartContainer darkMode={darkMode}>
      <ApexChart
        type="candlestick"
        series={[
          {
            data:
              data?.map((price) => {
                return {
                  x: new Date(price.time_close * 1000),
                  y: [+price.open, +price.high, +price.low, +price.close],
                };
              }) ?? [],
          },
        ]}
        options={{
          theme: {
            mode: "dark",
          },
          chart: {
            height: 300,
            width: 500,
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          grid: { show: false },
          stroke: {
            curve: "smooth",
            width: 4,
          },
          yaxis: {
            // show: false,
          },
          xaxis: {
            // axisBorder: { show: false },
            // axisTicks: { show: false },
            // labels: { show: false },
            type: "datetime",
            categories: data?.map((price) =>
              moment(price.time_close * 1000).format("DD MMM")
            ),
          },
          fill: {
            type: "gradient",
            gradient: { gradientToColors: ["#0BE881"], stops: [0, 100] },
          },
          colors: ["#0FBCF9"],
          tooltip: {
            y: {
              formatter: (value) => `$${value.toFixed(2)}`,
            },
          },
        }}
      />
    </ChartContainer>
  );
};

export default Chart;
