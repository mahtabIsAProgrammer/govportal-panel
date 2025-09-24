import {
  Chart,
  Title,
  Legend,
  Tooltip,
  type Point,
  BarElement,
  ArcElement,
  LinearScale,
  LineElement,
  PointElement,
  CategoryScale,
  type ChartData,
} from "chart.js";
import { memo, type FC } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Grid, Typography, type SxProps, type Theme } from "@mui/material";

import { FONT_SMALL_TEXT } from "../../helpers/constants/fonts";
import {
  COLOR_WHITE,
  COLOR_PRIMARY_TEXT,
} from "../../helpers/constants/colors";
import { SPACE_MD } from "../../helpers/constants/spaces";

Chart.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
);

interface IPieChart {
  labels: string[];
  colors: string[];
  data: number[];
}

interface ILineChart {
  data: ChartData<"line", (number | Point)[], unknown>;
  title?: string;
}

interface IBarChart {
  data: ChartData<"bar", (number | Point)[], unknown>;
  title?: string;
}

export const PieChart = memo<IPieChart>(({ data, labels, colors }) => {
  return (
    <Pie
      style={{ width: "100%", height: "100%" }}
      data={{
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: colors,
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: { position: "bottom" },
          title: { display: true, text: "Requests by Status" },
        },
      }}
    />
  );
});

export const LineChart = memo<ILineChart>(({ data, title }) => {
  return (
    <Line
      data={data}
      options={{
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: title },
        },
      }}
    />
  );
});

export const BarChart = memo<IBarChart>(({ data, title }) => {
  return (
    <Bar
      data={data}
      options={{
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: title },
        },
      }}
    />
  );
});

export const HorizentalChart = memo<IBarChart>(({ data, title }) => {
  return (
    <Bar
      data={data}
      options={{
        indexAxis: "y",
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: title },
        },
      }}
    />
  );
});

export const UserBoxChart: FC<{
  colors?: string[];
  title?: string;
  value?: number;
}> = ({ colors, title, value }) => {
  return (
    <Grid sx={userBoxChartSX(colors)}>
      <Grid className="title-wrapper">
        <Typography>{title}</Typography>
      </Grid>
      <Grid className="value-wrapper">
        <Typography>{value}</Typography>
      </Grid>
    </Grid>
  );
};

const userBoxChartSX = (colors?: string[]): SxProps<Theme> => ({
  background: `linear-gradient(to right, ${colors?.[0]}, ${colors?.[1]})`,
  width: "100%",
  height: "100%",
  boxShadow: "0px 8px 16px 0px rgba(145, 158, 171, 0.16)",
  p: SPACE_MD,
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  "& .title-wrapper": {
    width: "100%",
    display: "flex",
    justifyContent: "start",
    "& p": {
      fontSize: FONT_SMALL_TEXT,
      fontWeight: "600",
      textTransform: "capitalize",
      color: COLOR_WHITE,
    },
  },
  "& .value-wrapper": {
    width: "100%",
    display: "flex",
    justifyContent: "end",
    "& p": {
      fontSize: "36px",
      fontWeight: "900",
      color: COLOR_WHITE,
      WebkitTextStroke: `1px ${COLOR_PRIMARY_TEXT}`,
    },
  },
});
