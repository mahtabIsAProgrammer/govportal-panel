import {
  Grid,
  Typography,
  type Theme,
  type SxProps,
  LinearProgress,
  type LinearProgressProps,
} from "@mui/material";

import { COLOR_GREEN } from "../../helpers/constants/colors";

export interface ICustomLinearProgress extends LinearProgressProps {
  lng?: string;
  counter?: number;
  customColor?: string;
}
export const CustomLinearProgress = ({
  customColor,
  ...props
}: ICustomLinearProgress) => {
  const { counter } = props;
  return (
    <Grid sx={customProgressSX(customColor)} className="custom-linear-progress">
      <Grid className="linear-wrapper">
        <LinearProgress {...props} className="custom-progress" />
      </Grid>
      {counter ? (
        <Grid className="counter-wrapper">
          <Typography className="counter">{counter + "%"}</Typography>
        </Grid>
      ) : null}
    </Grid>
  );
};

const customProgressSX = (
  customColor?: string,
  counter?: number
): SxProps<Theme> => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  alignContent: "center",
  justifyContent: "space-between",

  "& .local-progress": {
    width: "100%",
    height: "8px",
    borderRadius: "8px",
  },
  "& .MuiLinearProgress-dashed": {
    animation: "none",
    backgroundImage: "none",
    backgroundColor: `${customColor || COLOR_GREEN}10`,
  },
  "& .MuiLinearProgress-bar": {
    background: `linear-gradient(273deg, ${customColor || COLOR_GREEN} 0%, ${
      customColor || COLOR_GREEN
    }20 100%) !important`,
  },

  "& .linear-wrapper": {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    width: `calc(100% - ${counter ? "50px" : "0px"})`,
  },
  "& .counter-wrapper": {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    width: "50px",
    "& .counter": {
      color: customColor || COLOR_GREEN,
    },
  },
});
