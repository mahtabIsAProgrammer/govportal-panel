import {
  Grid,
  Stack,
  Checkbox,
  Typography,
  type CheckboxProps,
} from "@mui/material";
import { memo } from "react";
import { map } from "lodash";

import {
  checkBoxFilledICON,
  checkBoxOutlineICON,
} from "../other/FunctionalSVG";
import {
  COLOR_PRIMARY,
  COLOR_MUTED_TEXT,
} from "../../helpers/constants/colors";
import { CustomLabel } from "./CustomLabel";
import { ErrorMessage } from "./CustomTextfield";

export interface ICustomCheckbox extends CheckboxProps {
  required?: boolean;
  customLabel?: string;
  tooltip?: {
    text: string;
    placement?: "bottom" | "top" | "right" | "left";
  };
  errorMessage?: IErrorMessage;
}

export interface ICustomCheckboxGroup extends IStaticControllerProps {
  checkedId?: number;
  items?: IDataCheckbox[];
  variant?: "row" | "column";
  onChange: (id: number) => void;
}

export const CustomCheckbox = memo<ICustomCheckbox>(
  ({ customLabel, errorMessage, required, disabled, ...props }) => {
    return (
      <Stack>
        {customLabel ? (
          <CustomLabel
            required={required}
            disabled={disabled}
            customLabel={customLabel}
          />
        ) : undefined}
        <Checkbox
          {...props}
          disabled={disabled}
          sx={{ opacity: disabled ? 0.4 : 1 }}
          checkedIcon={checkBoxFilledICON(COLOR_PRIMARY)}
          icon={checkBoxOutlineICON(COLOR_MUTED_TEXT)}
        />
        {errorMessage && (
          <ErrorMessage
            disabled={disabled}
            text={errorMessage?.text}
            type={errorMessage?.type}
          />
        )}
      </Stack>
    );
  }
);

export const CustomCheckboxGroup = memo<ICustomCheckboxGroup>(
  ({
    onChange,
    checkedId,
    customLabel,
    errorMessage,
    items,
    required,
    disabled,
  }) => {
    return (
      <Grid>
        {customLabel ? (
          <CustomLabel
            required={required}
            disabled={disabled}
            customLabel={customLabel}
          />
        ) : undefined}
        <Grid>
          {map(items, ({ id, label }) => (
            <Grid key={id}>
              <Typography>{label}</Typography>
              <CustomCheckbox
                checked={checkedId == id}
                onChange={() => onChange(id)}
              />
            </Grid>
          ))}
        </Grid>
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
