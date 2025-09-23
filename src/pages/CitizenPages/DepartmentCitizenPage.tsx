import { Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useServiceData } from "../../services/hooks/services";
import { PAGE_SIZE } from "../../helpers/constants/statics";
import type { ServiceDataApi } from "../../services/configs/apiEndPoint";
import { ServiceCard } from "../../components/common/citizen/ServiceCard";
import { map } from "lodash";
import { departmentCitizenPageSX } from "../../helpers/styles/pages/citizenPages";
import { CustomTitle } from "../../components/common/citizen/CustomTitle";

export const DepartmentCitizenPage = () => {
  const { id: currentId } = useParams();
  const navigate = useNavigate();
  const { data: serviceSearch } = useServiceData(1, PAGE_SIZE, undefined, {
    department_id: currentId ? +currentId : 0,
  });
  const serviceData = (
    serviceSearch as unknown as {
      data: ServiceDataApi[];
    }
  )?.data;

  return (
    <Grid sx={departmentCitizenPageSX} className="department-citizen-page">
      <Grid className="contnet">
        <CustomTitle title="Departments" />
        <Grid className="service-wrapper">
          {map(serviceData, (item) => (
            <ServiceCard
              onClick={() => navigate(`/citizen/services/${item?.id}`)}
              data={item}
            />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
