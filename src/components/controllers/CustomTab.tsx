import { map } from "lodash";
import { useState, type FC, type ReactNode } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Typography, type SxProps, type Theme } from "@mui/material";

import { checkUndefiendOrNull } from "../../helpers/utils/values";

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
          <TabList onChange={handleChange}>
            {map(data, ({ label, tabNumber }, index) => {
              const labelText = (
                <Typography
                  className={index == +value ? "label active-tab" : "label"}
                >
                  {label}
                </Typography>
              );

              const icon = (
                <Box component="div" className="icon">
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

const customTabSX: SxProps<Theme> = {};
