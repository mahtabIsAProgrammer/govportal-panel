import { map } from "lodash";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

import {
  blogICON,
  userIcon,
  commentICON,
  productICON,
  categoryICON,
  dashboardICON,
} from "../other/FunctionalSVG";
import { sidebarSX } from "../../helpers/styles/sidebar";
import { COLOR_PRIMARY } from "../../helpers/constants/colors";
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
            icon: productICON,
          },
    ],
    { name: "services", url: "/dashboard/services", icon: commentICON },
    { name: "requests", url: "/dashboard/requests", icon: blogICON },
    // { name: "documents", url: "/dashboard/documents", icon: categoryICON },
    { name: "payments", url: "/dashboard/payments", icon: categoryICON },
    ...[
      role === "admin"
        ? {
            name: "notifications",
            url: "/dashboard/notifications",
            icon: categoryICON,
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
                    ? icon(location.pathname == url ? COLOR_PRIMARY : undefined)
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
