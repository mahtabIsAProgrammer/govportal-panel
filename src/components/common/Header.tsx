import { memo } from "react";
import { isEmpty } from "lodash";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import type { JSX } from "@emotion/react/jsx-runtime";

import { BreadCrumbs } from "./Breadcrumbs";
import { headerPageSX } from "../../helpers/styles/common";
import { localNavigateHandler } from "../../helpers/utils/handlers";
import { CustomButton, type TCustomButton } from "../controllers/CustomButton";

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
