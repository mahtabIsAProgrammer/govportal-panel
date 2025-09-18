import { useContext } from "react";

import ViewUser from "../../components/common/_root/ViewUser";
import { MainContext } from "../../helpers/others/mainContext";

const MyProfile = () => {
  const { globalProfileInformation } = useContext(MainContext);
  return (
    <ViewUser
      isMyProfile
      data={globalProfileInformation}
      title={"My Profile"}
      breadcrumbData={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "my profile", link: "/dashboard/me", type: "list" },
      ]}
    />
  );
};

export default MyProfile;
