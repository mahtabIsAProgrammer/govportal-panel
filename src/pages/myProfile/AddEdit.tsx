import { Grid } from "@mui/material";
import { useMemo, type FC } from "react";
import { useParams } from "react-router-dom";

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
import { UserValidation } from "../../helpers/validations/users";
import { MAX_WIDTH_CITIZEN } from "../../helpers/constants/statics";
import { useDepartmentData } from "../../services/hooks/departments";
import { useUpdateUser, useGetUserById } from "../../services/hooks/users";
import { AddEditProvider } from "../../components/advances/AddEditProvider";
import { GENDER_TYPES_DATA, ROLE_TYPES_DATA } from "../../helpers/utils/types";

const AddEdit: FC<{ isCitizen?: boolean }> = ({ isCitizen }) => {
  const { id } = useParams();

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
    role,
    gender,
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
    role: role || "",
    username: username || "",
    gender: gender || null,
  };

  const { data: departmentData } = useDepartmentData();
  const departmentSearchData = useMemo(
    () => (departmentData as { data: DepartmentDataApi[] })?.data ?? [],
    [departmentData]
  );

  return (
    <Grid
      sx={
        isCitizen
          ? {
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pt: "120px",
              "& .add-edit-wrapper": {
                width: "100%",
                maxWidth: MAX_WIDTH_CITIZEN,
              },
            }
          : {}
      }
    >
      <AddEditProvider
        breadcrumbs={[
          {
            name: isCitizen ? "citizen" : "dashboard",
            link: isCitizen ? "/citizen" : "/",
            type: "none",
          },
          {
            name: "My Profile",
            link: isCitizen ? "/citizen/me" : "/dashboard/me",
            type: "list",
          },
          { name: `Edit My Profile`, link: "", type: "add" },
        ]}
        isLoading={isLoadingPage}
        setting={{
          isEdit: true,
        }}
        texts={{
          title: `Edit My Profile`,
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
                      disabled: true,
                    },
                  },
                },
                {
                  type: "select",
                  name: "role",
                  props: {
                    select: {
                      required: true,
                      disabled: true,
                      customLabel: "Role",
                      items: optionCreator({
                        id: "name",
                        name: "name",
                        data: ROLE_TYPES_DATA,
                        hasNotEmpty: false,
                      }),
                    },
                  },
                  InputsChildren: ({ value }) => {
                    return value == ROLE_TYPES_DATA?.[2]?.name ||
                      value == ROLE_TYPES_DATA?.[1]?.name
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
                  username: username || "",
                  gender: checkFalsyValue(gender) ? +gender : null,
                };

                const data = await userUpdate(finalValues);

                localNavigateHandler(
                  isCitizen ? "/citizen/me" : "/dashboard/me"
                );
                return data;
              },
            });
          },
          loading: isLoadingUserUpdate,
          onCancel: () => localNavigateHandler("/dashboard/me"),
          validationFunctions: () => UserValidation(true),
        }}
      />
    </Grid>
  );
};

export default AddEdit;
