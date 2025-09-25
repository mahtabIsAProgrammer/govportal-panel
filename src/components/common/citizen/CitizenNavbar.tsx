import {
  Grid,
  Box,
  List,
  Drawer,
  ListItem,
  Typography,
  ListItemText,
} from "@mui/material";
import {
  memo,
  useRef,
  useMemo,
  useState,
  useContext,
  useCallback,
} from "react";
import { filter, isUndefined, map } from "lodash";
import { useNavigate, useLocation } from "react-router-dom";

import {
  NotificationPaper,
  type ICommentsBox,
  CommentBoxContainers,
} from "../NotificationPopper";
import {
  homeICON,
  menuIcon,
  notificationICON,
  profileUpdateICON,
  changePasswordICON,
} from "../../other/FunctionalSVG";
import {
  drawerSX,
  userInfoSX,
  navbarCitizenX,
} from "../../../helpers/styles/navbar";
import {
  COLOR_PRIMARY,
  COLOR_WARNING,
} from "../../../helpers/constants/colors";
import {
  useNotificationData,
  useUpdateNotificationIsReadData,
} from "../../../services/hooks/notifications";
import { NoOptionComponent } from "../NoOptionComponent";
import { CustomButton } from "../../controllers/CustomButton";
import { CustomPopper } from "../../controllers/CustomPopper";
import { PAGE_SIZE } from "../../../helpers/constants/statics";
import { emptyValueString } from "../../other/EmptyComponents";
import { checkFalsyValue } from "../../../helpers/utils/values";
import { urlImageHandler } from "../../../helpers/utils/images";
import { tryCatchHandler } from "../../../helpers/utils/handlers";
import { MainContext } from "../../../helpers/others/mainContext";
import { CustomIcon, CustomImageBox } from "../../controllers/CustomImage";
import { DateTimeFormatBasicMOMENT } from "../../../helpers/utils/dateTime";
import type { NotificationDataApi } from "../../../services/configs/apiEndPoint";

export const CitizenNavbar = memo(() => {
  const [openCategoryPopper, setOpenCategoryPopper] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);
  const userRef = useRef(null);

  const [openNotifyPaper, setOpenNotifyPaper] = useState<boolean>(false);

  const {
    globalProfileInformation: {
      first_name,
      last_name,
      email,
      image,
      id: currentUserId,
    },
  } = useContext(MainContext);
  // const [checked, setChecked] = useState<boolean>(false);
  const [openPopper, setOpenPopper] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const notifyIconRef = useRef(null);

  const handleOpenPopper = useCallback((e: TAny) => {
    e.stopPropagation();
    setOpenPopper(true);
  }, []);

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const { mutateAsync: notificationUpdateIsRead } =
    useUpdateNotificationIsReadData();

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

  const unReadNotify = useMemo(
    () => map(filteredNotificationData(true), ({ id }) => id),
    [filteredNotificationData]
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

  return (
    <>
      <Grid className="navbar-wrapper">
        <Grid
          className="navbar-container"
          sx={navbarCitizenX(openCategoryPopper)}
        >
          <Grid className="logo-wrapper">
            <Box className="logo" component="img" src={"/logo.png"} />
          </Grid>

          <Grid className="nav-list-wrapper">
            {map(navbarValues, ({ name, url }, index) => (
              <Typography
                key={index}
                ref={name == "Category" ? ref : null}
                onClick={() => {
                  if (name == "Category") {
                    setOpenCategoryPopper(!openCategoryPopper);
                  } else {
                    navigate(url);
                    setOpenCategoryPopper(false);
                  }
                }}
                className={
                  location.pathname == url ||
                  (name == "Category" && openCategoryPopper)
                    ? "navbar-value-name active"
                    : "navbar-value-name"
                }
              >
                {name}
              </Typography>
            ))}
          </Grid>

          <Grid className="actions-wrapper">
            <Box ref={notifyIconRef}>
              <CustomIcon
                className="notif-icon"
                src={notificationICON(COLOR_PRIMARY)}
                width={32}
                height={32}
                onClick={openNotifyPopperHandler}
                badge={{
                  isExist:
                    filteredNotificationData(true)?.length > 0 ? true : false,
                  color: COLOR_WARNING,
                  count: unReadNotify?.length,
                }}
              />
            </Box>
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
                onClick={(e) => handleOpenPopper(e)}
              />
            </Box>

            <Box
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={handleDrawerToggle}
            >
              {menuIcon()}
            </Box>
          </Grid>
          <CustomPopper
            open={openPopper}
            anchorEl={userRef.current}
            onClickAway={() => {
              setOpenPopper(false);
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
                <Box onClick={() => navigate("/citizen/me")} className="item">
                  <CustomIcon src={profileUpdateICON()} />
                  <Typography>Profile</Typography>
                </Box>

                <Box
                  className="item"
                  onClick={() => navigate("/citizen/me/change-password")}
                >
                  <CustomIcon src={changePasswordICON()} />
                  <Typography>Change Password</Typography>
                </Box>
                <Box className="item" onClick={() => navigate("/citizen")}>
                  <CustomIcon src={homeICON()} />
                  <Typography>My Request</Typography>
                </Box>
              </Grid>
              <Grid className="log-out">
                <CustomButton
                  variant="text"
                  sx={{ width: "100%" }}
                  text={"Logout"}
                  onClick={() => navigate("/logout")}
                />
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
              </Grid>
            </Grid>
          </CustomPopper>
        </Grid>
      </Grid>

      {/* Mobile Drawer */}
      <Drawer
        sx={drawerSX}
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <List>
            {navbarValues.map(({ name, url }, index) => (
              <ListItem
                key={index}
                onClick={() => document.getElementById(url)}
              >
                <ListItemText primary={name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
});

const navbarValues = [
  { name: "Home", url: "/citizen" },
  { name: "Services", url: "#services" },
  { name: "Departments", url: "#department" },
];
