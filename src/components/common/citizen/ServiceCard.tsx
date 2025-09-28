import type { FC } from "react";
import { Box, Grid, Typography, type SxProps, type Theme } from "@mui/material";

import {
  COLOR_BORDER,
  COLOR_PRIMARY,
  COLOR_PRIMARY_TEXT,
  COLOR_DARK_BACKGROUND,
  COLOR_DESCRIPTION_DARK,
  COLOR_DARK_BACKGROUND_SURFACE,
} from "../../../helpers/constants/colors";
import { arrowRightICON } from "../../other/FunctionalSVG";
import { SPACE_SM } from "../../../helpers/constants/spaces";
import { CustomButton } from "../../controllers/CustomButton";
import { FONT_HEADING_SMALL } from "../../../helpers/constants/fonts";
import type { ServiceDataApi } from "../../../services/configs/apiEndPoint";

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
      <Typography className="fee">{fee} $</Typography>
      <Box className="title-wrapper">
        <Typography className="name">{name}</Typography>
        <Typography className="description">{description}</Typography>
      </Box>
      <Grid className="button-wrapper">
        <CustomButton
          variant="text"
          text={"Read More"}
          endIcon={arrowRightICON(COLOR_PRIMARY)}
        />
      </Grid>
    </Grid>
  );
};

const serviceCardSX: SxProps<Theme> = {
  "&.service-card": {
    width: "300px",
    p: "12px",
    minHeight: "200px",
    // height: "100%",
    minWidth: "200px",
    // backgroundColor: COLOR_WHITE,
    display: "flex",
    backgroundColor: COLOR_DARK_BACKGROUND_SURFACE,
    flexDirection: "column",
    justifyContent: "space-between",
    // boxShadow: `-20px 20px 40px -4px ${COLOR_GRAY_LIGHT}30, 0px 0px 2px 0px ${COLOR_GRAY_LIGHT}30`,
    border: `1px solid ${COLOR_BORDER}`,
    cursor: "pointer",
    "&:hover": {
      transition: "0.3s",
      border: `1px solid ${COLOR_PRIMARY}`,

      backgroundColor: COLOR_DARK_BACKGROUND,
    },

    "& .title-wrapper": {
      display: "flex",
      gap: SPACE_SM,
      flexDirection: "column",
      "& .name": {
        fontWeight: "700",
        fontSize: FONT_HEADING_SMALL,
        color: COLOR_PRIMARY_TEXT,
      },
      "& .description": {
        fontSize: "14px",
        fontWeight: "500",
        color: COLOR_DESCRIPTION_DARK,
      },
    },
    "& .fee": {
      color: COLOR_PRIMARY,
      fontWeight: "700",
    },
    "& .button-wrapper": {
      color: "#4A4A4A",
      fontWeight: "700",
      display: "flex",
      justifyContent: "end",
    },
  },
};
