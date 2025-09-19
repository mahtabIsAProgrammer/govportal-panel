import { useMemo, type FC } from "react";
import { useParams } from "react-router-dom";

import {
  tryCatchHandler,
  localNavigateHandler,
} from "../../helpers/utils/handlers";
import {
  useCreateService,
  useUpdateService,
  useGetServiceById,
} from "../../services/hooks/services";
import type {
  ServiceDataApi,
  DepartmentDataApi,
} from "../../services/configs/apiEndPoint";
import { optionCreator } from "../../helpers/utils/others";
import { useDepartmentData } from "../../services/hooks/departments";
import { ServiceValidation } from "../../helpers/validations/services";
import { AddEditProvider } from "../../components/advances/AddEditProvider";

interface IAddEdit {
  isEdit?: boolean;
}

const AddEdit: FC<IAddEdit> = ({ isEdit }) => {
  const { id } = useParams();

  const { mutateAsync: createService, isLoading: loadingCreate } =
    useCreateService();

  const { mutateAsync: serviceUpdate, isLoading: isLoadingServiceUpdate } =
    useUpdateService(id ?? "");

  const { data: serviceGet, isLoading: isLoadingPage } = useGetServiceById(
    id ?? ""
  );
  const { department_id, description, fee, form_schema, name } =
    (serviceGet as { data: ServiceDataApi } | undefined)?.data ?? {};

  const { data: departmentData } = useDepartmentData();
  const departmentSearchData = useMemo(
    () => (departmentData as { data: DepartmentDataApi[] })?.data ?? [],
    [departmentData]
  );

  const initialValues: ServiceDataApi = {
    name: name || "",
    fee: fee || null,
    description: description || "",
    form_schema: form_schema || null,
    department_id: department_id || null,
  };
  return (
    <AddEditProvider
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "services", link: "/dashboard/services", type: "list" },
        { name: `${isEdit ? "edit" : "Add"} service`, link: "", type: "add" },
      ]}
      isLoading={(isEdit && isLoadingPage) || false}
      setting={{
        isEdit: isEdit ?? false,
      }}
      texts={{
        title: `${isEdit ? "edit" : "Add"} service`,
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
                    required: true,
                    placeholder: "Name",
                    customLabel: "Name",
                  },
                },
              },

              {
                type: "input",
                name: "fee",
                props: {
                  input: {
                    type: "number",
                    placeholder: "Fee",
                    customLabel: "Fee",
                  },
                },
              },
              {
                type: "autocomplete",
                name: "department_id",
                props: {
                  autocomplete: {
                    customLabel: "department",
                    options: optionCreator({
                      id: "id",
                      name: "name",
                      data: departmentSearchData,
                    }),
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
                    placeholder: "Description",
                    customLabel: "Description",
                  },
                },
              },
              {
                type: "input",
                name: "form_schema",
                props: {
                  input: {
                    required: true,
                    placeholder: "Form",
                    customLabel: "Form",
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
        onSubmit: async ({
          fee,
          name,
          description,
          form_schema,
          department_id,
        }) => {
          tryCatchHandler({
            handler: async () => {
              const finalValues = {
                fee: fee || null,
                name: name || "",
                description: description || "",
                form_schema: form_schema || "{}",
                department_id: department_id || null,
              };

              let data: object;

              if (isEdit) data = await serviceUpdate(finalValues);
              else data = await createService(finalValues);

              localNavigateHandler("/dashboard/services");
              return data;
            },
          });
        },
        loading: isLoadingServiceUpdate || loadingCreate,
        onCancel: () => localNavigateHandler("/services"),
        validationFunctions: () => ServiceValidation(),
      }}
    />
  );
};

export default AddEdit;
