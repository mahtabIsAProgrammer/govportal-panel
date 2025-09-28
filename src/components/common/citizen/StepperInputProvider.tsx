import { memo, useState } from "react";

import { Grid, Typography, type Theme, Box, type SxProps } from "@mui/material";
import { CustomStepperWithIcon } from "../../controllers/CustomStepper";
import {
  InputsBox,
  type TFullInputsAddEdit,
} from "../../advances/AddEditProvider";
import { isFunction, map } from "lodash";
import { navigateListStepsButtonsSX } from "../../../helpers/styles/advances";
import { CustomButton } from "../../controllers/CustomButton";
import {
  COLOR_GRAY_LIGHT,
  COLOR_PRIMARY,
  COLOR_WHITE,
} from "../../../helpers/constants/colors";
import {
  SPACE_LG,
  SPACE_MD,
  SPACE_SM,
  SPACE_XL,
} from "../../../helpers/constants/spaces";
import {
  FONT_CAPTION,
  FONT_SMALL_TEXT,
} from "../../../helpers/constants/fonts";

export type IStepperOrderOrdersView = Omit<
  IStepperItems,
  "onClick" | "key" | "link" | "lock"
> & {
  inputs:
    | TFullInputsAddEdit[]
    | ((props: {
        activeStep: number;
        setActiveStep: TStateActionFunction<number>;
      }) => TFullInputsAddEdit[]);
  isCenter?: boolean;
  withoutBackground?: boolean;
  columnGridSize?: TColumnGridSize;
  onClickContinue?: TAny;
};

export const StepperInputProvider = memo<IStepperFormProviderOrdersView>(
  ({ steps, footerText: { end, starts }, formIK, submitForm }) => {
    const [activeStep, setActiveStep] = useState(0);
    const {
      inputs,
      isCenter,
      columnGridSize,
      withoutBackground,
      onClickContinue,
    } = steps?.find((_, index) => index == activeStep) || {};

    return (
      <Grid sx={stepperFormProviderOrdersViewSX(isCenter, withoutBackground)}>
        <Grid
          size={{ xs: 10 }}
          sx={{ display: activeStep == 0 ? "flex" : undefined }}
        >
          <CustomStepperWithIcon
            orientation="horizontal"
            steps={steps}
            activeStep={activeStep}
          />
        </Grid>
        <Grid container className="inputs-stepper">
          <InputsBox
            inputs={
              isFunction(inputs)
                ? inputs({ activeStep, setActiveStep })
                : inputs || []
            }
            columnGridSize={columnGridSize}
            formIK={formIK}
          />
        </Grid>
        {
          // activeStep == 0 ? null :
          <Grid
            width="100%"
            className="navigation-button"
            sx={navigateListStepsButtonsSX}
          >
            <Grid className="navigation-texts">
              <Grid className="navigation-texts-start">
                {map(starts, ({ name, value }, index) => (
                  <>
                    <Grid className="navigation-texts-start-item">
                      <Box component="span" className="title-total">
                        {name}
                      </Box>
                      <Typography className="rate-button">{value}</Typography>
                    </Grid>
                    {starts.length - 1 == index ? null : (
                      <Grid className="navigation-texts-start-divider">
                        {" "}
                        +{" "}
                      </Grid>
                    )}
                  </>
                ))}
              </Grid>
              {end && (
                <Grid className="navigation-texts-end">
                  <Box component="span" className="title-total">
                    total
                  </Box>
                  <Typography className="rate-button">{end}</Typography>
                </Grid>
              )}
            </Grid>
            <Grid className="button-wrapper" size={{ md: 3.9 }}>
              <CustomButton
                variant="outlined"
                disabled={activeStep <= 0}
                className="button"
                text={"Back"}
                onClick={() => setActiveStep((activeStep) => activeStep - 1)}
              />
              {activeStep >= steps?.length - 1 ? (
                <CustomButton
                  variant="contained"
                  className="button"
                  disabled={submitForm.disabled}
                  text={"submit"}
                  onClick={() => submitForm.handler()}
                />
              ) : (
                <CustomButton
                  variant="contained"
                  className="button"
                  text={"continue"}
                  onClick={() => (
                    setActiveStep((activeStep) => activeStep + 1),
                    onClickContinue
                  )}
                />
              )}
            </Grid>
          </Grid>
        }
      </Grid>
    );
  }
);

const stepperFormProviderOrdersViewSX = (
  isCenter?: boolean,
  withoutBackground?: boolean
): SxProps<Theme> => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  "& .inputs-stepper": {
    backgroundColor: withoutBackground ? undefined : COLOR_WHITE,
    width: "100%",
    mt: SPACE_LG,
    p: SPACE_LG,
    minHeight: "400px",
    boxShadow: withoutBackground
      ? undefined
      : `-20px 20px 40px -4px  ${COLOR_GRAY_LIGHT}30, 0px 0px 2px 0px  ${COLOR_GRAY_LIGHT}30`,
    display: "flex",
    flexWrap: "wrap",
    alignItems: isCenter ? "center" : "start",
    justifyContent: "space-between",
    "& .custom-style": {
      width: "50%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "& .wrapper-local-label": {
        justifyContent: isCenter ? "center" : "start",
      },
      "& .autocomplete-wrapper": {
        width: "40%",
      },
    },
    "& .uploader-container ": {
      boxShadow: "none",
      p: "0",
      "& .uploader-box-wrapper": {
        mb: SPACE_MD,
      },
    },
  },
  "& .navigation-button": {
    py: SPACE_MD,
    px: SPACE_XL,
    mt: SPACE_XL,
    gap: SPACE_SM,
    zIndex: "1001",
    bottom: "-40px",
    display: "flex",
    position: "sticky",
    flexDirection: "row",
    background: COLOR_WHITE,
    justifyContent: "space-between",
    boxShadow: `-20px 20px 40px -4px  ${COLOR_GRAY_LIGHT}30, 0px 0px 2px 0px  ${COLOR_GRAY_LIGHT}30`,
    "& .button": {
      minWidth: "170px",
      py: SPACE_SM,
      px: "20px",
    },
    "& .button-wrapper": {
      display: "flex",
      flexDirection: "row",
      gap: "12px",
      justifyContent: "flex-end",
    },
    "& .title-total": {
      color: "#637381",
      fontSize: FONT_CAPTION,
    },
    "& .rate-button": {
      fontSize: FONT_SMALL_TEXT,
      fontWeight: "600",
    },
    "& .navigation-texts": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      "& .navigation-texts-start": {
        display: "flex",
        alignItems: "center",
        "& .navigation-texts-start-divider": {
          mx: "12px",
          color: COLOR_PRIMARY,
          fontSize: "32px",
        },
        "& .navigation-texts-start-item": {},
      },
      "& .navigation-texts-end": {},
    },
  },
});
