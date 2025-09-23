import { useMemo } from "react";

import type {
  ServiceDataApi,
  DepartmentDataApi,
} from "../../services/configs/apiEndPoint";
import { useServiceData } from "../../services/hooks/services";
import { HomeSection } from "../../components/sections/HomeSection";
import { useDepartmentData } from "../../services/hooks/departments";
import { ServiceSection } from "../../components/sections/ServiceSection";
import { DepartmentSection } from "../../components/sections/DepartmentSection";

export const Landing = () => {
  const { data: serviceData } = useServiceData();
  const serviceSearchData = useMemo(
    () => (serviceData as { data: ServiceDataApi[] })?.data ?? [],
    [serviceData]
  );

  const { data: departmentData } = useDepartmentData();
  const departmentSearchData = useMemo(
    () => (departmentData as { data: DepartmentDataApi[] })?.data ?? [],
    [departmentData]
  );

  return (
    <>
      <HomeSection />
      <ServiceSection data={serviceSearchData} />
      <DepartmentSection data={departmentSearchData} />
    </>
  );
};
