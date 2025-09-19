import { object, string } from "yup";

export const NotificationValidation = () => {
  return object().shape({
    user_id: string().trim().required("the input is required"),
    message: string().trim().required("the input is required"),
  });
};
