import { map } from "lodash";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

import {
  blogICON,
  userIcon,
  serviceICON,
  departmentICON,
  paymentICON,
  dashboardICON,
  notificationICON,
} from "../other/FunctionalSVG";
import { sidebarSX } from "../../helpers/styles/sidebar";
import {
  COLOR_PRIMARY,
  COLOR_PRIMARY_TEXT,
} from "../../helpers/constants/colors";
import { MainContext } from "../../helpers/others/mainContext";
import { CustomIcon, CustomImageBox } from "../controllers/CustomImage";

export const Sidebar = () => {
  const {
    theme,
    globalProfileInformation: { role },
  } = useContext(MainContext);

  const routes = [
    {
      name: "dashboard",
      url: "/dashboard",
      icon: dashboardICON,
    },
    {
      name: "users",
      url: "/dashboard/users",
      icon: userIcon,
    },
    ...[
      role === "officer" || role === "department_head"
        ? {}
        : {
            name: "departments",
            url: "/dashboard/departments",
            icon: departmentICON,
          },
    ],
    { name: "services", url: "/dashboard/services", icon: serviceICON },
    { name: "requests", url: "/dashboard/requests", icon: blogICON },
    // { name: "documents", url: "/dashboard/documents", icon: categoryICON },
    { name: "payments", url: "/dashboard/payments", icon: paymentICON },
    ...[
      role === "admin"
        ? {
            name: "notifications",
            url: "/dashboard/notifications",
            icon: notificationICON,
          }
        : {},
    ],
  ];
  return (
    <Grid sx={sidebarSX(theme, "normal")}>
      <Grid className="logo">
        <CustomImageBox src="/logo.png" width="200px" />
      </Grid>
      <Grid className="lists">
        {map(routes, ({ name, url, icon }, index) =>
          name ? (
            <NavLink
              key={index}
              className={location.pathname == url ? "links active" : "links"}
              to={url ? url : ""}
            >
              <CustomIcon
                src={
                  icon
                    ? icon(
                        location.pathname == url
                          ? COLOR_PRIMARY
                          : COLOR_PRIMARY_TEXT
                      )
                    : undefined
                }
              />
              <Typography className="text">{name}</Typography>
            </NavLink>
          ) : (
            ""
          )
        )}
      </Grid>
    </Grid>
  );
};
