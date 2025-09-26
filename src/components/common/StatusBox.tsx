import type { FC } from "react";
import { Box } from "@mui/material";

import { SPACE_SM } from "../../helpers/constants/spaces";
import { STATUS_BOX_SIZE } from "../../helpers/constants/statics";

export const StatusBox: FC<IStatusBox> = ({ color, size, text }) => {
  return (
    <Box
      component="p"
      className="status-box"
      sx={{
        width: STATUS_BOX_SIZE[size || "medium"],
        fontSize: "12px",
        fontWeight: "500",
        py: SPACE_SM,
        px: "12px",
        textAlign: "center",
        borderRadius: "8px",
        color: `${color}`,
        background: `${color}40`,
      }}
    >
      {text}
    </Box>
  );
};
