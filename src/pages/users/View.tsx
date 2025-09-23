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
  const {
    date_of_birth,
    department_id,
    email,
    first_name,
    id,
    image,
    last_name,
    national_id,
    password,
    phone_number,
    role,
    username,
  } = useMemo(
    () => (userData as { data: UserDataApi })?.data ?? [],
    [userData]
  );

  const { data: departmentById } = useGetDepartmentById(department_id || 0);
  const { name } =
    (departmentById as { data: DepartmentDataApi } | undefined)?.data ?? {};

  return (
    <ViewUser
      data={{
        date_of_birth,
        email,
        first_name,
        id,
        image,
        last_name,
        national_id,
        password,
        phone_number,
        role,
        username,
        department_id: name as TAny,
      }}
      title={"User Profie"}
      breadcrumbData={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "my profile", link: "/dashboard/me", type: "list" },
      ]}
    />
  );
};

export default View;
