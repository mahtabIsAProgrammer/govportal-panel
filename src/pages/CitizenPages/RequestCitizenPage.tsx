import { useFormik } from "formik";
import { forEach, map } from "lodash";
import { useContext, useMemo } from "react";
import { Grid, Skeleton, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import {
  useCreateRequest,
  useSubmitRequestWithPayment,
} from "../../services/hooks/requests";
import {
  tryCatchHandler,
  localNavigateHandler,
} from "../../helpers/utils/handlers";
import {
  CustomButton,
  CustomLoadingButton,
} from "../../components/controllers/CustomButton";
import { checkSubmitValue } from "../../helpers/utils/values";
import { MainContext } from "../../helpers/others/mainContext";
import { useGetServiceById } from "../../services/hooks/services";
import { InputsBox } from "../../components/advances/AddEditProvider";
import { useCreateRequestData } from "../../services/hooks/requestData";
import { type ServiceDataApi } from "../../services/configs/apiEndPoint";
import { RequestDataValidation } from "../../helpers/validations/requests";
import { requestCitizenPageSX } from "../../helpers/styles/pages/citizenPages";

const RequestCitizenPage = () => {
  const navigate = useNavigate();
  const { id: currentServiceId } = useParams();
  const { isLoadingUploader } = useContext(MainContext);

  const { data: serviceData, isLoading: isLoadingService } = useGetServiceById(
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
    isLoading: isLoadingSubmitRequestWithPayment,
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

          navigate("/citizen/my-request");
        } else {
          const { data } = await submitRequestWithPayment({
            service_id: serviceId,
            form_data: finalValues,
            amount: fee ?? 0,
          });
          navigate(`/citizen/payment/${data?.payment?.id}`);
        }
      },
      notShowMessage: { isSuccessMessage: isFree ? false : true },
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
          {isLoadingService ? (
            <Skeleton width="1100px" height="500px" />
          ) : (
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
                          isFullWidth: true,
                          props: {
                            input: {
                              isTextarea: true,
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
                columnGridSize={fields && fields?.length <= 3 ? 12 : 5.9}
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
                  text={"confirm"}
                  variant="contained"
                  loading={
                    loadingCreate ||
                    isLoaindCreateRequest ||
                    isLoadingSubmitRequestWithPayment
                  }
                  onClick={() => formIK.handleSubmit()}
                  disabled={isLoadingUploader}
                  sx={{ width: "100%" }}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RequestCitizenPage;
