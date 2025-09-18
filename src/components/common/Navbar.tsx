import { isUndefined } from "lodash";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import { useCallback, useContext, useRef, useState } from "react";

import {
  homeICON,
  notificationICON,
  profileUpdateICON,
  changePasswordICON,
} from "../other/FunctionalSVG";
import { CustomPopper } from "../controllers/CustomPopper";
import { CustomButton } from "../controllers/CustomButton";
import { emptyValueString } from "../other/EmptyComponents";
import { COLOR_PRIMARY } from "../../helpers/constants/colors";
import { MainContext } from "../../helpers/others/mainContext";
import { navbarSX, userInfoSX } from "../../helpers/styles/navbar";
import { CustomIcon, CustomImageBox } from "../controllers/CustomImage";

import profileImage from "../../assets/images/profile.png";

type TPopperTypes = "userPopper" | "languagePopper";

export const Navbar = () => {
  const navigate = useNavigate();
  const {
    theme,
    globalProfileInformation: { first_name, last_name, email },
  } = useContext(MainContext);
  // const [checked, setChecked] = useState<boolean>(false);
  const [openPopper, setOpenPopper] = useState<TPopperTypes | undefined>(
    undefined
  );

  const userRef = useRef(null);
  // const langRef = useRef(null);

  const handleOpenPopper = useCallback(
    (e: TAny, type: TPopperTypes) => {
      e.stopPropagation();
      setOpenPopper(openPopper == type ? undefined : type);
    },
    [openPopper]
  );

  // const handleChangeLanguage = useCallback(
  //   (newLanguage: string) => {
  //     if (newLanguage != lng) changeLanguage(newLanguage, true);
  //     handleOpenPopper(_, "languagePopper");
  //   },
  //   [changeLanguage, handleOpenPopper, lng]
  // );

  return (
    <Grid sx={navbarSX(theme)}>
      {/* <CustomSwitch
        checked={checked}
        onChange={(e) => {
          const isChecked = e.target.checked;
          setChecked(isChecked);
          changeTheme(isChecked ? "dark" : "light");
        }}
      /> */}
      {/* <Box ref={langRef}>
        <CustomIconButton
          width={30}
          height={30}
          onClick={(e) => handleOpenPopper(e, "languagePopper")}
          src={languageItems.find((i) => i.lng == lng)?.icon()}
        />
      </Box> */}
      <CustomIcon
        className="notif-icon"
        src={notificationICON(COLOR_PRIMARY)}
        width={30}
        height={30}
      />
      <Box ref={userRef}>
        <CustomImageBox
          isAvatar
          width="45px"
          height="45px"
          sx={{
            cursor: "pointer",
            "&:hover": { scale: "1.1", transition: "0.3s" },
          }}
          withOutPreview
          src={profileImage}
          variant="circular"
          onClick={(e) => handleOpenPopper(e, "userPopper")}
        />
      </Box>

      {/* <CustomPopper
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
      </CustomPopper> */}

      <CustomPopper
        open={openPopper === "userPopper"}
        anchorEl={userRef.current}
        onClickAway={() => {
          setOpenPopper(undefined);
        }}
      >
        <Grid sx={userInfoSX}>
          <Grid className="info">
            <Typography className="name">
              {!isUndefined(first_name)
                ? `${first_name} ${last_name}`
                : emptyValueString}
            </Typography>
            <Typography className="email">
              {email || emptyValueString}
            </Typography>
          </Grid>
          <Grid className="action-items">
            <Box className="item" onClick={() => navigate("/")}>
              <CustomIcon src={homeICON()} />
              <Typography>Home</Typography>
            </Box>
            <Box onClick={() => navigate("/dashboard/me")} className="item">
              <CustomIcon src={profileUpdateICON()} />
              <Typography>Profile</Typography>
            </Box>

            <Box className="item">
              <CustomIcon src={changePasswordICON()} />
              <Typography>Change Password</Typography>
            </Box>
          </Grid>
          <Grid className="log-out">
            <CustomButton
              variant="text"
              sx={{ width: "100%" }}
              text={"Logout"}
              onClick={() => navigate("/logout")}
            />
          </Grid>
        </Grid>
      </CustomPopper>
    </Grid>
  );
};

// const languageItems = [
//   { lng: "en", icon: englandFlagICON },
//   { lng: "fa", icon: iranFlagICON },
// ];
