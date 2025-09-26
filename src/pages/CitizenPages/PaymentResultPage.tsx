// CitizenPaymentResult.tsx
import { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import {
  useUpdatePayment,
  useGetPaymentById,
} from "../../services/hooks/payments";
import { guidGenerator } from "../../helpers/utils/array";
import { tryCatchHandler } from "../../helpers/utils/handlers";
import { CustomButton } from "../../components/controllers/CustomButton";
import type { PaymentDataApi } from "../../services/configs/apiEndPoint";

const CitizenPayment = () => {
  const { id: currentPaymentId } = useParams();
  const navigate = useNavigate();
  const { data: paymentData } = useGetPaymentById(
    currentPaymentId ? +currentPaymentId : 0
  );
  const { amount, request_id, created_at } = useMemo(
    () => (paymentData as { data: PaymentDataApi })?.data ?? [],
    [paymentData]
  );

  const { mutateAsync: updatePayment } = useUpdatePayment(
    currentPaymentId ? +currentPaymentId : 0
  );

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      gap="20px"
      flexDirection="column"
    >
      <Typography variant="h6">...FaKE Paypal Payment method</Typography>

      <Typography>Paymend Id : {currentPaymentId}</Typography>
      <CustomButton
        text={"Pay"}
        onClick={() =>
          tryCatchHandler({
            handler: () => {
              const res = updatePayment({
                amount,
                payment_date: created_at,
                created_at,
                request_id: request_id,
                status: "paid",
                transaction_id: `FAKE-ID${guidGenerator()}`,
              });
              navigate("/citizen/my-request");
              return res;
            },
            successMessage: "Operation Succeed",
          })
        }
      />
    </Box>
  );
};

export default CitizenPayment;
