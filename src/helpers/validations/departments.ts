import { object, string } from "yup";

export const DepartmentValidation = () => {
  return object().shape({
    name: string().trim().required("the input is required"),
  });
};
