import { find } from "lodash";
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
  phoneNumberICON,
} from "../../other/FunctionalSVG";
import { HeaderPage } from "../Header";
import { ViewUserLoading } from "../Loading";
import { viewUserSX } from "../../../helpers/styles/advances";
import { emptyValueString } from "../../other/EmptyComponents";
import { urlImageHandler } from "../../../helpers/utils/images";
import { GENDER_TYPES_DATA } from "../../../helpers/utils/types";
import { calculateAgeAtDeath } from "../../../helpers/utils/dateTime";
import type { UserDataApi } from "../../../services/configs/apiEndPoint";
import { COLOR_SECONDARY_TEXT } from "../../../helpers/constants/colors";
import { CustomImageBox, CustomIcon } from "../../controllers/CustomImage";

interface IViewUser {
  data: UserDataApi;
  title: string;
  isMyProfile?: boolean;
  isLoaiding: boolean;
  link?: string;
  breadcrumbData: IBreadcrumbsItems[];
}

const ViewUser: FC<IViewUser> = ({
  data,
  title,
  isMyProfile,
  breadcrumbData,
  isLoaiding,
  link,
}) => {
  return isLoaiding ? (
    <ViewUserLoading />
  ) : (
    <Grid className="view-user" sx={viewUserSX}>
      <HeaderPage
        title={title}
        breadcrumbData={breadcrumbData}
        button={
          isMyProfile
            ? {
                props: { text: "edit" },
                link: link ?? `/dashboard/me/edit/${data?.id}`,
              }
            : undefined
        }
      />
      <Grid className="container">
        <Grid className="profile-box">
          <Box className="image-wrapper">
            <CustomImageBox
              src={urlImageHandler(data?.image, true) ?? ""}
              width={{ xs: "200px", md: "380px" }}
              height={{ xs: "200px", md: "380px" }}
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
                <Typography className="title">Age: </Typography>
              </Box>
              <Typography className="item-text">
                {calculateAgeAtDeath(data?.date_of_birth || "") ||
                  emptyValueString}{" "}
                years old
              </Typography>
            </Box>
            <Box className="item">
              <Box className="item-title">
                <CustomIcon src={genderICON(COLOR_SECONDARY_TEXT)} />
                <Typography className="title">Gender: </Typography>
              </Box>
              <Typography className="item-text">
                {find(GENDER_TYPES_DATA, ({ id }) => data?.gender === id)?.name}{" "}
              </Typography>
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
          {data?.department_id && (
            <Box className="item">
              <Box className="item-title">
                <CustomIcon src={departmentICON(COLOR_SECONDARY_TEXT)} />
                <Typography className="title">Department: </Typography>
              </Box>
              <Typography className="item-text">
                {data.department_id || emptyValueString}
              </Typography>
            </Box>
          )}
          <Box className="item">
            <Box className="item-title">
              <CustomIcon src={phoneNumberICON(COLOR_SECONDARY_TEXT)} />
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
