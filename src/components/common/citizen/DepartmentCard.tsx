import type { FC } from "react";
import { Box, Grid, Typography, type SxProps, type Theme } from "@mui/material";

import { CustomIcon } from "../../controllers/CustomImage";
import { arrowCrookedIcon } from "../../other/FunctionalSVG";
import { SPACE_LG } from "../../../helpers/constants/spaces";
import { COLOR_PRIMARY, COLOR_WHITE } from "../../../helpers/constants/colors";
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
    width: "350px",
    p: "18px",
    borderRadius: "12px",
    height: "100%",
    minHeight: "200px",
    backgroundColor: COLOR_WHITE,
    minWidth: "200px",
    borderTop: `10px solid ${COLOR_PRIMARY}`,
    borderTopRightRadius: "0",
    borderTopLeftRadius: "0",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: `0px 8px 8px -4px #10182808, 0px 20px 24px -4px #10182814`,
    cursor: "pointer",
    "&:hover": {
      transition: "0.3s",
      backgroundColor: "#3D3F3C",
      "& .title-wrapper ": {
        ".name": {
          color: COLOR_WHITE,
        },
        ".description": {
          color: "#C4C4C4",
        },
      },
      "& .icon-wrapper": {
        visibility: "visible",
      },
    },

    "& .title-wrapper": {
      display: "flex",
      gap: SPACE_LG,
      flexDirection: "column",
      "& .name": {
        fontSize: "24px",
        fontWeight: "700",
        color: "#3D3F3C",
        width: "60%",
      },
      "& .description": {
        fontSize: "16px",
        fontWeight: "500",
        color: "#747474",
      },
    },
    "& .icon-wrapper": {
      position: "absolute",
      top: "33px",
      right: "15px",
      backgroundColor: "#5C5D5B",
      borderRadius: "50%",
      rotate: "-75deg",
      visibility: "hidden",
    },
  },
};
