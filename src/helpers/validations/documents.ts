import { number, object } from "yup";

export const DocumentValidation = () => {
  return object().shape({
    request_id: number().required("the input is required"),
  });
};
