import { type FC } from "react";

import {
  tryCatchHandler,
  localNavigateHandler,
} from "../../helpers/utils/handlers";
import { useCreateService } from "../../services/hooks/services";
import { ServiceValidation } from "../../helpers/validations/services";
import type { ServiceDataApi } from "../../services/configs/apiEndPoint";
import { AddEditProvider } from "../../components/advances/AddEditProvider";

interface IAddEdit {
  isEdit?: boolean;
}

const AddEdit: FC<IAddEdit> = ({ isEdit }) => {
  const { mutateAsync: createService, isLoading: loadingCreate } =
    useCreateService();

  const initialValues: ServiceDataApi = {
    description: "",
    department_id: 0,
    fee: 0,
    form_schema: JSON,
    name: "",
  };
  return (
    <AddEditProvider
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "services", link: "/dashboard/services", type: "list" },
        { name: `${isEdit ? "edit" : "Add"} service`, link: "", type: "add" },
      ]}
      isLoading={loadingCreate}
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
              {
                type: "input",
                name: "fee",
                props: {
                  input: {
                    placeholder: "Email",
                    customLabel: "Email",
                    disabled: true,
                  },
                },
              },
              {
                type: "input",
                name: "department_id",
                props: {
                  input: {
                    placeholder: "servicename",
                    customLabel: "servicename",
                    disabled: true,
                  },
                },
              },
              {
                type: "input",
                name: "form_schema",
                props: {
                  input: {
                    placeholder: "Email",
                    customLabel: "Email",
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
        onSubmit: async ({
          description,
          department_id,
          fee,
          form_schema,
          name,
        }) => {
          tryCatchHandler({
            handler: async () => {
              const finalValues = {
                description: description || "",
                department_id: department_id || "",
                fee: fee || "",
                form_schema: form_schema || "",
                name: name || "",
              };
              const data = (await createService(
                finalValues
              )) as unknown as IMutateAsyncResponseGuid;

              localNavigateHandler("/dashboard/services");
              return data;
            },
          });
        },
        loading: false,
        onCancel: () => localNavigateHandler("/services"),
        validationFunctions: () => ServiceValidation(),
      }}
    />
  );
};

export default AddEdit;
