import { memo } from "react";
import { isEmpty } from "lodash";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import type { JSX } from "@emotion/react/jsx-runtime";
import { Box, Typography, type SxProps, type Theme } from "@mui/material";

import { BreadCrumbs } from "./Breadcrumbs";
import { COLOR_WHITE } from "../../helpers/constants/colors";
import { localNavigateHandler } from "../../helpers/utils/handlers";
import { SPACE_MD, SPACE_SM } from "../../helpers/constants/spaces";
import { CustomButton, type TCustomButton } from "../controllers/CustomButton";
import { FONT_TITLE, FONT_WEIGHT_REGULAR } from "../../helpers/constants/fonts";

interface IHeaderPage {
  title: string;
  justHelmet?: boolean;
  localNavigate?: boolean;
  otherComponent?: JSX.Element;
  breadcrumbData: IBreadcrumbsItems[];
  button?: { props: TCustomButton; link?: string };
}

export const HeaderPage = memo<IHeaderPage>(
  ({
    title,
    button,
    justHelmet,
    localNavigate,
    breadcrumbData,
    otherComponent,
  }) => {
    const navigate = useNavigate();
    return (
      <>
        <Helmet
          title={"GovPortal"}
          htmlAttributes={{ lang: "en" }}
          meta={[
            {
              name: "govPortal",
              content: "govPortal",
            },
          ]}
          link={[
            {
              rel: "icon",
              type: "image/png",
              href: "/logo-small.png",
            },
          ]}
        />
        {justHelmet ? null : (
          <Box className="header-page-content" sx={headerPageSX}>
            <Box className="title-wrapper" component="div">
              <Typography className="title">{title}</Typography>
              {!isEmpty(breadcrumbData) && (
                <BreadCrumbs
                  breadcrumbs={breadcrumbData}
                  className="breadcrumb"
                />
              )}
            </Box>

            <Box component="div" className="feature-box">
              {button?.props && (
                <Box
                  onClick={() =>
                    localNavigate
                      ? localNavigateHandler(button.link ?? "")
                      : navigate(button.link ?? "")
                  }
                >
                  <CustomButton {...button?.props} />
                </Box>
              )}

              {otherComponent}
            </Box>
          </Box>
        )}
      </>
    );
  }
);

const headerPageSX: SxProps<Theme> = {
  p: SPACE_MD,
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
  borderRadius: "12px",
  backgroundColor: COLOR_WHITE,
  justifyContent: "space-between",
  "& .title-wrapper": {
    display: "flex",
    flexDirection: "column",
    "& .title": {
      fontSize: FONT_TITLE,
      fontWeight: FONT_WEIGHT_REGULAR,
    },
  },
  "& .breadcrumb": {
    marginBottom: "50px !important",
  },
  "& .feature-box": {
    display: "flex",
    gap: SPACE_SM,
  },
};
