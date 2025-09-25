import { useContext, useMemo, type FC } from "react";
import { useParams } from "react-router-dom";

import {
  useCreateUser,
  useUpdateUser,
  useGetUserById,
} from "../../services/hooks/users";
import {
  tryCatchHandler,
  localNavigateHandler,
} from "../../helpers/utils/handlers";
import type {
  UserDataApi,
  DepartmentDataApi,
} from "../../services/configs/apiEndPoint";
import { optionCreator } from "../../helpers/utils/others";
import { checkFalsyValue } from "../../helpers/utils/values";
import { MainContext } from "../../helpers/others/mainContext";
import { UserValidation } from "../../helpers/validations/users";
import { useDepartmentData } from "../../services/hooks/departments";
import { AddEditProvider } from "../../components/advances/AddEditProvider";
import { GENDER_TYPES_DATA, ROLE_TYPES_DATA } from "../../helpers/utils/types";

interface IAddEdit {
  isEdit?: boolean;
}

const AddEdit: FC<IAddEdit> = ({ isEdit }) => {
  const { id } = useParams();

  const {
    globalProfileInformation: { role: currentRole },
  } = useContext(MainContext);
  const { mutateAsync: createUser, isLoading: loadingCreate } = useCreateUser();

  const { mutateAsync: userUpdate, isLoading: isLoadingUserUpdate } =
    useUpdateUser(id ?? "");

  const { data: userGet, isLoading: isLoadingPage } = useGetUserById(id ?? "");
  const {
    username,
    date_of_birth,
    department_id,
    email,
    first_name,
    last_name,
    national_id,
    password,
    phone_number,
    image,
    gender,
    role,
  } = (userGet as { data: UserDataApi } | undefined)?.data ?? {};

  const initialValues: UserDataApi = {
    first_name: first_name || "",
    last_name: last_name || "",
    email: email || "",
    password: password || "",
    date_of_birth: date_of_birth || "",
    department_id: department_id || null,
    national_id: national_id || "",
    phone_number: phone_number || "",
    image: image || "",
    gender: gender || null,
    role: role || "",
    username: username || "",
  };

  const filterRoleByRole =
    currentRole === "department_head"
      ? [ROLE_TYPES_DATA[1]]
      : currentRole === "officer"
      ? [ROLE_TYPES_DATA[3]]
      : ROLE_TYPES_DATA;

  const { data: departmentData } = useDepartmentData();
  const departmentSearchData = useMemo(
    () => (departmentData as { data: DepartmentDataApi[] })?.data ?? [],
    [departmentData]
  );

  return (
    <AddEditProvider
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "users", link: "/dashboard/users", type: "list" },
        { name: `${isEdit ? "edit" : "Add"} user`, link: "", type: "add" },
      ]}
      isLoading={(isEdit && isLoadingPage) || false}
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
                    required: true,
                  },
                },
              },
              {
                type: "input",
                name: "last_name",
                props: {
                  input: {
                    required: true,
                    placeholder: "last Name",
                    customLabel: "last Name",
                  },
                },
              },
              {
                type: "input",
                name: "username",
                props: {
                  input: {
                    required: true,
                    placeholder: "username",
                    customLabel: "username",
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
                  },
                },
              },
              {
                type: "input",
                name: "email",
                props: {
                  input: {
                    required: true,
                    placeholder: "Email",
                    customLabel: "Email",
                  },
                },
              },
              {
                type: "input",
                name: "password",
                props: {
                  input: {
                    required: true,
                    type: "password",
                    placeholder: "password",
                    customLabel: "password",
                    disabled: isEdit ? true : false,
                  },
                },
              },
              {
                type: "select",
                name: "role",
                props: {
                  select: {
                    required: true,
                    customLabel: "Role",
                    items: optionCreator({
                      id: "name",
                      name: "name",
                      data: filterRoleByRole,
                      hasNotEmpty: false,
                    }),
                  },
                },
                InputsChildren: ({ value }) => {
                  return value == ROLE_TYPES_DATA?.[1]?.name
                    ? [
                        {
                          type: "autocomplete",
                          name: "department_id",
                          props: {
                            autocomplete: {
                              options: optionCreator({
                                id: "id",
                                name: "name",
                                data: departmentSearchData,
                                hasNotEmpty: true,
                              }),
                              customLabel: "department",
                            },
                          },
                        },
                      ]
                    : [
                        {
                          name: "",
                          type: "emptyInput",
                        },
                      ];
                },
              },

              {
                type: "select",
                name: "gender",
                props: {
                  select: {
                    items: optionCreator({
                      id: "id",
                      name: "name",
                      data: GENDER_TYPES_DATA,
                      hasNotEmpty: true,
                    }),
                    customLabel: "Gender",
                  },
                },
              },
              {
                type: "input",
                name: "national_id",
                props: {
                  input: {
                    placeholder: "National Id",
                    customLabel: "National Id",
                  },
                },
              },
              {
                type: "datePicker",
                name: "date_of_birth",
                props: {
                  datePicker: {
                    customLabel: "date of birth",
                  },
                },
              },
            ],
            columnGridSize: 5.9,
            side: {
              profileUploader: {
                name: "image",
                thumbName: "image",
                props: { customLabel: "profile" },
              },
            },
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
          image,
          role,
          username,
          gender,
        }) => {
          tryCatchHandler({
            handler: async () => {
              const finalValues = {
                first_name: first_name || "",
                last_name: last_name || "",
                email: email || "",
                password: password || "",
                date_of_birth: date_of_birth || "",
                department_id: department_id || null,
                national_id: national_id || "",
                phone_number: phone_number || "",
                image: image || "",
                role: role || "",
                gender: checkFalsyValue(gender) ? +gender : null,
                username: username || "",
              };

              let data: object;

              if (isEdit) data = await userUpdate(finalValues);
              else data = await createUser(finalValues);

              localNavigateHandler("/dashboard/users");
              return data;
            },
          });
        },
        loading: loadingCreate || isLoadingUserUpdate,
        onCancel: () => localNavigateHandler("/dashboard/users"),
        validationFunctions: () => UserValidation(isEdit),
      }}
    />
  );
};

export default AddEdit;
