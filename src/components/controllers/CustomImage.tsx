import { assign } from "lodash";
import {
  memo,
  useRef,
  useCallback,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import {
  Box,
  Grid,
  Skeleton,
  IconButton,
  type Theme,
  type SxProps,
  type BoxProps,
} from "@mui/material";

import emptyImage from "../../assets/images/empty-image.webp";
import emptyImageUser from "../../assets/images/empty-image-user.webp";

interface ICustomImageBox extends BoxProps {
  sx?: SxProps<Theme>;
  src: string;
  width?: string;
  height?: string;
  isAvatar?: boolean;
  withOutPreview?: boolean;
  onClick?: (e: TAny) => void;
  variant?: "circular" | "rounded" | undefined;
}

interface ICustomIcon extends BoxProps {
  src: ReactNode;
  width?: number;
  height?: number;
  className?: string;
}

export const CustomImageBox = memo<ICustomImageBox>(
  ({ sx, src, variant, height, width, onClick, withOutPreview, isAvatar }) => {
    const ref = useRef(null);

    const handleImageLoad = useCallback(() => {
      if (ref.current) (ref.current as TAny).classList.add("non-opacity");
    }, []);

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
          onLoad={handleImageLoad}
          onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.src = isAvatar ? emptyImageUser : emptyImage;
            handleImageLoad();
          }}
          onClick={(e: SyntheticEvent<HTMLImageElement, Event>) => {
            const srcImage = (e.target as unknown as { src: string }).src;
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            onClick && onClick(e);
            if (!srcImage.includes("assets") && !withOutPreview)
              window.open(srcImage, "__blank");
          }}
          sx={assign(customImageBoxSX(variant), sx || {})}
        />
        <Box
          component="div"
          className={"skeleton-local-image "}
          // sx={localImageBoxSX( variant)}
          ref={ref}
        >
          <Skeleton
            variant={variant == "circular" ? "circular" : "rounded"}
            width="100%"
            height="100%"
          />
        </Box>
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
  variant: ICustomImageBox["variant"]
): SxProps<Theme> => ({
  borderRadius: "8px",
  "& .image-box,": {
    opacity: 1,
    width: "100% !important",
    height: "100% !important",
    transition: "0.2s all ",
    borderRadius:
      variant == "circular" ? "50%" : variant == "rounded" ? "8px" : undefined,
  },
});
