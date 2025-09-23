import { type FC } from "react";
import { useParams } from "react-router-dom";

import {
  tryCatchHandler,
  localNavigateHandler,
} from "../../helpers/utils/handlers";
import {
  useCreateDepartment,
  useUpdateDepartment,
  useGetDepartmentById,
} from "../../services/hooks/departments";
import type { DepartmentDataApi } from "../../services/configs/apiEndPoint";
import { AddEditProvider } from "../../components/advances/AddEditProvider";
import { DepartmentValidation } from "../../helpers/validations/departments";

interface IAddEdit {
  isEdit?: boolean;
}

const AddEdit: FC<IAddEdit> = ({ isEdit }) => {
  const { id } = useParams();

  const { mutateAsync: createDepartment, isLoading: loadingCreate } =
    useCreateDepartment();

  const {
    mutateAsync: departmentUpdate,
    isLoading: isLoadingDepartmentUpdate,
  } = useUpdateDepartment(id ? +id : 0);

  const { data: departmentGet, isLoading: isLoadingPage } =
    useGetDepartmentById(id ? +id : 0);
  const { description, name } =
    (departmentGet as { data: DepartmentDataApi } | undefined)?.data ?? {};

  const initialValues: DepartmentDataApi = {
    name: name || "",
    description: description || "",
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
      isLoading={(isEdit && isLoadingPage) || false}
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
                    placeholder: "Name",
                    customLabel: "Name",
                    required: true,
                  },
                },
              },
              {
                type: "input",
                name: "description",
                isFullWidth: true,
                props: {
                  input: {
                    isTextarea: true,
                    placeholder: "description",
                    customLabel: "description",
                  },
                },
              },
            ],
            columnGridSize: 5.9,
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

              let data: object;

              if (isEdit) data = await departmentUpdate(finalValues);
              else data = await createDepartment(finalValues);

              localNavigateHandler("/dashboard/departments");
              return data;
            },
          });
        },
        loading: isLoadingDepartmentUpdate || loadingCreate,
        onCancel: () => localNavigateHandler("/dashboard/departments"),
        validationFunctions: () => DepartmentValidation(),
      }}
    />
  );
};

export default AddEdit;
