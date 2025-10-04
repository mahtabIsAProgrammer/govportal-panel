import type { FC } from "react";
import { Box, Grid, Typography, type SxProps, type Theme } from "@mui/material";

import {
  COLOR_WHITE,
  COLOR_BORDER,
  COLOR_PRIMARY,
  COLOR_PRIMARY_TEXT,
  COLOR_DESCRIPTION_DARK,
  COLOR_DARK_BACKGROUND_SURFACE,
} from "../../../helpers/constants/colors";
import { CustomIcon } from "../../controllers/CustomImage";
import { arrowCrookedIcon } from "../../other/FunctionalSVG";
import { SPACE_LG } from "../../../helpers/constants/spaces";
import type { DepartmentDataApi } from "../../../services/configs/apiEndPoint";

interface IDepartmentCard {
  data: DepartmentDataApi;
  onClick: (event: MouseEvent | TouchEvent) => void;
}

export const DepartmentCard: FC<IDepartmentCard> = ({
  data: { name, description },
  onClick,
}) => {
  return (
    <Grid
      component="div"
      sx={departmentCardSX}
      className="department-card"
      onClick={(e) => onClick && (onClick as TAny)(e)}
    >
      <Box className="title-wrapper">
        <Typography className="name">{name}</Typography>
        <Typography className="description">{description}</Typography>
      </Box>
      <Box className="icon-wrapper">
        <CustomIcon
          width={44}
          height={44}
          src={arrowCrookedIcon(COLOR_WHITE)}
        />
      </Box>
    </Grid>
  );
};

const departmentCardSX: SxProps<Theme> = {
  "&.department-card": {
    width: { xs: "90%", md: "350px" },
    p: "18px",
    height: "100%",
    minHeight: "200px",
    // backgroundColor: COLOR_WHITE,
    minWidth: "200px",
    borderTop: `10px solid ${COLOR_PRIMARY}`,
    borderLeft: `1px solid ${COLOR_BORDER}`,
    borderRight: `1px solid ${COLOR_BORDER}`,
    borderBottom: `1px solid ${COLOR_BORDER}`,
    borderTopRightRadius: "0",
    borderTopLeftRadius: "0",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    // boxShadow: `0px 8px 8px -4px #10182808, 0px 20px 24px -4px #10182814`,
    cursor: "pointer",
    "&:hover": {
      transition: "0.3s",
      backgroundColor: COLOR_DARK_BACKGROUND_SURFACE,
      "& .title-wrapper ": {
        ".description": {
          color: COLOR_DESCRIPTION_DARK,
        },
      },
    },

    "& .title-wrapper": {
      display: "flex",
      gap: SPACE_LG,
      flexDirection: "column",
      "& .name": {
        fontSize: "24px",
        fontWeight: "700",
        color: COLOR_PRIMARY_TEXT,
        width: "60%",
      },
      "& .description": {
        fontSize: "16px",
        fontWeight: "500",
        color: COLOR_DESCRIPTION_DARK,
      },
    },
    "& .icon-wrapper": {
      position: "absolute",
      top: "33px",
      right: "15px",
      backgroundColor: "#5C5D5B",
      rotate: "-75deg",
      visibility: "hidden",
    },
  },
};
