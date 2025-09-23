import { Grid } from "@mui/material";
import { serviceSectionSX } from "../../helpers/styles/sections";
import { ServiceCard } from "../common/citizen/ServiceCard";
import type { FC } from "react";
import type { ServiceDataApi } from "../../services/configs/apiEndPoint";
import { map } from "lodash";
import { CustomTitle } from "../common/citizen/CustomTitle";
import { useNavigate } from "react-router-dom";

export const ServiceSection: FC<{ data: ServiceDataApi[] }> = ({ data }) => {
  const navigate = useNavigate();
  return (
    <Grid sx={serviceSectionSX}>
      <CustomTitle title="Services" />
      <Grid className="serivces-wrapper">
        {data &&
          map(data, (item) => (
            <ServiceCard
              onClick={() => navigate(`/citizen/services/${item?.id}`)}
              data={item}
            />
          ))}
      </Grid>
    </Grid>
  );
};
