import { CustomImageBox } from "../../components/controllers/CustomImage";

import emptyImage from "../../assets/images/empty-image.webp";

export const Dashboard = () => {
  return (
    <div>
      Dashboard
      <div>
        <CustomImageBox src={emptyImage} />
      </div>
    </div>
  );
};
