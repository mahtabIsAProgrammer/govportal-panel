import { date, object, string } from "yup";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const UserValidation = (isEdit: boolean | undefined) => {
  return object().shape({
    first_name: string().trim().required("The input is required"),
    last_name: string().trim().required("The input is required"),
    username: string().trim().required("The input is required"),
    role: string().trim().required("The input is required"),
    email: string()
      .email("Input value is not valid")
      .trim()
      .required("The input is required"),
    date_of_birth: date()
      .nullable()
      .max(today, "Date of birth cannot be later than today")
      .typeError("Input value is not valid"),
    ...(!isEdit
      ? {
          password: string()
            .trim()
            .min(6, "Input value is short")
            .required("The input is required"),
        }
      : {}),
  });
};
