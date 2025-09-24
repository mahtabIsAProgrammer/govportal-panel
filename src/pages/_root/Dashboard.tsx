import { useMemo } from "react";
import { Grid } from "@mui/material";
import { map, shuffle } from "lodash";

import {
  BarChart,
  PieChart,
  UserBoxChart,
  HorizentalChart,
} from "../../components/common/Charts";
import {
  useGetTotalUsersChart,
  useGetTotalAdminsChart,
  useGetTotalCitizensChart,
  useGetTotalOfficersChart,
  useGetRequestsByStatusChart,
  useGetPaymentsByServiceChart,
  useGetRequestsByOfficerChart,
  useGetRequestsByServiceChart,
  useGetTotalDepartmentHeadChart,
} from "../../services/hooks/charts";
import { COLOR_WHITE } from "../../helpers/constants/colors";
import { SPACE_LG, SPACE_MD } from "../../helpers/constants/spaces";
import { HeaderPage } from "../../components/common/Header";

export const Dashboard = () => {
  const { data: totalUsers } = useGetTotalUsersChart();
  const { data: totalAdmins } = useGetTotalAdminsChart();
  const { data: totalCitizen } = useGetTotalCitizensChart();
  const { data: totalOfficers } = useGetTotalOfficersChart();
  const { data: totalDeptHead } = useGetTotalDepartmentHeadChart();
  const { data: getRequestsByStatusChart } = useGetRequestsByStatusChart();
  const { data: getRequestsByOfficerChart } = useGetRequestsByOfficerChart();
  const { data: getRequestsByServiceChart } = useGetRequestsByServiceChart();
  const { data: getPaymentsByServiceChart } = useGetPaymentsByServiceChart();

  const chartData = useMemo(() => {
    const base = [0, 0, 0];

    if (getRequestsByStatusChart) {
      getRequestsByStatusChart?.forEach(
        (item: { status: number; count: string }) => {
          base[item.status] = Number(item.count);
        }
      );
    }

    return base;
  }, [getRequestsByStatusChart]);

  return (
    <>
      <HeaderPage title={"Dashboard"} breadcrumbData={[]} />
      <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
        <Grid size={{ md: 2.3 }} sx={{ height: "110px" }}>
          <UserBoxChart
            colors={["#4e9af3 ", "#8a6df7"]}
            title="total users"
            value={totalUsers?.total_users}
          />
        </Grid>
        <Grid size={{ md: 2.3 }} sx={{ height: "110px" }}>
          <UserBoxChart
            colors={["#3b82f6 ", "#22c55e"]}
            title="total Admins"
            value={totalAdmins?.total_admins}
          />
        </Grid>
        <Grid size={{ md: 2.3 }} sx={{ height: "110px" }}>
          <UserBoxChart
            colors={["#f59e0b", "#f472b6"]}
            title="total citizens"
            value={totalCitizen?.total_citizens}
          />
        </Grid>
        <Grid size={{ md: 2.3 }} sx={{ height: "110px" }}>
          <UserBoxChart
            colors={["#16a34a", "#1e3a8a"]}
            title="total officers"
            value={totalOfficers?.total_officers}
          />
        </Grid>
        <Grid size={{ md: 2.3 }} sx={{ height: "110px" }}>
          <UserBoxChart
            colors={["#8b5cf6", "#06b6d4"]}
            title="total department Head"
            value={totalDeptHead?.total_dept_head}
          />
        </Grid>
      </Grid>

      <Grid
        container
        sx={{ display: "flex", justifyContent: "space-between", mt: SPACE_MD }}
      >
        <Grid
          size={{ md: 4.2 }}
          sx={{
            p: SPACE_LG,
            display: "flex",
            borderRadius: "12px",
            justifyContent: "center",
            backgroundColor: COLOR_WHITE,
            boxShadow: "0px 8px 16px 0px rgba(145, 158, 171, 0.16)",
          }}
        >
          <PieChart
            data={chartData}
            colors={["#FFBB28", "#00C49F", "#FF8042"]}
            labels={["under review", "approved", "rejected"]}
          />
        </Grid>
        <Grid
          size={{ md: 7.5 }}
          sx={{
            p: SPACE_LG,
            borderRadius: "12px",
            backgroundColor: COLOR_WHITE,
            boxShadow: "0px 8px 16px 0px rgba(145, 158, 171, 0.16)",
          }}
        >
          <BarChart
            title="Request By Service"
            data={{
              labels: map(
                getRequestsByServiceChart,
                (item) => item.service_name
              ),
              datasets: [
                {
                  label: "Requests by Service",
                  data: map(getRequestsByServiceChart, (item) => +item.count),
                  backgroundColor: colors,
                },
              ],
            }}
          />
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          pb: SPACE_MD,
          mt: SPACE_MD,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Grid
          size={{ md: 5.9 }}
          sx={{
            p: SPACE_LG,
            borderRadius: "12px",
            backgroundColor: COLOR_WHITE,
            boxShadow: "0px 8px 16px 0px rgba(145, 158, 171, 0.16)",
          }}
        >
          <HorizentalChart
            title="Payment By Service"
            data={{
              labels: map(getPaymentsByServiceChart, (d) => d.service_name),
              datasets: [
                {
                  label: "Total Amount",
                  data: map(getPaymentsByServiceChart, (d) => +d.total_amount),
                  backgroundColor: map(
                    getPaymentsByServiceChart,
                    (_, i) => shuffled[i % shuffled.length]
                  ),
                },
              ],
            }}
          />
        </Grid>
        <Grid
          size={{ md: 5.9 }}
          sx={{
            p: SPACE_LG,
            borderRadius: "12px",
            backgroundColor: COLOR_WHITE,
            boxShadow: "0px 8px 16px 0px rgba(145, 158, 171, 0.16)",
          }}
        >
          <BarChart
            data={{
              labels: map(getRequestsByOfficerChart, (d) => d.officer),
              datasets: [
                {
                  label: "Request By Officer",
                  data: map(
                    getRequestsByOfficerChart,
                    (d) => d.requests_handled
                  ),
                  backgroundColor: map(
                    getRequestsByOfficerChart,
                    (_, i) => shuffled[i % shuffled.length]
                  ),
                },
              ],
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

const colors = ["#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];
const shuffled = shuffle(colors);
