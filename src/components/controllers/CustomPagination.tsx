import {
  Grid,
  type Theme,
  Pagination,
  Typography,
  type SxProps,
  PaginationItem,
  type PaginationProps,
} from "@mui/material";
import { memo, type FC } from "react";

import {
  COLOR_WHITE,
  COLOR_PRIMARY,
  COLOR_MUTED_TEXT,
} from "../../helpers/constants/colors";
import { SPACE_SM } from "../../helpers/constants/spaces";
import { FONT_SMALL_TEXT } from "../../helpers/constants/fonts";
import { arrowLeftICON, arrowRightICON } from "../other/FunctionalSVG";

export interface ICustomPagination extends PaginationProps {
  className?: string;
}

export const CustomPagination: FC<ICustomPagination> = ({
  className,
  ...props
}) => {
  const IconPrevious = memo(() => {
    return (
      <Grid sx={iconPrevNextSX}>
        <Typography>{"next"}</Typography>
        {arrowLeftICON()}
      </Grid>
    );
  });
  const IconNext = memo(() => {
    return (
      <Grid sx={iconPrevNextSX}>
        {arrowRightICON()}
        <Typography>{"previous"}</Typography>
      </Grid>
    );
  });
  return (
    <Grid sx={customPaginationSX}>
      <Pagination
        {...props}
        className={className + " custom-pagination"}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: IconPrevious, next: IconNext }}
            className="pagination-item"
            {...item}
          />
        )}
      />
    </Grid>
  );
};

const customPaginationSX: SxProps<Theme> = {
  "& .custom-pagination": {
    "& .MuiPagination-ul": {
      "& .MuiPaginationItem-previousNext": {
        background: "transparent",
        width: "fit-content",
      },
    },
    "& .pagination-item": {
      width: "32px",
      height: "32px",
      display: "flex",
      minWidth: "32px",
      color: COLOR_MUTED_TEXT,
      alignItems: "center",
      background: COLOR_WHITE,
      fontSize: FONT_SMALL_TEXT,
      borderRadius: "4px",
      fontWeight: "500",
      "&.Mui-selected ": {
        color: COLOR_PRIMARY,
        background: COLOR_PRIMARY + "20",
      },
    },
  },
};

const iconPrevNextSX: SxProps<Theme> = {
  gap: SPACE_SM,
  display: "flex",
  alignItems: "center",
  "& svg": {
    width: "16px",
    height: "16px",
  },
  "& p": {
    color: COLOR_MUTED_TEXT,
    fontSize: FONT_SMALL_TEXT,
    fontWeight: "500",
  },
};
