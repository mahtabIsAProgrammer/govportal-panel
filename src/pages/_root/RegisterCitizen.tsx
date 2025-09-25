import { Grid, Typography } from "@mui/material";
import { InputsBox } from "../../components/advances/AddEditProvider";
import { CustomButton } from "../../components/controllers/CustomButton";
import { loginSX } from "../../helpers/styles/pages/login";
import { tryCatchHandler } from "../../helpers/utils/handlers";
import { RegisterValidation } from "../../helpers/validations/login";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../services/hooks/auth";
import { TOKEN_NAME } from "../../helpers/constants/statics";

export const Register = () => {
  const navigate = useNavigate();
  const { mutateAsync: registerCitizen } = useRegister();

  const formIK = useFormik({
    initialValues: { first_name: "", last_name: "", email: "", password: "" },
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: RegisterValidation(),
    onSubmit: (values) => {
      tryCatchHandler({
        handler: async () => {
          const res = await registerCitizen(values);

          const token = res?.data?.token ?? "";
          const user = res?.data?.user;

          if (!token || !user) {
            throw new Error("Invalid login response");
          }

          localStorage.setItem(TOKEN_NAME, token);
          localStorage.setItem("user", JSON.stringify(user));

          if (user?.role === "citizen") navigate("/citizen");
          else navigate("/");
        },
        successMessage: "login succeed",
      });
    },
  });
  return (
    <Grid container sx={loginSX(true)}>
      <Grid container className="container">
        <Grid className="inputs-wrapper">
          <Grid className="title-wrapper">
            <Typography className="title">Register</Typography>
            <Typography className="subtitle"></Typography>
          </Grid>
          <Grid container className="inputs-container">
            <InputsBox
              inputs={[
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
                    },
                  },
                },
              ]}
              columnGridSize={5.9}
              formIK={formIK}
            />
          </Grid>
          <Grid className="buttons-wrapper">
            <Grid className="no-acount-wrapper">
              <Typography>Have an Acoount?</Typography>
              <Typography
                className="sign-up-btn"
                onClick={() => navigate(`/login`)}
              >
                Sign in
              </Typography>
            </Grid>
            <CustomButton
              // disabled={isLoading}
              className="button"
              variant="contained"
              text="Register"
              onClick={() => formIK.handleSubmit()}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
