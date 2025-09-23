import type { FC } from "react";
import { Box, Grid, Typography } from "@mui/material";

import {
  roleICON,
  emailICON,
  genderICON,
  profileICON,
  calenderICON,
  departmentICON,
  identityCardICON,
} from "../../other/FunctionalSVG";
import { HeaderPage } from "../Header";
import { viewUserSX } from "../../../helpers/styles/advances";
import { emptyValueString } from "../../other/EmptyComponents";
import { urlImageHandler } from "../../../helpers/utils/images";
import type { UserDataApi } from "../../../services/configs/apiEndPoint";
import { COLOR_SECONDARY_TEXT } from "../../../helpers/constants/colors";
import { CustomImageBox, CustomIcon } from "../../controllers/CustomImage";

interface IViewUser {
  data: UserDataApi;
  title: string;
  isMyProfile?: boolean;
  breadcrumbData: IBreadcrumbsItems[];
}

const ViewUser: FC<IViewUser> = ({
  data,
  title,
  isMyProfile,
  breadcrumbData,
}) => {
  return (
    <Grid sx={viewUserSX}>
      <HeaderPage
        title={title}
        breadcrumbData={breadcrumbData}
        button={
          isMyProfile
            ? {
                props: { text: "edit" },
                link: `/dashboard/me/edit/${data?.id}`,
              }
            : undefined
        }
      />
      <Grid className="container">
        <Grid className="profile-box">
          <Box className="image-wrapper">
            <CustomImageBox
              src={urlImageHandler(data?.image) ?? ""}
              width="380px"
              height="380px"
            />
          </Box>
          <Box className="texts-wrapper">
            <Box className="item">
              <Box className="item-title">
                <CustomIcon src={profileICON(COLOR_SECONDARY_TEXT)} />
                <Typography className="title">Full Name:</Typography>
              </Box>
              <Typography className="item-text">{`${data?.first_name} ${data?.last_name}`}</Typography>
            </Box>
            <Box className="item">
              <Box className="item-title">
                <CustomIcon src={emailICON(COLOR_SECONDARY_TEXT)} />
                <Typography className="title">Email: </Typography>
              </Box>
              <Typography className="item-text">
                {data?.email || emptyValueString}
              </Typography>
            </Box>
            <Box className="item">
              {" "}
              <Box className="item-title">
                <CustomIcon src={identityCardICON(COLOR_SECONDARY_TEXT)} />
                <Typography className="title">National Id: </Typography>
              </Box>
              <Typography className="item-text">
                {data?.national_id || emptyValueString}
              </Typography>
            </Box>
            <Box className="item">
              <Box className="item-title">
                <CustomIcon src={calenderICON(COLOR_SECONDARY_TEXT)} />
                <Typography className="title">Birthday: </Typography>
              </Box>
              <Typography className="item-text">
                {data?.date_of_birth || emptyValueString}
              </Typography>
            </Box>
            <Box className="item">
              <Box className="item-title">
                <CustomIcon src={genderICON(COLOR_SECONDARY_TEXT)} />
                <Typography className="title">Gender: </Typography>
              </Box>
              <Typography className="item-text">{"female"} </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid className="role-box">
          <Box className="item">
            <Box className="item-title">
              <CustomIcon src={roleICON(COLOR_SECONDARY_TEXT)} />
              <Typography className="title">Role: </Typography>
            </Box>
            <Typography className="item-text">
              {data?.role || emptyValueString}
            </Typography>
          </Box>
          <Box className="item">
            <Box className="item-title">
              <CustomIcon src={departmentICON(COLOR_SECONDARY_TEXT)} />
              <Typography className="title">Department: </Typography>
            </Box>
            <Typography className="item-text">
              {data?.department_id || emptyValueString}
            </Typography>
          </Box>
          <Box className="item">
            <Box className="item-title">
              <CustomIcon src={departmentICON(COLOR_SECONDARY_TEXT)} />
              <Typography className="title">Phone Number: </Typography>
            </Box>
            <Typography className="item-text">
              {data?.phone_number || emptyValueString}
            </Typography>
          </Box>
        </Grid>

        {/* <Grid className="social-media-box">
          <Box className="item">
            <CustomIcon src={instagramICON(COLOR_SECONDARY_TEXT)} />
            <Typography className="item-text">instagram</Typography>
          </Box>
          <Box className="item">
            <CustomIcon src={xICON(COLOR_SECONDARY_TEXT)} />
            <Typography className="item-text">X</Typography>
          </Box>
          <Box className="item">
            <CustomIcon src={telegramICON(COLOR_SECONDARY_TEXT)} />
            <Typography className="item-text">Telegram</Typography>
          </Box>
          <Box className="item">
            <CustomIcon src={telegramICON(COLOR_SECONDARY_TEXT)} />
            <Typography className="item-text">Facebook</Typography>
          </Box>
        </Grid> */}
      </Grid>
    </Grid>
  );
};

export default ViewUser;
