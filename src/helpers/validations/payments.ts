import { number, object } from "yup";

export const PaymentValidation = () => {
  return object().shape({
    request_id: number().required("the input is required"),
  });
};
