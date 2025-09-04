import { assign } from "lodash";
import { memo, type ReactNode } from "react";
import { Box, Grid, type Theme, type SxProps, IconButton } from "@mui/material";

// import emptyImage from "../../assets/images/empty-image.webp";
// import emptyImageUser from "../../assets/images/empty-image-user.webp";

interface ICustomImageBox {
  sx?: SxProps<Theme>;
  src: string;
  width?: string;
  height?: string;
  hasBorder?: boolean;
  withOutPreview?: boolean;
  onClick?: (e: TAny) => void;
  variant?: "circular" | "rounded" | undefined;
}

interface ICustomIcon {
  src: ReactNode;
  width?: number;
  height?: number;
  className?: string;
}

export const CustomImageBox = memo<ICustomImageBox>(
  ({ sx, src, variant, hasBorder, height, width }) => {
    return (
      <Grid
        sx={{
          width: width || "50px",
          height: height || "50px",
        }}
      >
        <Box
          src={src}
          component="img"
          className="image-box"
          sx={assign(customImageBoxSX(hasBorder || false, variant), sx || {})}
        />
      </Grid>
    );
  }
);

export const CustomIcon = ({ src, className, height, width }: ICustomIcon) => {
  return (
    <Box
      component="div"
      className={className}
      sx={{
        width: width + "px" || "24px",
        height: height + "px" || "24px",
        "& svg": {
          width: width + "px" || "24px",
          height: height + "px" || "24px",
        },
      }}
    >
      {src}
    </Box>
  );
};

export const CustomIconButton = ({
  src,
  width,
  height,
  className,
}: ICustomIcon) => {
  return (
    <IconButton
      sx={{
        p: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: (width ?? 0) + 12 || "36px",
        height: (height ?? 0) + 12 || "36px",
      }}
      className={className}
    >
      <CustomIcon src={src} width={width} height={height} />
    </IconButton>
  );
};

const customImageBoxSX = (
  hasBorder: ICustomImageBox["hasBorder"],
  variant: ICustomImageBox["variant"]
): SxProps<Theme> => ({
  borderRadius: "8px",
  "& .image-box,": {
    opacity: 1,
    width: "100% !important",
    height: "100% !important",
    transition: "0.2s all ",
    border: hasBorder ? `4px solid #EBF2FF` : "unset",
    borderRadius:
      variant == "circular" ? "50%" : variant == "rounded" ? "8px" : undefined,
  },
});
