import { map } from "lodash";
import { Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { PAGE_SIZE } from "../../helpers/constants/statics";
import { useServiceData } from "../../services/hooks/services";
import type { ServiceDataApi } from "../../services/configs/apiEndPoint";
import { ServiceCard } from "../../components/common/citizen/ServiceCard";
import { CustomTitle } from "../../components/common/citizen/CustomTitle";
import { departmentCitizenPageSX } from "../../helpers/styles/pages/citizenPages";

const DepartmentCitizenPage = () => {
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
        <CustomTitle
          title="Departments"
          description="Our diverse departments are dedicated to delivering a wide range of specialized services tailored to meet your needs. Each department is staffed with experts committed to excellence and innovation. Explore our offerings to find the perfect solution for your requirements."
        />
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

export default DepartmentCitizenPage;
