import { useMemo, type FC } from "react";

import type {
  UserDataApi,
  NotificationDataApi,
} from "../../services/configs/apiEndPoint";
import { useUserData } from "../../services/hooks/users";
import { optionCreator } from "../../helpers/utils/others";
import { tryCatchHandler } from "../../helpers/utils/handlers";
import { FromModalProvider } from "../../components/advances/FormModal";
import { useCreateNotification } from "../../services/hooks/notifications";
import { NotificationValidation } from "../../helpers/validations/notifications";
import { type TFullInputsAddEdit } from "../../components/advances/AddEditProvider";

interface INotificationSetting {
  userId?: string;
  insertToggleModal: boolean;
  setInsertToggleModal: (value: boolean) => void;
}

export const NotificationSetting: FC<INotificationSetting> = ({
  insertToggleModal,
  setInsertToggleModal,
  userId,
}) => {
  const { mutateAsync: createNotification, isLoading: loadingCreate } =
    useCreateNotification();

  const { data: userData } = useUserData();
  const userSearchData = useMemo(
    () => (userData as { data: UserDataApi[] })?.data ?? [],
    [userData]
  );

  return (
    <>
      <FromModalProvider
        columnGridSize={12}
        open={insertToggleModal}
        onClose={() => setInsertToggleModal(false)}
        texts={{
          title: userId ? "Send Notification" : "Add Notification",
        }}
        forms={{
          initialValues: {
            message: "",
            title: "",
            user_id: userId ? userId : "",
          },
          onSubmit: async (
            { message, title, user_id, is_read },
            { resetForm }
          ) => {
            tryCatchHandler({
              handler: async () => {
                const finalValues: NotificationDataApi = {
                  message: message || "",
                  title: title || "",
                  user_id: user_id || "",
                  is_read: is_read || false,
                };

                const data = await createNotification(finalValues);

                resetForm();
                setInsertToggleModal(false);
                return data;
              },
            });
          },
          loading: loadingCreate,
          validationFunctions: NotificationValidation,
        }}
        inputs={[
          {
            name: "title",
            type: "input",
            props: {
              input: {
                customLabel: "title",
                placeholder: "title",
                required: true,
              },
            },
          },
          ...((userId
            ? []
            : [
                {
                  name: "user_id",
                  type: "autocomplete",
                  props: {
                    autocomplete: {
                      extraLabel: "user",
                      placeholder: "user",
                      options: optionCreator({
                        id: "id",
                        hasNotEmpty: true,
                        data: userSearchData,
                        name: ["first_name", "last_name"],
                      }),
                      required: true,
                    },
                  },
                },
              ]) as unknown as TFullInputsAddEdit[]),
          {
            type: "input",
            name: "message",
            isFullWidth: true,
            props: {
              input: {
                required: true,
                isTextarea: true,
                placeholder: "Message",
                customLabel: "Message",
              },
            },
          },
        ]}
      />
    </>
  );
};
