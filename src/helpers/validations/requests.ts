import * as Yup from "yup";

export const RequestValidation = () => {
  return Yup.object().shape({
    reviewed_by: Yup.number().required("The input is required"),
  });
};
export const RequestDataValidation = (values: TAny[] = []) => {
  const shape: Record<string, TAny> = {};

  values.forEach((field) => {
    if (field.type === "text" || field.type === "textarea") {
      shape[field.name] = field.required
        ? Yup.string().required(`The input is required`)
        : Yup.string();
    }

    if (field.type === "date") {
      shape[field.name] = field.required
        ? Yup.date().required(`The input is required`)
        : Yup.date().nullable();
    }

    if (field.type === "file") {
      shape[field.name] = field.required
        ? Yup.mixed().required(`The input is required`)
        : Yup.mixed();
    }
  });

  return Yup.object().shape(shape);
};
