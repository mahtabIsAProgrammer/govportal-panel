import { useMemo } from "react";
import { useParams } from "react-router-dom";

import type {
  UserDataApi,
  DepartmentDataApi,
} from "../../services/configs/apiEndPoint";
import { useGetUserById } from "../../services/hooks/users";
import ViewUser from "../../components/common/_root/ViewUser";
import { useGetDepartmentById } from "../../services/hooks/departments";

const View = () => {
  const { id: currentId } = useParams();
  const { data: userData } = useGetUserById(currentId);
  const userDataSearch = useMemo(
    () => (userData as { data: UserDataApi })?.data ?? [],
    [userData]
  );

  const { data: departmentById } = useGetDepartmentById(
    userDataSearch?.department_id || 0
  );
  const { name } =
    (departmentById as { data: DepartmentDataApi } | undefined)?.data ?? {};

  return (
    <ViewUser
      isMyProfile
      data={{ ...{ userDataSearch }, ...{ department_id: name as TAny } }}
      title={"My Profile"}
      breadcrumbData={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "my profile", link: "/dashboard/me", type: "list" },
      ]}
    />
  );
};

export default View;
