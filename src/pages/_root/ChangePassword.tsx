import { Grid } from "@mui/material";
import { AddEditProvider } from "../../components/advances/AddEditProvider";
import {
  localNavigateHandler,
  tryCatchHandler,
} from "../../helpers/utils/handlers";
import { ChangePasswordValidation } from "../../helpers/validations/users";
import { useChangePassword } from "../../services/hooks/ProfileInfo";
import { useContext } from "react";
import { MainContext } from "../../helpers/others/mainContext";

export const ChangePassword = () => {
  const { globalProfileInformation: id } = useContext(MainContext);
  const { mutateAsync: changePassword, isLoading } = useChangePassword();
  return (
    <Grid
      sx={{
        "& .content-page .inputs-box": {
          minHeight: "250px",
          display: "flex",
          alignItems: "center",
        },
      }}
    >
      <AddEditProvider
        breadcrumbs={[
          { name: "dashboard", link: "/", type: "none" },
          { name: "change password", link: "", type: "list" },
        ]}
        isLoading={false}
        setting={{
          isEdit: false,
        }}
        texts={{
          title: "Change password",
        }}
        forms={{
          initialValues: { oldPassword: "", newPassword: "" },
          onSubmit: async (values) => {
            tryCatchHandler({
              handler: async () => {
                const finalValues = values;
                const data = await changePassword(finalValues);

                localNavigateHandler("/dashboard");
                return data;
              },
            });
          },
          loading: isLoading,
          onCancel: () => localNavigateHandler(`/dashboard/me/${id}`),
          validationFunctions: () => ChangePasswordValidation,
        }}
        options={{
          content: {
            normalContent: {
              inputs: [
                {
                  type: "input",
                  name: "oldPassword",
                  props: {
                    input: {
                      required: true,
                      type: "password",
                      placeholder: "Old password",
                      customLabel: "Old password",
                    },
                  },
                },
                {
                  type: "input",
                  name: "newPassword",
                  props: {
                    input: {
                      required: true,
                      type: "password",
                      placeholder: "new password",
                      customLabel: "new password",
                    },
                  },
                },
              ],
              columnGridSize: 5.9,
            },
          },
        }}
      />
    </Grid>
  );
};
