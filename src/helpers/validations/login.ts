import { object, string } from "yup";

export const LoginValidation = () => {
  return object().shape({
    identifier: string().trim().required("the input is required"),
    password: string().trim().required("the input is required"),
  });
};

export const RegisterValidation = () => {
  return object().shape({
    first_name: string().trim().required("The input is required"),
    last_name: string().trim().required("The input is required"),
    password: string()
      .trim()
      .min(6, "Input value is short")
      .required("The input is required"),
    email: string()
      .email("Input value is not valid")
      .trim()
      .required("The input is required"),
  });
};
