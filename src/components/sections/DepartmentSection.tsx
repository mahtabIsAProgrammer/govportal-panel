import { Grid } from "@mui/material";
import { departmentSectionSX } from "../../helpers/styles/sections";
import type { FC } from "react";
import type { DepartmentDataApi } from "../../services/configs/apiEndPoint";
import { DepartmentCard } from "../common/citizen/DepartmentCard";
import { map } from "lodash";
import { CustomTitle } from "../common/citizen/CustomTitle";
import { useNavigate } from "react-router-dom";

export const DepartmentSection: FC<{ data: DepartmentDataApi[] }> = ({
  data,
}) => {
  const navigate = useNavigate();
  return (
    <Grid sx={departmentSectionSX}>
      <CustomTitle title="Departments" />
      <Grid className="department-wrapper">
        {data &&
          map(data, (item) => (
            <DepartmentCard
              onClick={() => navigate(`/citizen/departments/${item?.id}`)}
              data={item}
            />
          ))}
      </Grid>
    </Grid>
  );
};
