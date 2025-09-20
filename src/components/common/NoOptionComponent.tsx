import { memo } from "react";
import { Grid, Typography } from "@mui/material";

import { SPACE_MD } from "../../helpers/constants/spaces";
import { CustomImageBox } from "../controllers/CustomImage";
import { FONT_SMALL_TEXT } from "../../helpers/constants/fonts";

import noOptionImage from "../../assets/images/no-options.webp";

type TImageSize = "small" | "medium" | "large";
interface INoOptionComponent {
  label?: string;
  imageSize?: TImageSize;
  image?: string;
}

export const NoOptionComponent = memo<INoOptionComponent>(
  ({ label, imageSize, image }) => {
    return (
      <Grid
        className="no-option"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          pb: SPACE_MD,
          "& .wrapper-local-image-box": {
            width: "auto",
            height: "auto",
          },
        }}
      >
        <CustomImageBox
          src={image ?? noOptionImage}
          width={
            imageSize == "small"
              ? "150px"
              : imageSize == "medium"
              ? "250px"
              : imageSize == "large"
              ? "300px"
              : "150px"
          }
          height={
            imageSize == "small"
              ? "150px"
              : imageSize == "medium"
              ? "250px"
              : imageSize == "large"
              ? "300px"
              : "150px"
          }
        />
        <Typography fontSize={FONT_SMALL_TEXT} fontWeight={"400"}>
          {label ?? "Table is empty"}
        </Typography>
      </Grid>
    );
  }
);
