import { useNavigate } from "react-router-dom";
import { filter, isUndefined, map } from "lodash";
import { Box, Grid, Typography } from "@mui/material";
import { useCallback, useContext, useMemo, useRef, useState } from "react";

import {
  NotificationPaper,
  type ICommentsBox,
  CommentBoxContainers,
} from "./NotificationPopper";
import {
  homeICON,
  notificationICON,
  profileUpdateICON,
  changePasswordICON,
} from "../other/FunctionalSVG";
import {
  useNotificationData,
  useUpdateNotificationIsReadData,
} from "../../services/hooks/notifications";
import { NoOptionComponent } from "./NoOptionComponent";
import { CustomPopper } from "../controllers/CustomPopper";
import { CustomButton } from "../controllers/CustomButton";
import { emptyValueString } from "../other/EmptyComponents";
import { PAGE_SIZE } from "../../helpers/constants/statics";
import { checkFalsyValue } from "../../helpers/utils/values";
import { urlImageHandler } from "../../helpers/utils/images";
import { tryCatchHandler } from "../../helpers/utils/handlers";
import { MainContext } from "../../helpers/others/mainContext";
import { navbarSX, userInfoSX } from "../../helpers/styles/navbar";
import { CustomIcon, CustomImageBox } from "../controllers/CustomImage";
import { DateTimeFormatBasicMOMENT } from "../../helpers/utils/dateTime";
import type { NotificationDataApi } from "../../services/configs/apiEndPoint";
import { COLOR_PRIMARY, COLOR_WARNING } from "../../helpers/constants/colors";

type TPopperTypes = "userPopper" | "languagePopper";

export const Navbar = () => {
  const navigate = useNavigate();
  const {
    theme,
    globalProfileInformation: {
      first_name,
      last_name,
      email,
      image,
      id: currentUserId,
    },
  } = useContext(MainContext);
  // const [checked, setChecked] = useState<boolean>(false);
  const [openPopper, setOpenPopper] = useState<TPopperTypes | undefined>(
    undefined
  );

  const [openNotifyPaper, setOpenNotifyPaper] = useState<boolean>(false);

  const { data: notificationsSearch } = useNotificationData(
    1,
    PAGE_SIZE,
    undefined,
    { user_id: currentUserId || undefined }
  );

  const notificationData = useMemo(
    () =>
      (
        notificationsSearch as unknown as {
          data: (NotificationDataApi & {
            createdOn: string;
            id: number;
          })[];
        }
      )?.data,
    [notificationsSearch]
  );

  const filteredNotificationData = useCallback(
    (isNew: boolean) =>
      filter(notificationData, ({ is_read }) =>
        isNew ? is_read == false : is_read == true
      ),
    [notificationData]
  );

  const notificationDataArray = useCallback(
    (isNew: boolean): ICommentsBox[] => [
      ...map(
        filteredNotificationData(isNew),
        ({ message, title, created_at }) => {
          return {
            date: DateTimeFormatBasicMOMENT(created_at),
            isNew: isNew,
            title: title || emptyValueString,
            message: message || emptyValueString,
          };
        }
      ),
    ],
    [filteredNotificationData]
  );

  const ref = useRef<HTMLDivElement | null>(null);
  const userRef = useRef(null);
  const notifyIconRef = useRef(null);
  // const langRef = useRef(null);

  const handleOpenPopper = useCallback(
    (e: TAny, type: TPopperTypes) => {
      e.stopPropagation();
      setOpenPopper(openPopper == type ? undefined : type);
    },
    [openPopper]
  );

  const { mutateAsync: notificationUpdateIsRead } =
    useUpdateNotificationIsReadData();

  const unReadNotify = useMemo(
    () => map(filteredNotificationData(true), ({ id }) => id),
    [filteredNotificationData]
  );

  const openNotifyPopperHandler = useCallback(
    (e: TAny) => {
      tryCatchHandler({
        handler: async () => {
          e.stopPropagation();
          setOpenNotifyPaper(!openNotifyPaper);
          if (checkFalsyValue(unReadNotify)) {
            const data = notificationUpdateIsRead(unReadNotify);
            return data;
          }
          return;
        },
        notShowMessage: { isErrorMessage: true, isSuccessMessage: true },
      });
    },
    [notificationUpdateIsRead, openNotifyPaper, unReadNotify]
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
      <Box ref={notifyIconRef}>
        <CustomIcon
          className="notif-icon"
          src={notificationICON(COLOR_PRIMARY)}
          width={32}
          height={32}
          onClick={openNotifyPopperHandler}
          badge={{
            isExist: filteredNotificationData(true)?.length > 0 ? true : false,
            color: COLOR_WARNING,
            count: unReadNotify?.length,
          }}
        />
      </Box>
      <NotificationPaper
        notificationCount={notificationData?.length}
        open={openNotifyPaper}
        anchorEl={notifyIconRef.current}
        onClickAway={() => setOpenNotifyPaper(false)}
        dataComponent={
          notificationData?.length > 0 ? (
            <Grid className="wrapper-boxes" ref={ref}>
              <CommentBoxContainers
                label={"new messages"}
                data={notificationDataArray(true)}
              />
              <CommentBoxContainers
                label={"pervious messages"}
                data={notificationDataArray(false)}
              />
            </Grid>
          ) : (
            <NoOptionComponent label="No Notification" />
          )
        }
      />
      <Box ref={userRef}>
        <CustomImageBox
          hasBorder
          isAvatar
          width="42px"
          height="42px"
          sx={{
            cursor: "pointer",
            "&:hover": { scale: "1.1", transition: "0.3s" },
          }}
          withOutPreview
          src={urlImageHandler(image)}
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

            <Box
              className="item"
              onClick={() => navigate("/dashboard/me/change-password")}
            >
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
