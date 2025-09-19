import { useContext } from "react";

import ViewUser from "../../components/common/_root/ViewUser";
import { MainContext } from "../../helpers/others/mainContext";
import { useGetDepartmentById } from "../../services/hooks/departments";
import type { DepartmentDataApi } from "../../services/configs/apiEndPoint";

const MyProfile = () => {
  const { globalProfileInformation } = useContext(MainContext);

  const { data: departmentById } = useGetDepartmentById(
    globalProfileInformation?.department_id || 0
  );
  const { name } =
    (departmentById as { data: DepartmentDataApi } | undefined)?.data ?? {};

  return (
    <ViewUser
      isMyProfile
      data={{
        ...{ globalProfileInformation },
        ...{ department_id: name as TAny },
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
