import { type FC } from "react";
import {
  tryCatchHandler,
  localNavigateHandler,
} from "../../helpers/utils/handlers";
import { useCreateNotification } from "../../services/hooks/notifications";
import { AddEditProvider } from "../../components/advances/AddEditProvider";
import type { NotificationDataApi } from "../../services/configs/apiEndPoint";
import { NotificationValidation } from "../../helpers/validations/notifications";

interface IAddEdit {
  isEdit?: boolean;
}

const AddEdit: FC<IAddEdit> = ({ isEdit }) => {
  const { mutateAsync: createNotification, isLoading: loadingCreate } =
    useCreateNotification();

  const initialValues: NotificationDataApi = {
    is_read: false,
    message: "",
    user_id: "",
  };
  return (
    <AddEditProvider
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        {
          name: "notifications",
          link: "/dashboard/notifications",
          type: "list",
        },
        {
          name: `${isEdit ? "edit" : "Add"} notification`,
          link: "",
          type: "add",
        },
      ]}
      isLoading={loadingCreate}
      setting={{
        isEdit: isEdit ?? false,
      }}
      texts={{
        title: `${isEdit ? "edit" : "Add"} notification`,
      }}
      options={{
        content: {
          normalContent: {
            inputs: [
              {
                type: "input",
                name: "is_read",
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
                name: "message",
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
                name: "user_id",
                props: {
                  input: {
                    placeholder: "notificationname",
                    customLabel: "notificationname",
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
        onSubmit: async ({ is_read, message, user_id }) => {
          tryCatchHandler({
            handler: async () => {
              const finalValues = {
                is_read: is_read || "",
                message: message || "",
                user_id: user_id || "",
              };
              const data = (await createNotification(
                finalValues
              )) as unknown as IMutateAsyncResponseGuid;

              localNavigateHandler("/dashboard/notifications");
              return data;
            },
          });
        },
        loading: false,
        onCancel: () => localNavigateHandler("/dashboard/notifications"),
        validationFunctions: () => NotificationValidation(),
      }}
    />
  );
};

export default AddEdit;
