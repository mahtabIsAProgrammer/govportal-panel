import {
  Grid,
  Radio,
  type Theme,
  RadioGroup,
  type SxProps,
  type RadioProps,
  FormControlLabel,
  type RadioGroupProps,
} from "@mui/material";
import { memo } from "react";
import { map } from "lodash";

import { CustomLabel } from "./CustomLabel";
import { ErrorMessage } from "./CustomTextfield";
import { SPACE_MD } from "../../helpers/constants/spaces";
import { COLOR_PRIMARY_TEXT } from "../../helpers/constants/colors";

type TCustomRadio = RadioProps;

export interface ICustomRadioGroup
  extends IStaticControllerProps,
    RadioGroupProps {
  data?: IDataRadio[];
  shape?: "row" | "column" | undefined;
}

export const CustomRadio = ({ ...props }: TCustomRadio) => {
  return (
    <Grid>
      <Radio {...props} />
    </Grid>
  );
};

export const CustomRadioGroup = memo<ICustomRadioGroup>(
  ({
    data,
    shape,
    customLabel,
    disabled,
    errorMessage,
    required,
    ...props
  }) => {
    return (
      <Grid sx={customRadioSX(shape)} className="radio-group">
        {customLabel ? (
          <CustomLabel customLabel={customLabel} required={required} />
        ) : undefined}

        <RadioGroup {...{ ...props, className: "custom-radio" }}>
          {map(data, ({ value, label, control, labelPlacement }, key) => (
            <FormControlLabel
              key={key}
              value={value}
              label={label}
              control={control ?? <CustomRadio disabled={disabled} />}
              labelPlacement={labelPlacement}
              {...{ className: "custom-label-radio" }}
            />
          ))}
        </RadioGroup>
        {errorMessage && (
          <ErrorMessage
            disabled={disabled}
            text={errorMessage?.text}
            type={errorMessage?.type}
          />
        )}
      </Grid>
    );
  }
);

const customRadioSX = (
  shape: "row" | "column" | undefined
): SxProps<Theme> => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  pb: SPACE_MD,
  width: "100%",
  "& .local-radio": {
    width: "100%",
    display: "flex",
    flexDirection: shape ?? "row",
    padding: 0,
    margin: 0,
  },
  "& .MuiFormControlLabel-label": {
    display: "flex",
    fontWeight: `unset !important`,
  },
  "& .MuiFormControlLabel-root": {
    justifyContent: "unset",
    WebkitJustifyContent: "unset",
  },
  "& .local-label-radio": {
    color: COLOR_PRIMARY_TEXT,
    fontWeight: `400`,
    margin: "0 !important",
  },
  "& .error-message": {
    "& .text-icon": {
      marginTop: 0,
    },
    "& .icon": {
      marginTop: 0,
    },
  },
});
