import {
  Box,
  Tab,
  Typography,
  type Theme,
  tabsClasses,
  type SxProps,
} from "@mui/material";
import { map } from "lodash";
import { useState, type FC, type ReactNode } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import {
  COLOR_WHITE,
  COLOR_PRIMARY_TEXT,
} from "../../helpers/constants/colors";
import { checkUndefiendOrNull } from "../../helpers/utils/values";
import { SPACE_2XL, SPACE_SM, SPACE_XS } from "../../helpers/constants/spaces";
import { FONT_CAPTION, FONT_SMALL_TEXT } from "../../helpers/constants/fonts";

export interface ITabData<T = ReactNode> {
  component: T;
  color?: string;
  label?: string;
  tabNumber?: number;
}

export interface ICustomTab {
  data: ITabData[];
}

export const CustomTab: FC<ICustomTab> = ({ data }) => {
  const [value, setValue] = useState<string>("0");
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box component="div" sx={customTabSX} className="custom-tab">
      <TabContext value={value}>
        <Box className="tab-item">
          <TabList
            onChange={handleChange}
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                "&.Mui-disabled": { opacity: 1, pointerEvents: "unset" },
              },
            }}
          >
            {map(data, ({ label, tabNumber, color }, index) => {
              const tabNumberSX: SxProps<Theme> = {
                background:
                  index == +value ? `${color} !important` : `${color}50`,
                color: index == +value ? "white" : `${color} !important`,
              };
              const labelText = (
                <Typography
                  className={index == +value ? "label active-tab" : "label"}
                >
                  {label}
                </Typography>
              );

              const icon = (
                <Box component="div" className="icon" sx={tabNumberSX}>
                  <Typography className="tab-number">
                    {tabNumber
                      ? +tabNumber < 99
                        ? tabNumber.toString()
                        : "99" + "+"
                      : checkUndefiendOrNull(tabNumber)
                      ? ""
                      : "0"}
                  </Typography>
                </Box>
              );
              return (
                <Tab
                  key={index}
                  icon={icon}
                  label={labelText}
                  value={index.toString()}
                />
              );
            })}
          </TabList>
        </Box>
        {data?.map(({ component }, index: number) => (
          <TabPanel key={index} value={index.toString()}>
            {component}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

const customTabSX: SxProps<Theme> = {
  width: "100%",
  typography: "body1",
  background: COLOR_WHITE,
  borderRadius: "25px",
  boxShadow:
    " -20px 20px 40px -4px rgba(145, 158, 171, 0.24), 0px 0px 2px 0px rgba(145, 158, 171, 0.24)",
  "& .tab-item": {
    margin: "auto",
    height: "60px",
    display: "flex",
    alignItems: "center",
    background: `${"#DEE3ED"}50`,
    borderTopLeftRadius: "25px",
    borderTopRightRadius: "25px",
    "& :first-of-type": {
      height: "100%",
    },
    "& .tabs": { marginLeft: SPACE_2XL },
    "& .label": {
      height: "auto",
      color: "#637381",
      fontSize: FONT_SMALL_TEXT,
      fontWeight: "600",
      textTransform: "capitalize !important",
    },
    "& .active-tab": {
      color: COLOR_PRIMARY_TEXT,
    },
    "& button": {
      gap: SPACE_SM,
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      paddingBottom: "12px",
      fontSize: FONT_CAPTION,
      fontWeight: "800",
      mx: SPACE_XS,
      "& .MuiTab-iconWrapper": {
        margin: undefined,
      },
      "& .icon": {
        width: "24px",
        height: "24px",
        display: "flex",
        margin: undefined,
        color: COLOR_WHITE,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "4px",
        "& p": {
          marginTop: "5px",
          fontSize: FONT_SMALL_TEXT,
          fontWeight: "800",
        },
      },
    },
    "& .scroll-button-tab": {
      direction: "rtl",
    },
  },
  "& .icon": {
    opacity: "100% !important",
  },
  "& .MuiTabs-scroller": {
    overflowX: "auto !important",
  },

  "& .MuiTabScrollButton-root .MuiTouchRipple-root": {
    display: "none",
  },
  "& .MuiTabs-indicator": {
    height: "2px !important",
  },
  "& .MuiTabPanel-root": {
    p: "0px",
  },
};
