import { Grid } from "@mui/material";
import { useContext, type FC } from "react";
import { useNavigate } from "react-router-dom";

import {
  tryCatchHandler,
  localNavigateHandler,
} from "../../helpers/utils/handlers";
import { MainContext } from "../../helpers/others/mainContext";
import { useChangePassword } from "../../services/hooks/ProfileInfo";
import { ChangePasswordValidation } from "../../helpers/validations/users";
import { AddEditProvider } from "../../components/advances/AddEditProvider";

const ChangePassword: FC<{ isCitizen?: boolean }> = ({ isCitizen }) => {
  const { globalProfileInformation: id } = useContext(MainContext);
  const navigate = useNavigate();
  const { mutateAsync: changePassword, isLoading } = useChangePassword();
  return (
    <Grid
      sx={
        isCitizen
          ? {
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }
          : {
              "& .content-page .inputs-box": {
                minHeight: "250px",
                display: "flex",
                alignItems: "center",
              },
            }
      }
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
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                isCitizen
                  ? navigate("/citizen/me")
                  : localNavigateHandler("/dashboard/me");
                return data;
              },
            });
          },
          loading: isLoading,
          onCancel: () =>
            isCitizen
              ? navigate("/citizen/me")
              : localNavigateHandler(`/dashboard/me/${id}`),
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

export default ChangePassword;
