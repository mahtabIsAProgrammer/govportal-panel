import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useGetUserById } from "../../services/hooks/users";
import ViewUser from "../../components/common/_root/ViewUser";
import type { UserDataApi } from "../../services/configs/apiEndPoint";

const View = () => {
  const { id: currentId } = useParams();
  const { data: userData } = useGetUserById(currentId);
  const userDataSearch = useMemo(
    () => (userData as { data: UserDataApi })?.data ?? [],
    [userData]
  );
  return (
    <ViewUser
      isMyProfile
      data={userDataSearch}
      title={"My Profile"}
      breadcrumbData={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "my profile", link: "/dashboard/me", type: "list" },
      ]}
    />
  );
};

export default View;
