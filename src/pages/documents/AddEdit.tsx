import { type FC } from "react";

import {
  tryCatchHandler,
  localNavigateHandler,
} from "../../helpers/utils/handlers";
import { useCreateDocument } from "../../services/hooks/documents";
import { DocumentValidation } from "../../helpers/validations/documents";
import type { DocumentDataApi } from "../../services/configs/apiEndPoint";
import { AddEditProvider } from "../../components/advances/AddEditProvider";

interface IAddEdit {
  isEdit?: boolean;
}

const AddEdit: FC<IAddEdit> = ({ isEdit }) => {
  const { mutateAsync: createDocument, isLoading: loadingCreate } =
    useCreateDocument();

  const initialValues: DocumentDataApi = {
    file_path: "",
    file_type: "",
    request_id: 0,
  };
  return (
    <AddEditProvider
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "documents", link: "/dashboard/documents", type: "list" },
        {
          name: `${isEdit ? "edit" : "Add"} document`,
          link: "",
          type: "add",
        },
      ]}
      isLoading={loadingCreate}
      setting={{
        isEdit: isEdit ?? false,
      }}
      texts={{
        title: `${isEdit ? "edit" : "Add"} document`,
      }}
      options={{
        content: {
          normalContent: {
            inputs: [
              {
                type: "input",
                name: "file_path",
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
                name: "file_type",
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
                name: "request_id",
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
        onSubmit: async ({ file_path, file_type, request_id }) => {
          tryCatchHandler({
            handler: async () => {
              const finalValues = {
                file_path: file_path || "",
                file_type: file_type || "",
                request_id: request_id || "",
              };
              const data = (await createDocument(
                finalValues
              )) as unknown as IMutateAsyncResponseGuid;

              localNavigateHandler("/dashboard/documents");
              return data;
            },
          });
        },
        loading: false,
        onCancel: () => localNavigateHandler("/dashboard/documents"),
        validationFunctions: () => DocumentValidation(),
      }}
    />
  );
};

export default AddEdit;
