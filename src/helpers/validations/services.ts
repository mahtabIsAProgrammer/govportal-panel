import { number, object, string } from "yup";

export const ServiceValidation = () => {
  return object().shape({
    name: string().trim().required("the input is required"),
    fee: number().typeError("Input value is not valid"),
    // form_schema: object().required("the input is required"),
  });
};
