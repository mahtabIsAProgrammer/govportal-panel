import type { FC } from "react";
import { map, slice } from "lodash";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { CustomTitle } from "../common/citizen/CustomTitle";
import { ServiceCard } from "../common/citizen/ServiceCard";
import { serviceSectionSX } from "../../helpers/styles/sections";
import type { ServiceDataApi } from "../../services/configs/apiEndPoint";

export const ServiceSection: FC<{ data: ServiceDataApi[] }> = ({ data }) => {
  const navigate = useNavigate();

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Grid sx={serviceSectionSX}>
      <div id={"services"}></div>
      <Grid className="service-container">
        <CustomTitle
          title="Our Services"
          description="
We provide a comprehensive suite of    services designed      to empower citizens and enhance community engagement. From essential administrative functions to informative resources, our services aim to facilitate seamless interactions with government processes. "
        />
        <Grid className="serivces-wrapper">
          {data &&
            map(slice(data, 0, isMobile ? 3 : isMd ? 6 : 8), (item) => (
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
