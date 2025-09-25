import { number, object, string } from "yup";

export const ServiceValidation = () => {
  return object().shape({
    name: string().trim().required("the input is required"),
    fee: number()
      .typeError("Input value is not valid")
      .required("the input is required"),
    department_id: number()
      .typeError("Input value is not valid")
      .required("the input is required"),
    // form_schema: object().required("the input is required"),
  });
};
