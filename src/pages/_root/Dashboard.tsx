import { PageProvider } from "../../components/advances/PageProvider";

export const Dashboard = () => {
  return (
    <>
      <PageProvider
        breadcrumbs={[{ link: "/dashboard", name: "Dashboard", type: "" }]}
        texts={{
          title: "Dashboard",
          buttonInsert: "Add",
        }}
        withoutInsert
        tableData={{
          useListRows: () => undefined,
          tableOptions: {
            groupBy: [""],
            headerCells: [
              { id: "hi", label: "hi" },
              { id: "Hey", label: "Hey" },
              { id: "Heo", label: "Heo" },
            ],
          },
        }}
        tabData={[
          {
            label: "hi",
            tabNumber: 1,
            component: {
              useListRows: () => undefined,
              tableOptions: {
                groupBy: [""],
                headerCells: [
                  { id: "hi", label: "hi" },
                  { id: "Hey", label: "Hey" },
                  { id: "Heo", label: "Heo" },
                ],
              },
            },
          },
        ]}
      />
    </>
  );
};
