import { object, string } from "yup";

export const UserValidation = () => {
  return object().shape({
    first_name: string().trim().required("the input is required"),
    last_name: string().trim().required("the input is required"),
  });
};
