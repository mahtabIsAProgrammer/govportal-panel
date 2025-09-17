import { type FC } from "react";

import {
  tryCatchHandler,
  localNavigateHandler,
} from "../../helpers/utils/handlers";
import { useCreateRequest } from "../../services/hooks/requests";
import { RequestValidation } from "../../helpers/validations/requests";
import type { RequestDataApi } from "../../services/configs/apiEndPoint";
import { AddEditProvider } from "../../components/advances/AddEditProvider";

interface IAddEdit {
  isEdit?: boolean;
}

const AddEdit: FC<IAddEdit> = ({ isEdit }) => {
  const { mutateAsync: createRequest, isLoading: loadingCreate } =
    useCreateRequest();

  const initialValues: RequestDataApi = {
    reviewed_by: "",
    status: "",
    citizen_id: "",
    service_id: 0,
  };
  return (
    <AddEditProvider
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "requests", link: "/dashboard/requests", type: "list" },
        { name: `${isEdit ? "edit" : "Add"} request`, link: "", type: "add" },
      ]}
      isLoading={loadingCreate}
      setting={{
        isEdit: isEdit ?? false,
      }}
      texts={{
        title: `${isEdit ? "edit" : "Add"} request`,
      }}
      options={{
        content: {
          normalContent: {
            inputs: [
              {
                type: "input",
                name: "reviewed_by",
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
                name: "status",
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
                name: "citizen_id",
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
                name: "service_id",
                props: {
                  input: {
                    placeholder: "requestname",
                    customLabel: "requestname",
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
        onSubmit: async ({ reviewed_by, status, citizen_id, service_id }) => {
          tryCatchHandler({
            handler: async () => {
              const finalValues = {
                reviewed_by: reviewed_by || "",
                status: status || "",
                citizen_id: citizen_id || "",
                service_id: service_id || "",
              };
              const data = (await createRequest(
                finalValues
              )) as unknown as IMutateAsyncResponseGuid;

              localNavigateHandler("/dashboard/requests");
              return data;
            },
          });
        },
        loading: false,
        onCancel: () => localNavigateHandler("/dashboard/requests"),
        validationFunctions: () => RequestValidation(),
      }}
    />
  );
};

export default AddEdit;
