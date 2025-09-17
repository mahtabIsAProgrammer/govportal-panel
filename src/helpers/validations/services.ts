import { object, string } from "yup";

export const ServiceValidation = () => {
  return object().shape({
    name: string().trim().required("the input is required"),
  });
};
