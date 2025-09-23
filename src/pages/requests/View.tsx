import { entries } from "lodash";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useMemo, useState, type FC } from "react";
import { Box, Grid, Typography } from "@mui/material";

import {
  useGetRequestById,
  useUpdateRequestStatus,
} from "../../services/hooks/requests";
import type {
  UserDataApi,
  ServiceDataApi,
  RequestDataApi,
  RequestDataDataApi,
} from "../../services/configs/apiEndPoint";
import {
  CustomIcon,
  CustomImageBox,
} from "../../components/controllers/CustomImage";
import {
  CustomButton,
  CustomLoadingButton,
} from "../../components/controllers/CustomButton";
import { optionCreator } from "../../helpers/utils/others";
import { HeaderPage } from "../../components/common/Header";
import { ViewRequestSX } from "../../helpers/styles/common";
import { useGetUserById } from "../../services/hooks/users";
import { urlImageHandler } from "../../helpers/utils/images";
import { tryCatchHandler } from "../../helpers/utils/handlers";
import { useGetServiceById } from "../../services/hooks/services";
import { NotificationSetting } from "../_root/NotificationSetting";
import { DateFormatIsoMOMENT } from "../../helpers/utils/dateTime";
import { InputsBox } from "../../components/advances/AddEditProvider";
import { REQUEST_STATUS_TYPES_DATA } from "../../helpers/utils/types";
import { emptyValueString } from "../../components/other/EmptyComponents";
import { useGetRequestDataByRequestId } from "../../services/hooks/requestData";

const View = () => {
  const { id: currentRequestId } = useParams();
  const [insertToggleModal, setInsertToggleModal] = useState<boolean>(false);

  const { data: requestData } = useGetRequestById(
    currentRequestId ? +currentRequestId : 0
  );

  const { citizen_id, service_id, submitted_at, status } = useMemo(
    () => (requestData as { data: RequestDataApi })?.data ?? [],
    [requestData]
  );
  const { data: userData } = useGetUserById(citizen_id);

  const { first_name, last_name } = useMemo(
    () => (userData as { data: UserDataApi })?.data ?? [],
    [userData]
  );
  const { data: serviceData } = useGetServiceById(service_id ? +service_id : 0);

  const { name } = useMemo(
    () => (serviceData as { data: ServiceDataApi })?.data ?? [],
    [serviceData]
  );
  const { data: requestDataData } = useGetRequestDataByRequestId(
    currentRequestId ? +currentRequestId : 0
  );

  const { form_data } = useMemo(
    () => (requestDataData as { data: RequestDataDataApi })?.data ?? {},
    [requestDataData]
  );

  const { mutateAsync: updateStatus, isLoading: isLoadingUpdateRequestStatus } =
    useUpdateRequestStatus();

  const formIK = useFormik({
    initialValues: {
      status: status || -1,
    },
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      tryCatchHandler({
        handler: async () => {
          const data = await updateStatus({
            status: values?.status,
            id: currentRequestId,
          });
          return data;
        },
      });
    },
  });

  return (
    <Grid sx={ViewRequestSX} className="view-request-page">
      <HeaderPage
        title={"View Request"}
        breadcrumbData={[
          { name: "dashboard", link: "/", type: "none" },
          { name: "requests", link: "/dashboard/requests", type: "list" },
          { name: `view request`, link: "", type: "view" },
        ]}
      />
      <Grid className="container">
        <Grid className="comment-wrapper">
          <Grid container className="input-status-wrapper">
            <InputsBox
              inputs={[
                {
                  name: "status",
                  type: "select",
                  props: {
                    select: {
                      required: true,
                      customLabel: "Update Status",
                      items: optionCreator({
                        id: "id",
                        name: "name",
                        data: REQUEST_STATUS_TYPES_DATA,
                        hasNotEmpty: true,
                      }),
                    },
                  },
                },
              ]}
              columnGridSize={5.9}
              formIK={formIK}
            />
            <Grid>
              <CustomLoadingButton
                sx={{
                  height: "54px",
                  mt: "14px",
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderTopRightRadius: "12px",
                  borderBottomRightRadius: "12px",
                }}
                text={"Submit"}
                variant="contained"
                loading={isLoadingUpdateRequestStatus}
                // disabled={isLoadingUploader}
                onClick={() => formIK.handleSubmit()}
              />
            </Grid>
          </Grid>
          <Grid>
            <CustomButton
              text={`Send Comment To ${first_name} ${last_name}`}
              onClick={() => setInsertToggleModal(!insertToggleModal)}
            />
          </Grid>
        </Grid>
        <Grid className="detail-wrapper">
          <Grid className="requests">
            <ItemBox
              title={"Citizen Name "}
              value={`${first_name} ${last_name}`}
            />
            <ItemBox title={"Service Name "} value={`${name}`} />
            <ItemBox
              title={"Submit Date "}
              value={`${DateFormatIsoMOMENT(submitted_at)}`}
            />
          </Grid>
          <Grid className="form-data">
            {entries(form_data).map(([key, value]) => {
              return (
                <Grid>
                  {key === "photo" ? (
                    <CustomImageBox
                      className="item"
                      src={urlImageHandler(value)}
                    />
                  ) : (
                    <ItemBox
                      key={key}
                      title={key}
                      value={value || emptyValueString}
                    />
                  )}
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
      <NotificationSetting
        userId={citizen_id}
        insertToggleModal={insertToggleModal}
        setInsertToggleModal={setInsertToggleModal}
      />
    </Grid>
  );
};
export default View;

const ItemBox: FC<{ title: string; value: TAny; icon?: TAny }> = ({
  title,
  value,
  icon,
}) => {
  return (
    <Box className="item">
      <Box className="item-title">
        <CustomIcon src={icon} />
        <Typography className="title">{title}:</Typography>
      </Box>
      <Typography className="item-text">{value}</Typography>
    </Box>
  );
};
