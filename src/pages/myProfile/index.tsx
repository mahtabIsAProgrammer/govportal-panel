import { Grid } from "@mui/material";
import { useContext, type FC } from "react";

import { SPACE_2XL } from "../../helpers/constants/spaces";
import ViewUser from "../../components/common/_root/ViewUser";
import { MainContext } from "../../helpers/others/mainContext";
import { useGetDepartmentById } from "../../services/hooks/departments";
import type { DepartmentDataApi } from "../../services/configs/apiEndPoint";

const MyProfile: FC<{ isCitizen?: boolean }> = ({ isCitizen }) => {
  const {
    isLoadingProfileInformation,
    globalProfileInformation: {
      date_of_birth,
      department_id,
      email,
      first_name,
      id,
      image,
      last_name,
      national_id,
      phone_number,
      role,
      username,
    },
  } = useContext(MainContext);

  const { data: departmentById, isLoading: isLoadingDepartmentId } =
    useGetDepartmentById(department_id || 0);
  const { name } =
    (departmentById as { data: DepartmentDataApi } | undefined)?.data ?? {};

  return (
    <Grid
      sx={
        isCitizen
          ? {
              display: "flex",
              alignItems: "center",
              height: "100vh",
              pt: SPACE_2XL,
              "& .view-user": {
                "& .container": {
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
              },
            }
          : {}
      }
    >
      <ViewUser
        link={isCitizen ? `/citizen/me/edit/${id}` : `/dashboard/me/edit/${id}`}
        isLoaiding={isLoadingProfileInformation || isLoadingDepartmentId}
        isMyProfile
        data={{
          date_of_birth: date_of_birth,
          department_id: name as TAny,
          email: email,
          first_name: first_name,
          id: id,
          image: image,
          last_name: last_name,
          national_id: national_id,
          phone_number: phone_number,
          role: role,
          username: username,
        }}
        title={"My Profile"}
        breadcrumbData={[
          { name: "dashboard", link: "/", type: "none" },
          { name: "my profile", link: "/dashboard/me", type: "list" },
        ]}
      />
    </Grid>
  );
};

export default MyProfile;
