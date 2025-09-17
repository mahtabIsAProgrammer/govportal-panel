import { number, object } from "yup";

export const RequestValidation = () => {
  return object().shape({
    reviewed_by: number().required("the input is required"),
  });
};
