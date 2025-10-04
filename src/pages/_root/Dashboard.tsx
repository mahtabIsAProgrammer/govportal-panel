import { useContext, useMemo } from "react";
import { Grid } from "@mui/material";
import { map } from "lodash";

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
import { HeaderPage } from "../../components/common/Header";
import { COLOR_BORDER } from "../../helpers/constants/colors";
import { MainContext } from "../../helpers/others/mainContext";
import { SPACE_LG, SPACE_MD } from "../../helpers/constants/spaces";
import { Loading } from "../../components/common/Loading";

export const Dashboard = () => {
  const {
    globalProfileInformation: { role },
  } = useContext(MainContext);

  const { data: totalUsers, isLoading: isLoadingTotalUsersChart } =
    useGetTotalUsersChart();
  const { data: totalAdmins, isLoading: isLoadingTotalAdminsChart } =
    useGetTotalAdminsChart();
  const { data: totalCitizen, isLoading: isLoadingTotalCitizensChart } =
    useGetTotalCitizensChart();
  const { data: totalOfficers, isLoading: isLoadingTotalOfficersChart } =
    useGetTotalOfficersChart();
  const { data: totalDeptHead, isLoading: isLoadingTotalDepartmentHeadChart } =
    useGetTotalDepartmentHeadChart();
  const {
    data: getRequestsByStatusChart,
    isLoading: isLoadingRequestsByStatusChart,
  } = useGetRequestsByStatusChart();
  const {
    data: getRequestsByOfficerChart,
    isLoading: isLoadingRequestsByOfficerChart,
  } = useGetRequestsByOfficerChart();
  const {
    data: getRequestsByServiceChart,
    isLoading: isLoadingRequestsByServiceChart,
  } = useGetRequestsByServiceChart();
  const {
    data: getPaymentsByServiceChart,
    isLoading: isLoadingPaymentsByServiceChart,
  } = useGetPaymentsByServiceChart();

  const isLoading =
    isLoadingTotalUsersChart ||
    isLoadingTotalAdminsChart ||
    isLoadingTotalCitizensChart ||
    isLoadingTotalOfficersChart ||
    isLoadingTotalDepartmentHeadChart ||
    isLoadingRequestsByStatusChart ||
    isLoadingRequestsByOfficerChart ||
    isLoadingRequestsByServiceChart ||
    isLoadingPaymentsByServiceChart;

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

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <HeaderPage title={"Dashboard"} breadcrumbData={[]} />
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent:
            role == "officer" || role == "department_head"
              ? "space-evenly"
              : "space-between",
        }}
      >
        {role == "admin" ? (
          <Grid size={{ md: 2.3 }} sx={{ height: "110px" }}>
            <UserBoxChart
              colors={["#4e9af3 ", "#8a6df7"]}
              title="total users"
              value={totalUsers?.total_users}
            />
          </Grid>
        ) : (
          <></>
        )}
        {role == "admin" ? (
          <Grid size={{ md: 2.3 }} sx={{ height: "110px" }}>
            <UserBoxChart
              colors={["#3b82f6 ", "#22c55e"]}
              title="total Admins"
              value={totalAdmins?.total_admins}
            />
          </Grid>
        ) : (
          <></>
        )}
        {role == "officer" ? (
          <></>
        ) : (
          <Grid size={{ md: 2.3 }} sx={{ height: "110px" }}>
            <UserBoxChart
              colors={["#8b5cf6", "#06b6d4"]}
              title="total department Head"
              value={totalDeptHead?.total_dept_head}
            />
          </Grid>
        )}
        <Grid size={{ md: 2.3 }} sx={{ height: "110px" }}>
          <UserBoxChart
            colors={["#16a34a", "#1e3a8a"]}
            title="total officers"
            value={totalOfficers?.total_officers}
          />
        </Grid>
        <Grid size={{ md: 2.3 }} sx={{ height: "110px" }}>
          <UserBoxChart
            colors={["#f59e0b", "#f472b6"]}
            title="total citizens"
            value={totalCitizen?.total_citizens}
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
            justifyContent: "center",
            border: `1px solid ${COLOR_BORDER}`,
            // boxShadow: "0px 8px 16px 0px rgba(145, 158, 171, 0.16)",
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
            border: `1px solid ${COLOR_BORDER}`,
            // boxShadow: "0px 8px 16px 0px rgba(145, 158, 171, 0.16)",
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
            border: `1px solid ${COLOR_BORDER}`,
            // boxShadow: "0px 8px 16px 0px rgba(145, 158, 171, 0.16)",
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
                  backgroundColor: colors,
                },
              ],
            }}
          />
        </Grid>
        {role == "admin" || role == "department_head" ? (
          <Grid
            size={{ md: 5.9 }}
            sx={{
              p: SPACE_LG,
              border: `1px solid ${COLOR_BORDER}`,
              // boxShadow: "0px 8px 16px 0px rgba(145, 158, 171, 0.16)",
            }}
          >
            <BarChart
              title="Request By Officer"
              data={{
                labels: map(getRequestsByOfficerChart, (d) => d.officer),
                datasets: [
                  {
                    label: "Request By Officer",
                    data: map(
                      getRequestsByOfficerChart,
                      (d) => d.requests_handled
                    ),
                    backgroundColor: colors,
                  },
                ],
              }}
            />
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </>
  );
};

const colors = [
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#00FF7F",
  "#00FFFF",
  "#800080",
  "#FF00FF",
  "#FFA07A",
  "#FF00FF",
  "#FFA500",
  "#FF0000",
];
