import { Grid } from "@mui/material";
import { useContext, useState } from "react";

import { navbarSX } from "../../helpers/styles/navbar";
import { CustomSwitch } from "../controllers/CustomSwitch";
import { MainContext } from "../../helpers/others/mainContext";
import { englandFlagICON, notificationICON } from "../other/FunctionalSVG";
import { CustomIconButton, CustomImageBox } from "../controllers/CustomImage";

export const Navbar = () => {
  const { theme, changeTheme } = useContext(MainContext);
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <Grid sx={navbarSX(theme)}>
      <CustomSwitch
        checked={checked}
        onChange={(e) => {
          const isChecked = e.target.checked;
          setChecked(isChecked);
          changeTheme(isChecked ? "dark" : "light");
        }}
      />
      <CustomIconButton src={englandFlagICON()} width={30} height={30} />
      <CustomIconButton src={notificationICON()} width={30} height={30} />
      <CustomImageBox src={"./"} variant="circular" />
    </Grid>
  );
};
