import type { FC } from "react";
import { map, slice } from "lodash";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { CustomTitle } from "../common/citizen/CustomTitle";
import { DepartmentCard } from "../common/citizen/DepartmentCard";
import { departmentSectionSX } from "../../helpers/styles/sections";
import type { DepartmentDataApi } from "../../services/configs/apiEndPoint";

export const DepartmentSection: FC<{ data: DepartmentDataApi[] }> = ({
  data,
}) => {
  const navigate = useNavigate();
  return (
    <Grid sx={departmentSectionSX}>
      <div id={"departments"}></div>
      <CustomTitle
        title="Departments"
        description="Our diverse departments are dedicated to delivering a wide range of specialized services tailored to meet your needs. Each department is staffed with experts committed to excellence and innovation. Explore our offerings to find the perfect solution for your requirements."
      />
      <Grid className="department-wrapper">
        {data &&
          map(slice(data, 0, 4), (item) => (
            <DepartmentCard
              onClick={() => navigate(`/citizen/departments/${item?.id}`)}
              data={item}
            />
          ))}
      </Grid>
    </Grid>
  );
};
