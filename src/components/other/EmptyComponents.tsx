import { memo } from "react";
import { Typography } from "@mui/material";

import { COLOR_PRIMARY_TEXT } from "../../helpers/constants/colors";

export const emptyValueString = "----------";

export const EmptyValue = memo(() => {
  return (
    <>
      <Typography
        className="empty-text"
        sx={{ color: `${COLOR_PRIMARY_TEXT}80` }}
      >
        {emptyValueString}
      </Typography>
    </>
  );
});
