import {
  Box,
  Grid,
  type Theme,
  Autocomplete,
  type SxProps,
  type AutocompleteProps,
  type FilterOptionsState,
} from "@mui/material";
import { memo } from "react";
import { filter } from "lodash";

import {
  FONT_SMALL_TEXT,
  FONT_WEIGHT_MEDUIM,
} from "../../helpers/constants/fonts";
import {
  COLOR_WHITE,
  COLOR_PRIMARY,
  COLOR_PRIMARY_TEXT,
} from "../../helpers/constants/colors";
import { CustomTextfield } from "./CustomTextfield";
import { SPACE_SM, SPACE_XS } from "../../helpers/constants/spaces";
import { STYLE_AUTOCOMPLETE_ITEMS } from "../../helpers/constants/materials";

export interface ICustomAutocomplete
  extends Omit<
    AutocompleteProps<
      IOption,
      boolean | undefined,
      boolean | undefined,
      boolean | undefined
    >,
    "renderInput"
  > {
  loading?: boolean;
  errorMessage?: IErrorMessage;
  customLabel?: string;
  required?: boolean;
}

const EMPTY_VALUE = "nothing found!";
const noOptionsText = (
  <Box
    sx={{
      color: COLOR_PRIMARY,
      textAlign: "center",
      width: "100%",
    }}
  >
    {EMPTY_VALUE}
  </Box>
);
const filterOptions = (
  options: IOption[],
  params: FilterOptionsState<IOption>
) => {
  //const filtered = filter(options, params);
  const { inputValue } = params;
  const filtered = filter(options, ({ label }) => {
    return label?.toLowerCase()?.includes(inputValue);
  });

  return filtered;
};

const renderValue = (value: string, options: IOption[]) => {
  const label = options?.find((o) => o?.value == value)?.label;
  return label;
};

const getOptionDisabled = (option: IOption) => {
  return option?.isEmpty ? true : false;
};

export const CustomAutocomplete = memo<ICustomAutocomplete>(
  ({ errorMessage, options, customLabel, required, ...props }) => {
    return (
      <Grid
        sx={customAutocompleteSX}
        component="div"
        className="autocomplete-chip-wrapper"
      >
        <Autocomplete
          noOptionsText={noOptionsText}
          options={options}
          slotProps={{ listbox: { sx: STYLE_AUTOCOMPLETE_ITEMS } }}
          filterOptions={(options: IOption[], params) =>
            filterOptions(options, params)
          }
          renderValue={(value) =>
            renderValue(value as string, options as IOption[])
          }
          getOptionDisabled={(option: IOption) => getOptionDisabled(option)}
          renderInput={(params) => (
            <CustomTextfield
              {...params}
              isAutocomplete
              required={required}
              customLabel={customLabel}
              errorMessage={errorMessage}
            />
          )}
          {...props}
        />
      </Grid>
    );
  }
);

const customAutocompleteSX: SxProps<Theme> = {
  "& .MuiInputBase-root": {
    borderRadius: "12px",
    px: `${"14px"} !important`,
    "&.Mui-focused": {
      backgroundColor: `${`${COLOR_PRIMARY}20`}10`,
    },
  },
  "& div.MuiAutocomplete-endAdornment": {
    position: "absolute",
    right: "12px !important",
  },
  "& .MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-endAdornment":
    {
      right: "0",
    },
  "& .MuiAutocomplete-popper": {
    width: { xs: "100%", md: "450px" },
    my: `${SPACE_SM} !important`,
    boxShadow: "unset !important",
    borderRadius: `12px`,
    "& .MuiPaper-root ": {
      maxHeight: "340px",
      minWidth: "100px !important",
      overflowY: "hidden",
      background: COLOR_WHITE,
      p: `${SPACE_XS} !important`,
      borderRadius: "12px",
    },
  },
  "& .MuiInputBase-input": {
    color: `${COLOR_PRIMARY_TEXT} !important`,
    paddingRight: `${SPACE_XS} !important`,
    fontSize: `${FONT_SMALL_TEXT} !important`,
    fontWeight: `${FONT_WEIGHT_MEDUIM} !important`,
    "::placeholder": {
      color: "#919EAB",
    },
  },
  "& .MuiAutocomplete-option": {
    display: "flex",
    justifyContent: "flex-start",
    my: SPACE_XS,
    height: "45px",
    width: "100% !important",
    borderRadius: "8px",
    fontSize: `${FONT_SMALL_TEXT} !important`,
    "&:hover": {
      background: `${"#919EAB"}20`,
    },
  },
  "& ul": {
    p: "0 !important",
  },
};
