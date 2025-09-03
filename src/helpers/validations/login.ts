import { object, string } from "yup";

export const LoginValidation = () => {
  return object().shape({
    identifier: string().trim().required("the input is required"),
    password: string().trim().required("the input is required"),
  });
};
