import { BarChart, LineChart, PieChart } from "../../components/common/Charts";

export const Dashboard = () => {
  return (
    <>
      <PieChart
        data={[2, 3, 4, 5]}
        colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]}
        labels={["name"]}
      />
      <LineChart
        data={{
          labels: ["name", "hey"],
          datasets: [
            {
              label: "e9ui",
              data: [2, 4, 5],
              backgroundColor: "#82ca9d",
            },
            {
              label: "e9ui",
              data: [2, 1, 5],
              backgroundColor: "#82ca9d",
            },
          ],
        }}
      />
      <BarChart
        data={{
          labels: ["name", "hey"],
          datasets: [
            {
              label: "Requeskeiuets",
              data: [2, 4, 5],
              backgroundColor: "#82ca9d",
            },
          ],
        }}
      />
      <BarChart
        data={{
          labels: ["name", "hey"],
          datasets: [
            {
              label: "Requeskeiuets",
              data: [2, 4, 5],
              backgroundColor: "#82ca9d",
            },
          ],
        }}
      />
    </>
  );
};
