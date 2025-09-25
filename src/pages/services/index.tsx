import { Grid } from "@mui/material";
import { useContext, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";

import {
  useServiceData,
  useDeleteService,
} from "../../services/hooks/services";
import type {
  ServiceDataApi,
  DepartmentDataApi,
} from "../../services/configs/apiEndPoint";
import { IconsTable } from "../../components/common/IconTable";
import { tryCatchHandler } from "../../helpers/utils/handlers";
import { MainContext } from "../../helpers/others/mainContext";
import { PageProvider } from "../../components/advances/PageProvider";
import { useGetDepartmentById } from "../../services/hooks/departments";
import { editICON, trashICON } from "../../components/other/FunctionalSVG";
import type { IHeaderCell } from "../../components/controllers/CustomTable";
import { CustomDialogMessage } from "../../components/common/CustomDialogMessages";

const List: FC = () => {
  const {
    globalProfileInformation: { role: currentRole },
  } = useContext(MainContext);

  const userHeadCells: IHeaderCell<ServiceDataApi>[] = [
    {
      id: "name",
      label: "Name",
      isCenter: true,
    },
    {
      id: "department_id",
      label: "Department",
      isCenter: true,
      RenderRow: ({ value }) => {
        const { data: departmentById } = useGetDepartmentById(+value);
        const { name } =
          (departmentById as { data: DepartmentDataApi } | undefined)?.data ??
          {};
        return <>{name}</>;
      },
    },
    {
      id: "fee",
      label: "Fee",
      isCenter: true,
      RenderRow: ({ value }) => <>{value == 0 ? "Free" : value}</>,
    },
    {
      id: "id",
      label: "actions",
      hidden: currentRole === "officer" ? true : false,
      RenderRow: ({ value }) => {
        const [open, setOpen] = useState(false);
        const { mutateAsync: serviceDelete, isLoading } = useDeleteService();
        const navigate = useNavigate();
        return (
          <>
            <>
              <Grid sx={{ display: "flex" }}>
                <IconsTable
                  title="edit"
                  icon={editICON()}
                  onClick={() => navigate(`edit/${value}`)}
                />
                <IconsTable
                  title="delete"
                  icon={trashICON()}
                  onClick={() => setOpen(true)}
                />
              </Grid>
            </>
            {
              <CustomDialogMessage
                type="delete"
                open={open}
                onClose={() => setOpen(false)}
                loading={isLoading}
                onSubmit={async () =>
                  tryCatchHandler({
                    handler: async () => {
                      const data = await serviceDelete(+value);

                      setOpen(false);
                      return data;
                    },
                    successMessage: "Successfully Deleted",
                  })
                }
              />
            }
          </>
        );
      },
      isCenter: true,
    },
  ];

  return (
    <PageProvider
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "services", link: "", type: "list" },
      ]}
      texts={{
        title: "Services",
        buttonInsert: "Add service",
      }}
      withoutInsert={currentRole == "officer" ? true : false}
      buttonLink="add"
      tableData={{
        useListRows: useServiceData,
        tableOptions: {
          hasIndex: true,
          headerCells: userHeadCells,
        },
      }}
    />
  );
};

export default List;
