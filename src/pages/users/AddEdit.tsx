import { type FC } from "react";

import {
  tryCatchHandler,
  localNavigateHandler,
} from "../../helpers/utils/handlers";
import { useCreateUser } from "../../services/hooks/users";
import { UserValidation } from "../../helpers/validations/users";
import type { UserDataApi } from "../../services/configs/apiEndPoint";
import { AddEditProvider } from "../../components/advances/AddEditProvider";

interface IAddEdit {
  isEdit?: boolean;
}

const AddEdit: FC<IAddEdit> = ({ isEdit }) => {
  const { mutateAsync: createUser, isLoading: loadingCreate } = useCreateUser();

  const initialValues: UserDataApi = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    date_of_birth: "",
    department_id: 0,
    national_id: "",
    phone_number: "",
    profile_image: "",
    role: "",
    username: "",
  };
  return (
    <AddEditProvider
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "users", link: "/dashboard/users", type: "list" },
        { name: `${isEdit ? "edit" : "Add"} user`, link: "", type: "add" },
      ]}
      isLoading={loadingCreate}
      setting={{
        isEdit: isEdit ?? false,
      }}
      texts={{
        title: `${isEdit ? "edit" : "Add"} user`,
      }}
      options={{
        content: {
          normalContent: {
            inputs: [
              {
                type: "input",
                name: "first_name",
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
                name: "last_name",
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
                name: "email",
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
                name: "username",
                props: {
                  input: {
                    placeholder: "username",
                    customLabel: "username",
                    disabled: true,
                  },
                },
              },
              {
                type: "input",
                name: "email",
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
                name: "email",
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
                name: "password",
                props: {
                  input: {
                    placeholder: "password",
                    customLabel: "password",
                    disabled: true,
                  },
                },
              },
              // {
              //   type: "datePicker",
              //   name: "date_of_birth",
              //   props: {
              //     input: {
              //       placeholder: "date of birth",
              //       customLabel: "date of birth",
              //       disabled: true,
              //     },
              //   },
              // },
              {
                type: "input",
                name: "department_id",
                props: {
                  input: {
                    placeholder: "department",
                    customLabel: "department",
                    disabled: true,
                  },
                },
              },
              {
                type: "input",
                name: "national_id",
                props: {
                  input: {
                    placeholder: "national id",
                    customLabel: "national id",
                    disabled: true,
                  },
                },
              },
              {
                type: "input",
                name: "phone_number",
                props: {
                  input: {
                    placeholder: "phone number",
                    customLabel: "phone number",
                    disabled: true,
                  },
                },
              },
            ],
            columnGridSize: 3.9,
            // side: {
            //   profileUploader: {
            //     name: "profile_image",
            //     thumbName: "profile-image",
            //     props: { customLabel: "profile" },
            //   },
            // },
          },
        },
      }}
      forms={{
        initialValues,
        onSubmit: async ({
          first_name,
          last_name,
          email,
          password,
          date_of_birth,
          department_id,
          national_id,
          phone_number,
          profile_image,
          role,
          username,
        }) => {
          tryCatchHandler({
            handler: async () => {
              const finalValues = {
                first_name: first_name || "",
                last_name: last_name || "",
                email: email || "",
                password: password || "",
                date_of_birth: date_of_birth || "",
                department_id: department_id || 0,
                national_id: national_id || "",
                phone_number: phone_number || "",
                profile_image: profile_image || "",
                role: role || "",
                username: username || "",
              };
              const data = (await createUser(
                finalValues
              )) as unknown as IMutateAsyncResponseGuid;

              localNavigateHandler("/dashboard/users");
              return data;
            },
          });
        },
        loading: false,
        onCancel: () => localNavigateHandler("/dashboard/users"),
        validationFunctions: () => UserValidation(),
      }}
    />
  );
};

export default AddEdit;
