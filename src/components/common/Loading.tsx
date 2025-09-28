import TopLoadingBar from "react-top-loading-bar";
import { Box, Grid, Skeleton } from "@mui/material";
import { useContext, useEffect, useState } from "react";

import {
  COLOR_PRIMARY,
  COLOR_BACKGROUND,
} from "../../helpers/constants/colors";
import { CustomTable } from "../controllers/CustomTable";
import { sidebarSX } from "../../helpers/styles/sidebar";
import { viewUserSX } from "../../helpers/styles/advances";
import { CustomImageBox } from "../controllers/CustomImage";
import { MainContext } from "../../helpers/others/mainContext";
import { DashboardLayoutSX } from "../../helpers/styles/layout";
import { SPACE_LG, SPACE_MD } from "../../helpers/constants/spaces";

import loadingSpinner from "../../assets/images/loading-gif.jpg";

export const PagesBoxLoading = (
  <>
    <Box mb={SPACE_LG}>
      <Skeleton variant="text" width="200px" height="40px" />
      <Skeleton variant="text" width="400px" height="40px" />
    </Box>
    <Skeleton variant="rounded" width="100%px" height="70vh" />
  </>
);

export const Loading = ({ isDashboard }: TAny) => {
  const { theme } = useContext(MainContext);

  const [progress, setProgress] = useState(10);

  useEffect(() => {
    if (progress <= 100)
      setTimeout(() => setProgress((item) => item + 10), 100);
  }, [progress]);

  return (
    <>
      <TopLoadingBar color={COLOR_PRIMARY} shadow={false} progress={progress} />
      {isDashboard ? (
        PagesBoxLoading
      ) : (
        <Grid container sx={DashboardLayoutSX(theme, "none")}>
          <Grid className="content">
            <Grid className="pages-box">
              <Grid className="items">{PagesBoxLoading}</Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export const LoadingTable = () => {
  return (
    <CustomTable
      valueRows={rows}
      headerCells={headCellsLoading() ?? []}
      setting={{}}
      page={undefined}
      setPage={() => {
        <></>;
      }}
      totalPageCount={0}
    />
  );
};

export const LoadingSideBar = () => {
  const { theme } = useContext(MainContext);
  return (
    <Grid sx={sidebarSX(theme, "normal")}>
      <Grid className="logo">
        <Skeleton width="100%" height={50} />
      </Grid>
      <Grid className="lists">
        <Skeleton width="100%" height={50} />
        <Skeleton width="100%" height={50} />
        <Skeleton width="100%" height={50} />
        <Skeleton width="100%" height={50} />
        <Skeleton width="100%" height={50} />
        <Skeleton width="100%" height={50} />
      </Grid>
    </Grid>
  );
};

export const LoadingAddEdit = () => {
  return (
    <Grid
      container
      sx={{
        height: "100vh",
        width: "100%",
        position: "absolute",
        backgroundColor: COLOR_BACKGROUND,
        zIndex: "9999999",
      }}
    >
      <Grid width="100%">
        <Box mb={SPACE_LG}>
          <Skeleton variant="text" width="200px" height="40px" />
          <Skeleton variant="text" width="400px" height="40px" />
        </Box>
        <Skeleton variant="rounded" width="100%" height="100%" />
      </Grid>
    </Grid>
  );
};

export const CitizenLoading = () => {
  // const [progress, setProgress] = useState(10);

  // useEffect(() => {
  //   if (progress <= 100)
  //     setTimeout(() => setProgress((item) => item + 10), 100);
  // }, [progress]);
  return (
    <>
      {/* <TopLoadingBar color={COLOR_PRIMARY} shadow={false} progress={progress} /> */}
      <Grid
        container
        sx={{
          height: "100vh",
          width: "100%",
          // backgroundColor: COLOR_BACKGROUND,
          zIndex: "9999999",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: SPACE_MD,
          fontSize: "30px",
        }}
      >
        <CustomImageBox src={loadingSpinner} width="150px" height="150px" />
        Loading...
      </Grid>
    </>
  );
};

export const ViewUserLoading = () => {
  return (
    <Grid sx={viewUserSX}>
      <Skeleton width="100%" height={100} />
      <Grid className="container">
        <Grid className="profile-box">
          <Box className="image-wrapper">
            <Skeleton width={400} height={400} />
          </Box>
          <Box className="texts-wrapper">
            <Skeleton width={260} height={60} />
            <Skeleton width={260} height={60} />
            <Skeleton width={260} height={60} />
            <Skeleton width={260} height={60} />
            <Skeleton width={260} height={60} />
          </Box>
        </Grid>
        <Grid className="role-box">
          <Skeleton width={260} height={60} />
          <Skeleton width={260} height={60} />
          <Skeleton width={260} height={60} />
        </Grid>
      </Grid>
    </Grid>
  );
};

const rows = [{ id: "" }, { id: "" }, { id: "" }, { id: "" }, { id: "" }];

const headCellsLoading = () => [
  {
    id: "icon",
    renderHeader: <Skeleton variant="circular" width={50} height={50} />,
    RenderRow: () => {
      return <Skeleton variant="circular" width={50} height={50} />;
    },
    isCenter: true,
  },
  {
    id: "username",
    renderHeader: <Skeleton variant="text" width="150px" height="30px" />,
    RenderRow: () => {
      return <Skeleton variant="text" width="150px" height="30px" />;
    },
    isCenter: true,
  },
  {
    id: "email",
    renderHeader: <Skeleton variant="text" width="150px" height="30px" />,
    RenderRow: () => {
      return <Skeleton variant="text" width="150px" height="30px" />;
    },
    isCenter: true,
  },
  {
    id: "status",
    renderHeader: <Skeleton variant="text" width="60px" height="24px" />,
    RenderRow: () => {
      return <Skeleton variant="text" width="60px" height="30px" />;
    },
    isCenter: true,
  },
  {
    id: "emailStatus",
    renderHeader: <Skeleton variant="text" width="60px" height="24px" />,
    RenderRow: () => {
      return <Skeleton variant="text" width="60px" height="30px" />;
    },
    isCenter: true,
  },
  {
    id: "emailStatus",
    renderHeader: (
      <Box component="div" sx={{ display: "flex", gap: SPACE_MD }}>
        <Skeleton variant="text" width="20px" height="40px" />
        <Skeleton variant="text" width="20px" height="40px" />
        <Skeleton variant="text" width="20px" height="40px" />
      </Box>
    ),
    RenderRow: () => {
      return (
        <Box component="div" sx={{ display: "flex", gap: SPACE_MD }}>
          <Skeleton variant="text" width="20px" height="40px" />
          <Skeleton variant="text" width="20px" height="40px" />
          <Skeleton variant="text" width="20px" height="40px" />
        </Box>
      );
    },
    isCenter: true,
  },
];
