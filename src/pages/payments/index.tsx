import { useMemo, type FC } from "react";

import { usePaymentData } from "../../services/hooks/payments";
import { PageProvider } from "../../components/advances/PageProvider";
import type {
  PaymentDataApi,
  RequestDataApi,
  ServiceDataApi,
  UserDataApi,
} from "../../services/configs/apiEndPoint";
import type { IHeaderCell } from "../../components/controllers/CustomTable";
import { useGetRequestById } from "../../services/hooks/requests";
import { useGetServiceById } from "../../services/hooks/services";
import { useGetUserById } from "../../services/hooks/users";
import { DateFormatIsoMOMENT } from "../../helpers/utils/dateTime";
import { find } from "lodash";
import { PAYMENT_STATUS_TYPES_DATA } from "../../helpers/utils/types";
import { StatusBox } from "../../components/common/StatusBox";
import {
  COLOR_GREEN,
  COLOR_MUTED_TEXT,
  COLOR_RED,
  COLOR_WARNING,
} from "../../helpers/constants/colors";

const List: FC = () => {
  return (
    <PageProvider
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "Payments", link: "", type: "list" },
      ]}
      texts={{
        title: "Payments",
        buttonInsert: "Add Payments",
      }}
      withoutInsert
      tableData={{
        useListRows: usePaymentData,
        tableOptions: {
          withOutSearch: true,
          hasIndex: true,
          headerCells: userHeadCells,
        },
      }}
    />
  );
};

export default List;

const userHeadCells: IHeaderCell<PaymentDataApi>[] = [
  {
    id: "amount",
    label: "amount",
    isCenter: true,
  },
  {
    id: "request_id",
    label: "service",
    isCenter: true,
    RenderRow: ({ value }) => {
      const { data: requestData } = useGetRequestById(+value);

      const { service_id } = useMemo(
        () => (requestData as { data: RequestDataApi })?.data ?? [],
        [requestData]
      );
      const { data: serviceData } = useGetServiceById(
        service_id ? +service_id : 0
      );

      const { name } = useMemo(
        () => (serviceData as { data: ServiceDataApi })?.data ?? [],
        [serviceData]
      );

      return <>{name}</>;
    },
  },
  {
    id: "request_id",
    label: "citizen",
    isCenter: true,
    RenderRow: ({ value }) => {
      const { data: requestData } = useGetRequestById(+value);

      const { citizen_id } = useMemo(
        () => (requestData as { data: RequestDataApi })?.data ?? [],
        [requestData]
      );
      const { data: userData } = useGetUserById(citizen_id);

      const { first_name, last_name } = useMemo(
        () => (userData as { data: UserDataApi })?.data ?? [],
        [userData]
      );

      return <>{`${first_name} ${last_name}`}</>;
    },
  },
  {
    id: "status",
    label: "Status",
    isCenter: true,
    RenderRow: ({ value }) => {
      const status = find(
        PAYMENT_STATUS_TYPES_DATA,
        ({ name }) => name == value
      );
      return (
        <StatusBox
          color={color[((status && status?.id) ?? 0) + 1]}
          text={status?.name}
          size="large"
        />
      );
    },
  },
  {
    id: "payment_date",
    label: "Date",
    isCenter: true,
    RenderRow: ({ value }) => <>{DateFormatIsoMOMENT(String(value))}</>,
  },
  { id: "transaction_id", label: "transaction id", isCenter: true },
  // {
  //   id: "id",
  //   label: "actions",
  //   RenderRow: ({ value }) => {
  //     const [open, setOpen] = useState(false);
  //     // const { mutateAsync: companyDelete, isLoading } = useCompanyDelete();
  //     const navigate = useNavigate();
  //     return (
  //       <>
  //         <>
  //           <Grid sx={{ display: "flex" }}>
  //             <IconsTable
  //               title="edit"
  //               icon={editICON()}
  //               onClick={() => navigate(`edit/${value}`)}
  //             />
  //             <IconsTable
  //               title="delete"
  //               icon={trashICON()}
  //               onClick={() => setOpen(true)}
  //             />
  //           </Grid>
  //         </>
  //         {
  //           <CustomDialogMessage
  //             type="delete"
  //             open={open}
  //             onClose={() => setOpen(false)}
  //             loading={false}
  //             onSubmit={async () =>
  //               tryCatchHandler({
  //                 handler: async () => {
  //                   // const data = await companyDelete(+value);

  //                   return setOpen(false);
  //                   // return data;
  //                 },

  //                 successMessage: "successfully_deleted",
  //               })
  //             }
  //           />
  //         }
  //       </>
  //     );
  //   },
  //   isCenter: true,
  // },
];

const color = [COLOR_MUTED_TEXT, COLOR_WARNING, COLOR_GREEN, COLOR_RED];
