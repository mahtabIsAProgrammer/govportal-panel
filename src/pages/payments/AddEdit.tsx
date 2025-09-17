import { type FC } from "react";

import {
  tryCatchHandler,
  localNavigateHandler,
} from "../../helpers/utils/handlers";
import { useCreatePayment } from "../../services/hooks/payments";
import { PaymentValidation } from "../../helpers/validations/payments";
import type { PaymentDataApi } from "../../services/configs/apiEndPoint";
import { AddEditProvider } from "../../components/advances/AddEditProvider";

interface IAddEdit {
  isEdit?: boolean;
}

const AddEdit: FC<IAddEdit> = ({ isEdit }) => {
  const { mutateAsync: createPayment, isLoading: loadingCreate } =
    useCreatePayment();

  const initialValues: PaymentDataApi = {
    amount: 0,
    payment_Date: "",
    request_id: 0,
    status: "",
    transaction_id: 0,
  };
  return (
    <AddEditProvider
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "payments", link: "/dashboard/payments", type: "list" },
        { name: `${isEdit ? "edit" : "Add"} payment`, link: "", type: "add" },
      ]}
      isLoading={loadingCreate}
      setting={{
        isEdit: isEdit ?? false,
      }}
      texts={{
        title: `${isEdit ? "edit" : "Add"} payment`,
      }}
      options={{
        content: {
          normalContent: {
            inputs: [
              {
                type: "input",
                name: "amount",
                props: {
                  input: {
                    placeholder: "first Name",
                    customLabel: "first Name",
                    disabled: true,
                  },
                },
              },
              {
                type: "input",
                name: "payment_Date",
                props: {
                  input: {
                    placeholder: "last Name",
                    customLabel: "last Name",
                    disabled: true,
                  },
                },
              },
              {
                type: "input",
                name: "request_id",
                props: {
                  input: {
                    placeholder: "Email",
                    customLabel: "Email",
                    disabled: true,
                  },
                },
              },
              {
                type: "input",
                name: "status",
                props: {
                  input: {
                    placeholder: "paymentname",
                    customLabel: "paymentname",
                    disabled: true,
                  },
                },
              },
              {
                type: "input",
                name: "transaction_id",
                props: {
                  input: {
                    placeholder: "paymentname",
                    customLabel: "paymentname",
                    disabled: true,
                  },
                },
              },
            ],
            columnGridSize: 3.9,
          },
        },
      }}
      forms={{
        initialValues,
        onSubmit: async ({
          amount,
          payment_Date,
          request_id,
          status,
          transaction_id,
        }) => {
          tryCatchHandler({
            handler: async () => {
              const finalValues = {
                amount: amount || "",
                payment_Date: payment_Date || "",
                request_id: request_id || "",
                status: status || "",
                transaction_id: transaction_id || "",
              };
              const data = (await createPayment(
                finalValues
              )) as unknown as IMutateAsyncResponseGuid;

              localNavigateHandler("/dashboard/payments");
              return data;
            },
          });
        },
        loading: false,
        onCancel: () => localNavigateHandler("/dashboard/payments"),
        validationFunctions: () => PaymentValidation(),
      }}
    />
  );
};

export default AddEdit;
