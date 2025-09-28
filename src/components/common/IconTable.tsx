import type { FC } from "react";
import { Box, Typography, type SxProps, type Theme } from "@mui/material";

import { CustomIcon } from "../controllers/CustomImage";
import { SPACE_SM } from "../../helpers/constants/spaces";
import { CustomTooltip } from "../controllers/CustomTooltip";

export const IconsTable: FC<IIconTable> = ({
  icon,
  color,
  title,
  hasText,
  onClick,
  placement,
  className,
}) => {
  return (
    <Box sx={actionTableButtons} className={className + " icon-table"}>
      {hasText ? (
        <Box
          className="box"
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: SPACE_SM,
            padding: SPACE_SM,
            mx: SPACE_SM,
            cursor: "pointer",
            minWidth: "100px",
            "&:hover": { backgroundColor: `${"#B2B2B2"}50` },
          }}
          onClick={onClick}
        >
          <CustomIcon src={icon} className="action-table-buttons" />
          <Typography
            variant="caption"
            className="title-text"
            sx={{ color: color + "!important" }}
          >
            {title}
          </Typography>
        </Box>
      ) : (
        <CustomTooltip
          title={title}
          placement={placement}
          component={
            <CustomIcon
              src={icon}
              className={className + " action-table-buttons"}
              onClick={onClick}
            />
          }
        />
      )}
    </Box>
  );
};

const actionTableButtons: SxProps<Theme> = {
  "& .action-table-buttons": {
    transition: "0.1s ease-in",
    "&:hover": {
      opacity: 1,
    },
    "&.more": {
      cursor: "pointer",
    },
  },
};
