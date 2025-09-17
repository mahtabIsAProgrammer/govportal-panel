import { object, string } from "yup";

export const NotificationValidation = () => {
  return object().shape({
    is_read: string().trim().required("the input is required"),
  });
};
