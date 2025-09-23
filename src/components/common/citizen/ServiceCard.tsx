import { Box, Grid, Typography, type SxProps, type Theme } from "@mui/material";
import type { ServiceDataApi } from "../../../services/configs/apiEndPoint";
import type { FC } from "react";
import { SPACE_MD, SPACE_SM } from "../../../helpers/constants/spaces";
import { COLOR_PRIMARY, COLOR_WHITE } from "../../../helpers/constants/colors";
import { FONT_BODY } from "../../../helpers/constants/fonts";

interface IServiceCard {
  data: ServiceDataApi;
  onClick: (event: MouseEvent | TouchEvent) => void;
}

export const ServiceCard: FC<IServiceCard> = ({
  data: { name, description, fee },
  onClick,
}) => {
  return (
    <Grid
      onClick={(e) => onClick && (onClick as TAny)(e)}
      sx={serviceCardSX}
      className="service-card"
    >
      <Box className="title-wrapper">
        <Typography className="name">{name}</Typography>
        <Typography className="description">{description}</Typography>
      </Box>
      <Typography className="fee">
        <Box component="span">fee:</Box> {fee}
      </Typography>
    </Grid>
  );
};

const serviceCardSX: SxProps<Theme> = {
  "&.service-card": {
    width: "300px",
    p: "12px",
    borderRadius: "12px",
    minHeight: "200px",
    height: "100%",
    minWidth: "200px",
    backgroundColor: COLOR_PRIMARY,
    color: COLOR_WHITE,

    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: `-20px 20px 40px -4px ${"#A3A3A3"}30, 0px 0px 2px 0px ${"#A3A3A3"}30`,
    border: `1px solid ${COLOR_PRIMARY}`,
    cursor: "pointer",
    "&:hover": {
      transition: "0.3s",
      backgroundColor: COLOR_WHITE,
      color: COLOR_PRIMARY,
      "& .title-wrapper .description": {
        color: COLOR_PRIMARY,
      },
    },

    "& .title-wrapper": {
      display: "flex",
      gap: SPACE_MD,
      flexDirection: "column",
      "& .name": {
        fontSize: FONT_BODY,
        fontWeight: "700",
      },
      "& .description": {
        fontSize: "16px",
        fontWeight: "500",
        color: "#f8f8f8a7",
      },
    },
    "& .fee": {
      fontWeight: "700",
      "& span": {
        fontWeight: "500",
        mr: SPACE_SM,
      },
    },
  },
};
