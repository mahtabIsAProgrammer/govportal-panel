import { Grid, Typography } from "@mui/material";
import { requestCitizenPageSX } from "../../helpers/styles/pages/citizenPages";
import { useGetServiceById } from "../../services/hooks/services";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useMemo } from "react";
import { type ServiceDataApi } from "../../services/configs/apiEndPoint";
import { InputsBox } from "../../components/advances/AddEditProvider";
import { forEach, map } from "lodash";
import {
  CustomButton,
  CustomLoadingButton,
} from "../../components/controllers/CustomButton";
import { MainContext } from "../../helpers/others/mainContext";
import { useFormik } from "formik";
import { useCreateRequestData } from "../../services/hooks/requestData";
import {
  useCreateRequest,
  useSubmitRequestWithPayment,
} from "../../services/hooks/requests";
import { RequestDataValidation } from "../../helpers/validations/requests";
import {
  localNavigateHandler,
  tryCatchHandler,
} from "../../helpers/utils/handlers";
import { checkSubmitValue } from "../../helpers/utils/values";

export const RequestCitizenPage = () => {
  const navigate = useNavigate();
  const { id: currentServiceId } = useParams();
  const { isLoadingUploader } = useContext(MainContext);

  const { data: serviceData } = useGetServiceById(
    currentServiceId ? +currentServiceId : 0
  );
  const {
    name,
    description,
    fee,
    form_schema,
    id: serviceId,
  } = useMemo(
    () => (serviceData as { data: ServiceDataApi })?.data ?? [],
    [serviceData]
  );

  const {
    globalProfileInformation: { id: currentCitizenId },
  } = useContext(MainContext);
  const { mutateAsync: createRequestData, isLoading: isLoaindCreateRequest } =
    useCreateRequestData();
  const { mutateAsync: createRequest, isLoading: loadingCreate } =
    useCreateRequest();
  const {
    mutateAsync: submitRequestWithPayment,
    // isLoading: isLoadingSubmitRequestWithPayment,
  } = useSubmitRequestWithPayment();

  const { fields } = form_schema ?? {};

  const isFree = fee == 0;

  const initialValues = useMemo(() => {
    const obj: TAny = {};
    forEach(fields, (f: TAny) => {
      obj[f.name] = "";
    });
    return obj;
  }, [fields]);

  const onSubmitFormikhandler = (values: TAny) => {
    tryCatchHandler({
      handler: async () => {
        const finalValues = checkSubmitValue(values);
        if (isFree) {
          const newRequest = await createRequest({
            citizen_id: currentCitizenId,
            service_id: serviceId,
            status: 0,
            reviewed_by: null,
          });
          await createRequestData({
            request_id: newRequest?.data?.id,
            form_data: finalValues,
          });

          navigate("/citizen");
        } else {
          const { data } = await submitRequestWithPayment({
            service_id: serviceId,
            form_data: finalValues,
            amount: fee ?? 0,
          });
          navigate(`/citizen/payment/${data?.payment?.id}`);
        }
      },
      notShowMessage: { isSuccessMessage: true },
    });
  };

  const formIK = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: RequestDataValidation(fields as TAny),
    onSubmit: onSubmitFormikhandler,
  });

  return (
    <Grid sx={requestCitizenPageSX} className="request-citizen-page">
      <Grid className="container">
        <Grid className="texts-wrapper">
          <Typography className="name">{name}</Typography>
          <Typography className="description">{description}</Typography>
        </Grid>

        <Grid className="inputs-container-wrapper">
          <Grid container size={{ md: 12 }} className="inputs-wrapper">
            <InputsBox
              inputs={
                map(fields, ({ name, type, label, required }: TAny) =>
                  type == "text"
                    ? {
                        type: "input",
                        name,
                        props: {
                          input: {
                            placeholder: label,
                            customLabel: label,
                            required: required,
                          },
                        },
                      }
                    : type == "date"
                    ? {
                        type: "datePicker",
                        name,
                        props: {
                          datePicker: {
                            placeholder: label,
                            customLabel: label,
                            required: required,
                          },
                        },
                      }
                    : type == "textarea"
                    ? {
                        type: "input",
                        name,
                        props: {
                          input: {
                            isTextArea: true,
                            placeholder: label,
                            customLabel: label,
                            required: required,
                          },
                        },
                      }
                    : type == "file"
                    ? {
                        name,
                        thumbName: name,
                        isFullWidth: true,
                        type: "fileUploader",
                        props: {
                          fileUploader: {
                            customLabel: label,
                            // type: "image",
                            required,
                          },
                        },
                      }
                    : ""
                ) as TAny
              }
              columnGridSize={5.9}
              formIK={formIK}
            />
            <Grid
              size={{ md: 12 }}
              sx={{
                gap: "20px",
                display: "flex",
                p: 0,
                justifyContent: "space-between",
              }}
            >
              <CustomButton
                text={"cancel"}
                variant="outlined"
                sx={{ width: "100%" }}
                onClick={() => localNavigateHandler("/citizen")}
              />
              <CustomLoadingButton
                // type="submit"
                text={"confirm"}
                variant="contained"
                loading={loadingCreate || isLoaindCreateRequest}
                onClick={() => formIK.handleSubmit()}
                disabled={isLoadingUploader}
                sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
