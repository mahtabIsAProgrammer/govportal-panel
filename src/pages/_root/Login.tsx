import type { FC } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Box } from "@mui/material";

import { useGetToken } from "../../services/hooks/auth";
import { loginSX } from "../../helpers/styles/pages/login";
import { TOKEN_NAME } from "../../helpers/constants/statics";
import { LoginValidation } from "../../helpers/validations/login";
import { errorAlert, successAlert } from "../../helpers/utils/messages";
import { CustomButton } from "../../components/controllers/CustomButton";
import { CustomTextfield } from "../../components/controllers/CustomTextfield";

export const Login: FC = () => {
  const navigate = useNavigate();

  const { mutateAsync: getToken, isLoading } = useGetToken();

  const formIK = useFormik({
    initialValues: { identifier: "", password: "" },
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: LoginValidation(),
    onSubmit: async (values) => {
      try {
        const res = await getToken(values);

        const token = res?.data?.token ?? "";
        const user = res?.data?.user;

        if (!token || !user) {
          throw new Error("Invalid login response");
        }

        localStorage.setItem(TOKEN_NAME, token);
        localStorage.setItem("user", JSON.stringify(user));

        successAlert({ title: "Login was Successful" });
        navigate("/");
      } catch (err) {
        errorAlert({ title: "Login failed. Check credentials." });
        console.error("Login error:", err);
      }
    },
  });

  return (
    <Grid container sx={loginSX}>
      <Grid container size={{ xs: 12, md: 5.5 }} className="container">
        <Grid className="inputs-wrapper">
          <Grid className="title-wrapper">
            <Typography className="title">Login</Typography>
            <Typography className="subtitle"></Typography>
          </Grid>
          <Box component="form" onSubmit={formIK.handleSubmit}>
            <Grid className="inputs">
              <CustomTextfield
                className="input"
                customLabel="email or username"
                name="identifier"
                placeholder="xxxx@xxx.xx"
                value={formIK.values.identifier}
                onChange={formIK.handleChange}
                errorMessage={
                  formIK.errors.identifier
                    ? {
                        text: formIK.errors.identifier,
                        type: "error",
                      }
                    : undefined
                }
              />
              <CustomTextfield
                type="password"
                name="password"
                className="input"
                variant="outlined"
                placeholder="3092mk20"
                customLabel="Password"
                value={formIK.values.password}
                onChange={formIK.handleChange}
                errorMessage={
                  formIK.errors.password
                    ? {
                        text: formIK.errors.password,
                        type: "error",
                      }
                    : undefined
                }
              />
            </Grid>
            <Grid className="buttons-wrapper">
              <CustomButton
                disabled={isLoading}
                type="submit"
                className="button"
                variant="contained"
                text="Login"
                // onClick={() => navigate("/")}
              />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};
