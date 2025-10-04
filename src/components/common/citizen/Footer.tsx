import { memo } from "react";

import { map } from "lodash";
import { Box, Grid, Link, Typography } from "@mui/material";
import { CustomImageBox } from "../../controllers/CustomImage";
import { COLOR_PRIMARY_TEXT } from "../../../helpers/constants/colors";
import { copyRightIcon } from "../../other/FunctionalSVG";
import { footerSX } from "../../../helpers/styles/footer";

export const Footer = memo(() => {
  return (
    <Grid sx={footerSX}>
      <Grid container className="content-footer">
        <Grid size={{ xs: 12, md: 3.3 }} className="social-content">
          <Grid className="social-content">
            <CustomImageBox src={"/logo.png"} className="logo" width="200px" />

            <Typography className="description">
              Our duty is to provide quality and beautiful products to customers
              and maintain the store environment in a beautiful and pleasant way
              and create a pleasant shopping experience for customers.
            </Typography>
          </Grid>
        </Grid>
        <Grid size={{ xs: 5, md: 2 }} className="navigation-content">
          <>
            <Typography className="title">Navigation</Typography>
            {map(navbarValues, ({ name, url }, index) => (
              <Link
                sx={{ textDecoration: "none", color: COLOR_PRIMARY_TEXT }}
                key={index}
                className={"text"}
                href={url}
              >
                {name}
              </Link>
            ))}
          </>
        </Grid>
        <Grid size={{ xs: 5, md: 2 }} className="navigation-content">
          <>
            <Typography className="title">Contact</Typography>
            <Typography className="text">+989383823445</Typography>
            <Typography className="text">WWW.abc.com</Typography>
            <Typography className="text">abc@gmail.com</Typography>
          </>
        </Grid>
      </Grid>
      <Grid className="copyright-text">
        <Typography className="text">
          Copyright{" "}
          <Box component="span" className="icon">
            {copyRightIcon()}
          </Box>{" "}
          2024 <Box component="span">Mahtab</Box>. All right reserved.
        </Typography>

        <Typography className="text">Terms | Privacy poicy</Typography>
      </Grid>
    </Grid>
  );
});

const navbarValues = [
  { name: "Home", url: "/citizen" },
  { name: "Services", url: "#services" },
  { name: "Departments", url: "#departments" },
];
