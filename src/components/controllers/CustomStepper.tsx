import type { Theme } from "@emotion/react";
import {
  Step,
  Stepper,
  type StepperTypeMap,
  type Orientation,
  Box,
  Grid,
  StepLabel,
  type SxProps,
  type StepIconProps,
} from "@mui/material";
import type { OverrideProps } from "@mui/material/OverridableComponent";
import { isFunction } from "formik";
import { memo } from "react";
import {
  COLOR_WHITE,
  COLOR_PRIMARY,
  COLOR_PRIMARY_TEXT,
  COLOR_GRAY_LIGHT,
} from "../../helpers/constants/colors";
import { SPACE_MD } from "../../helpers/constants/spaces";
import { FONT_SMALL_TEXT } from "../../helpers/constants/fonts";
import { checkICON } from "../other/FunctionalSVG";
import { CustomIcon } from "./CustomImage";

interface ICustomStepperWithIcon
  extends OverrideProps<
    StepperTypeMap<{ component?: React.ElementType }, React.ElementType>,
    React.ElementType
  > {
  steps: IStepperItems[];
  activeStep: number;
  orientation?: Orientation;
}
export const CustomStepperWithIcon = memo<ICustomStepperWithIcon>(
  ({ steps, activeStep, orientation, ...props }) => {
    return (
      <>
        <Box sx={customStepperWithIconSX(orientation)}>
          <Stepper {...props} activeStep={activeStep} orientation={orientation}>
            {steps.map(
              ({ icon, title, onClick, disabled, key, link, lock }, index) => (
                <Step
                  key={index}
                  disabled={disabled}
                  sx={{
                    cursor: onClick
                      ? "pointer"
                      : disabled
                      ? orientation == "horizontal"
                        ? "auto"
                        : "not-allowed"
                      : "unset",
                  }}
                  onClick={() =>
                    onClick &&
                    onClick({
                      key,
                      icon,
                      link,
                      lock,
                      title,
                    })
                  }
                >
                  <StepLabel
                    className="step-label"
                    StepIconProps={{
                      icon: isFunction(icon)
                        ? icon(
                            activeStep > index
                              ? COLOR_WHITE
                              : activeStep == index
                              ? COLOR_WHITE
                              : "#637381"
                          )
                        : icon,
                      // active: activeStep >= index,
                    }}
                    sx={{
                      "& .MuiStepLabel-iconContainer": {
                        border:
                          activeStep > index
                            ? `2px solid ${COLOR_PRIMARY}`
                            : activeStep == index
                            ? `2px dashed ${COLOR_PRIMARY}`
                            : "2px solid transparent",
                        boxShadow:
                          activeStep >= index
                            ? `0px 8px 16px 0px ${COLOR_PRIMARY}30`
                            : "none",
                        "&.Mui-active": {
                          backgroundColor:
                            activeStep > index
                              ? undefined
                              : activeStep == index
                              ? COLOR_GRAY_LIGHT + "24 !important"
                              : undefined,
                        },
                        "&.Mui-disabled": {
                          cursor:
                            orientation == "horizontal"
                              ? "auto"
                              : "not-allowed",
                        },
                      },
                      "& .MuiStepLabel-label": {
                        "&.Mui-disabled": {
                          cursor:
                            orientation == "horizontal"
                              ? "auto"
                              : "not-allowed",
                        },
                      },
                    }}
                  >
                    {title}
                  </StepLabel>
                </Step>
              )
            )}
          </Stepper>
        </Box>
      </>
    );
  }
);

const customStepperWithIconSX = (
  orientation?: ICustomStepperWithIcon["orientation"]
): SxProps<Theme> => ({
  // maxWidth: 400,
  width: "100%",
  mt: "12px",
  "& .MuiStepLabel-iconContainer": {
    width: "48px",
    height: "48px",
    backgroundColor: `${COLOR_GRAY_LIGHT}24`,
    borderRadius: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: 0,
    mr: orientation == "horizontal" ? "0px" : SPACE_MD,
    "&.Mui-active": {
      backgroundColor: `${COLOR_PRIMARY} !important`,
    },
    "&.Mui-completed": {
      backgroundColor: `${COLOR_PRIMARY} !important`,
    },
  },
  "& .MuiStepConnector-root": {
    "& .MuiStepConnector-line": {
      height: orientation == "horizontal" ? "0px" : "24px",
      width: orientation == "horizontal" ? "400px" : "0",
      borderLeftWidth: orientation == "horizontal" ? "0px" : "2.5px",
      borderTopWidth: orientation == "horizontal" ? "4px" : "0px",
      ml: "12px",
      mb: orientation == "horizontal" ? SPACE_MD : "0px",
    },
    "&.Mui-active .MuiStepConnector-line": {
      borderColor: COLOR_PRIMARY,
    },
    "&.Mui-completed .MuiStepConnector-line": {
      borderColor: COLOR_PRIMARY,
    },
    "&.Mui-disabled .MuiStepConnector-line": {
      borderColor: `${COLOR_GRAY_LIGHT}30`,
    },
  },
  "& .step-label": {
    display: "flex",
    flexDirection: orientation == "horizontal" ? "column" : "row",
    textAlign: orientation == "horizontal" ? "center" : "start",
    gap: orientation == "horizontal" ? "12px" : "0",
    "& .MuiStepLabel-label": {
      fontWeight: "600",
      fontSize: FONT_SMALL_TEXT,
      lineHeight: "22px",
      color: "#637381`",
    },
    "& .Mui-active , .Mui-completed": {
      fontWeight: "600",
      color: COLOR_PRIMARY_TEXT,
    },
  },
});

export const CustomStepIcon = (props: StepIconProps) => {
  const { active, completed, className } = props;
  return (
    <Grid sx={customStepIconSX(active)} className={className}>
      {completed ? (
        <CustomIcon src={checkICON()} className="StepIcon-completed" />
      ) : (
        <div className="StepIcon-circle" />
      )}
    </Grid>
  );
};

export const CustomCustomStepIcon = (props: StepIconProps) => {
  const { active, completed, className, icon } = props;
  return (
    <Grid className={className} sx={customCustomStepIconSX}>
      <Box
        className={
          active || completed
            ? "icon-stepper-checked"
            : "icon-stepper-not-checked"
        }
        component="img"
        src={icon as string}
      />
    </Grid>
  );
};

const customStepIconSX = (active: boolean | undefined): SxProps<Theme> => ({
  height: 22,
  display: "flex",
  color: "#eaeaf0", // ! check
  alignItems: "center",
  ...(active && {
    color: COLOR_PRIMARY,
  }),
  "& .StepIcon-completed": {
    zIndex: 1,
    fontSize: 18,
    color: COLOR_PRIMARY,
  },
  "& .StepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "0",
    backgroundColor: "currentColor",
  },
});

const customCustomStepIconSX: SxProps<Theme> = {
  width: 50,
  zIndex: 1,
  height: 50,
  display: "flex",
  color: COLOR_WHITE,
  borderRadius: "0",
  alignItems: "center",
  justifyContent: "center",
};
