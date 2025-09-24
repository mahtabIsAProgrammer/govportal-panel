import { useContext } from "react";

import ViewUser from "../../components/common/_root/ViewUser";
import { MainContext } from "../../helpers/others/mainContext";
import { useGetDepartmentById } from "../../services/hooks/departments";
import type { DepartmentDataApi } from "../../services/configs/apiEndPoint";

const MyProfile = () => {
  const {
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

  const { data: departmentById } = useGetDepartmentById(department_id || 0);
  const { name } =
    (departmentById as { data: DepartmentDataApi } | undefined)?.data ?? {};

  return (
    <ViewUser
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
  );
};

export default MyProfile;
