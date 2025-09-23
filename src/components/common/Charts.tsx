import { memo } from "react";

import { Bar, Line, Pie } from "react-chartjs-2";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  type ChartData,
  type Point,
} from "chart.js";

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
}

interface IBarChart {
  data: ChartData<"bar", (number | Point)[], unknown>;
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

export const LineChart = memo<ILineChart>(({ data }) => {
  return (
    <Line
      data={data}
      options={{
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Requests per Month" },
        },
      }}
    />
  );
});

export const BarChart = memo<IBarChart>(({ data }) => {
  return (
    <Bar
      data={data}
      options={{
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: "Requests by Service" },
        },
      }}
    />
  );
});
