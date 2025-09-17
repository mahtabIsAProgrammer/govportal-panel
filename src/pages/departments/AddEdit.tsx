import { type FC } from "react";

import {
  tryCatchHandler,
  localNavigateHandler,
} from "../../helpers/utils/handlers";
import { useCreateDepartment } from "../../services/hooks/departments";
import type { DepartmentDataApi } from "../../services/configs/apiEndPoint";
import { AddEditProvider } from "../../components/advances/AddEditProvider";
import { DepartmentValidation } from "../../helpers/validations/departments";

interface IAddEdit {
  isEdit?: boolean;
}

const AddEdit: FC<IAddEdit> = ({ isEdit }) => {
  const { mutateAsync: createDepartment, isLoading: loadingCreate } =
    useCreateDepartment();

  const initialValues: DepartmentDataApi = {
    name: "",
    description: "",
  };
  return (
    <AddEditProvider
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "departments", link: "/dashboard/departments", type: "list" },
        {
          name: `${isEdit ? "edit" : "Add"} department`,
          link: "",
          type: "add",
        },
      ]}
      isLoading={loadingCreate}
      setting={{
        isEdit: isEdit ?? false,
      }}
      texts={{
        title: `${isEdit ? "edit" : "Add"} department`,
      }}
      options={{
        content: {
          normalContent: {
            inputs: [
              {
                type: "input",
                name: "name",
                props: {
                  input: {
                    placeholder: "first Name",
                    customLabel: "first Name",
                    disabled: true,
                  },
                },
              },
              {
                type: "input",
                name: "description",
                props: {
                  input: {
                    placeholder: "last Name",
                    customLabel: "last Name",
                    disabled: true,
                  },
                },
              },
            ],
            columnGridSize: 3.9,
          },
        },
      }}
      forms={{
        initialValues,
        onSubmit: async ({ name, description }) => {
          tryCatchHandler({
            handler: async () => {
              const finalValues = {
                name: name || "",
                description: description || "",
              };
              const data = (await createDepartment(
                finalValues
              )) as unknown as IMutateAsyncResponseGuid;

              localNavigateHandler("/dashboard/departments");
              return data;
            },
          });
        },
        loading: false,
        onCancel: () => localNavigateHandler("/dashboard/departments"),
        validationFunctions: () => DepartmentValidation(),
      }}
    />
  );
};

export default AddEdit;
