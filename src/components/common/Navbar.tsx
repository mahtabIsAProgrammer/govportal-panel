import _ from "lodash";
import { Box, Grid, MenuItem, Typography } from "@mui/material";
import { useCallback, useContext, useRef, useState } from "react";

import {
  iranFlagICON,
  englandFlagICON,
  notificationICON,
} from "../other/FunctionalSVG";
import {
  navbarSX,
  userInfoSX,
  languageitemsSX,
} from "../../helpers/styles/navbar";
import {
  CustomIcon,
  CustomImageBox,
  CustomIconButton,
} from "../controllers/CustomImage";
import { CustomSwitch } from "../controllers/CustomSwitch";
import { CustomPopper } from "../controllers/CustomPopper";
import { CustomButton } from "../controllers/CustomButton";
import { MainContext } from "../../helpers/others/mainContext";

type TPopperTypes = "userPopper" | "languagePopper";

export const Navbar = () => {
  const { theme, changeTheme, changeLanguage, lng } = useContext(MainContext);
  const [checked, setChecked] = useState<boolean>(false);
  const [openPopper, setOpenPopper] = useState<TPopperTypes | undefined>(
    undefined
  );

  const userRef = useRef(null);
  const langRef = useRef(null);

  const handleOpenPopper = useCallback(
    (e: TAny, type: TPopperTypes) => {
      e.stopPropagation();
      setOpenPopper(openPopper == type ? undefined : type);
    },
    [openPopper]
  );

  const handleChangeLanguage = useCallback(
    (newLanguage: string) => {
      if (newLanguage != lng) changeLanguage(newLanguage, true);
      handleOpenPopper(_, "languagePopper");
    },
    [changeLanguage, handleOpenPopper, lng]
  );

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
      <Box ref={langRef}>
        <CustomIconButton
          width={30}
          height={30}
          onClick={(e) => handleOpenPopper(e, "languagePopper")}
          src={languageItems.find((i) => i.lng == lng)?.icon()}
        />
      </Box>
      <CustomIconButton src={notificationICON()} width={30} height={30} />
      <Box ref={userRef}>
        <CustomImageBox
          isAvatar
          src={"./"}
          variant="circular"
          onClick={(e) => handleOpenPopper(e, "userPopper")}
        />
      </Box>

      <CustomPopper
        open={openPopper === "languagePopper"}
        anchorEl={langRef.current}
        onClickAway={() => {
          setOpenPopper(undefined);
        }}
      >
        <Grid className="body" sx={languageitemsSX}>
          {languageItems?.map(({ lng, icon }, index: number) => (
            <MenuItem
              value="fa"
              className="select-item"
              onClick={() => handleChangeLanguage(lng)}
              key={index}
            >
              <CustomIcon src={icon()} className="flag-img" />
              <Box component="span" className="lang">
                <Typography variant="caption" className="text">
                  {lng}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Grid>
      </CustomPopper>

      <CustomPopper
        open={openPopper === "userPopper"}
        anchorEl={userRef.current}
        onClickAway={() => {
          setOpenPopper(undefined);
        }}
      >
        <Grid sx={userInfoSX}>
          <Grid className="info">
            <Typography className="name"></Typography>
            <Typography className="email"></Typography>
          </Grid>
          <Grid className="action-items">
            <Box>
              <CustomIcon src={undefined} />
              <Typography></Typography>
            </Box>
          </Grid>
          <Grid className="log-out">
            <CustomButton text={"Logout"} />
          </Grid>
        </Grid>
      </CustomPopper>
    </Grid>
  );
};

const languageItems = [
  { lng: "en", icon: englandFlagICON },
  { lng: "fa", icon: iranFlagICON },
];
