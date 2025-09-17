import {
  useRef,
  type JSX,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import {
  Box,
  Grid,
  Skeleton,
  Typography,
  type Theme,
  type SxProps,
} from "@mui/material";
import Cropper from "react-easy-crop";

import {
  COLOR_WHITE,
  COLOR_BORDER,
  COLOR_PRIMARY,
  COLOR_SECONDRY,
  COLOR_BACKGROUND,
} from "../../helpers/constants/colors";
import { CustomLabel } from "../controllers/CustomLabel";
import { CustomDialog } from "../controllers/CustomDialog";
import { CustomButton } from "../controllers/CustomButton";
import { ErrorMessage } from "../controllers/CustomTextfield";
import { MainContext } from "../../helpers/others/mainContext";
import { cameraICON, trashICON } from "../other/FunctionalSVG";
import { SPACE_MD, SPACE_XL } from "../../helpers/constants/spaces";
import { FONT_BODY, FONT_CAPTION } from "../../helpers/constants/fonts";
import { CustomIcon, CustomImageBox } from "../controllers/CustomImage";
import { checkImage, UploadFileNormal } from "../../helpers/utils/files";
import { getCroppedImg, urlImageHandler } from "../../helpers/utils/images";

import rollingIcon from "../../assets/images/Rolling.gif";
import emptyImage from "../../assets/images/emptyImage.webp";
import emptyUserImage from "../../assets/images/emptyUserImage.webp";

export const ProfileUploader = ({
  tooltip,
  required,
  variant,
  filesState,
  helperText,
  customLabel,
  errorMessage,
  defaultValue,
  thumbnailsState,
}: IProfileUploader) => {
  const ref = useRef(null);
  const { changeLoadingUploader } = useContext(MainContext);

  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 2, y: 2 });
  const [show, setShow] = useState<boolean>(false);
  const [croppedArea, setCroppedArea] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [defaultUsed, setDefaultUsed] = useState<boolean>(false);
  const [tmpFile, setTmpFile] = useState<HTMLImageElement | undefined>();
  const [files, setFiles] = useState<
    { path: string; thumbPath: string } | undefined
  >(undefined);

  const handlerUpload = useCallback(async (file: File | undefined) => {
    setLoading(true);
    setFiles(undefined);
    if (ref.current) (ref.current as { value: string }).value = "";
    if (file) {
      try {
        const { path, thumbPath } = await UploadFileNormal(file as File, {});
        if (!path) throw "path is null";
        setFiles({ path, thumbPath });
      } catch (e) {
        console.info(e);
      }
    } else {
      setFiles(undefined);
      if (ref.current) (ref.current as { value: string }).value = "";
    }
    setLoading(false);
  }, []);

  const onCropComplete = useCallback((_: TAny, croppedAreaPixels: TAny) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(tmpFile, croppedArea);

      handlerUpload(new File([croppedImage as BlobPart], "image.png"));
      setTmpFile(undefined);
    } catch (error) {
      console.info("Catch because:", error);
    }
  }, [croppedArea, handlerUpload, tmpFile]);

  const handleFileChange = useCallback((file: File) => {
    const reader = new FileReader();
    const img = new Image();
    reader.addEventListener("load", () => {
      img.src = reader.result as string;
      setTmpFile(img);
    });
    reader.readAsDataURL(file);
  }, []);

  const resetValue = useCallback(() => {
    setFiles(undefined);
    filesState && filesState("", resetValue);
    if (ref.current) (ref.current as { value: string }).value = "";
  }, [filesState]);

  const uploaderSX = useCallback(
    (): SxProps<Theme> => ({
      background: COLOR_WHITE,
      p: SPACE_XL,
      borderRadius: "14px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: SPACE_MD,

      border: "1px solid" + COLOR_BORDER,
      "& .title": {
        color: COLOR_SECONDRY,
        marginBottom: SPACE_MD,
        fontSize: FONT_BODY,
        fontWeight: "700",
      },
      "& .wrapper-file-uploader": {
        pb: "52px",
        px: "12px",
        pt: "12px",
        width: "100%",
        height: "170px",
        display: "flex",
        position: "relative",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "flex-end",
        border: "1px solid" + COLOR_BORDER,
        backgroundColor: COLOR_BACKGROUND + "!important",
        borderRadius: variant == "rounded" ? "14px" : "50%",
        animation: "fadeIn 0.3s",
        "&:hover": {
          "& .trash-box": {
            zIndex: "10000",
            display: "flex",
          },
          "& .img-back-uploader": {
            transition: "filter 0.3s ease-out",
            filter: files ? "blur(1px) brightness(0.7)" : undefined,
          },
        },
        "& .trash-box": {
          top: "0",
          width: "100%",
          height: "100%",
          display: "none",
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "14px",
          cursor: "pointer",
          "& img": {
            width: "16px",
            height: "16px",
            filter: "(0)",
          },
        },
      },
      "& .file-upload-input": {
        display: "none",
      },
      "& .file-upload-handler": {
        "& .continuer-uploader": {
          gap: "10px",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          cursor: loading ? "" : "pointer",
          borderRadius: variant == "rounded" ? "14px" : "50%",
          "& .file-upload-shadow": {
            top: "0",
            zIndex: "10",
            width: "100%",
            height: "100%",
            opacity: "0.02",
            position: "absolute",
            backgroundColor: "#000",
            borderRadius: variant == "rounded" ? "14px" : "50%",
          },
          "& .image-avatar": {
            width: "100%",
            "& .LocalAvatar": {
              width: "100%",
              "& img": {
                width: "100px",
                height: "40px",
              },
            },
          },
          "& .file-upload-label-loading ": {
            mt: SPACE_XL,
            color: COLOR_PRIMARY,
            fontSize: FONT_CAPTION,
            fontWeight: "500",
          },
        },
      },
      "& .img-back-uploader": {
        right: "0",
        width: "100%",
        top: files ? "0" : "52px",
        height: files ? "100%" : "fit-content",
        position: "absolute",
        backgroundSize: "cover",
        borderRadius: "14px",
        "& img": {
          width: files ? "100% !important" : "75px !important",
          height: files ? "100% !important" : "75px !important",
        },
      },

      "& .select-file-text": {
        color: COLOR_PRIMARY,
        fontSize: FONT_CAPTION,
        fontWeight: "500",
      },
    }),
    [files, loading, variant]
  );

  const imageManageTheme = useCallback(() => emptyImage, []);

  const rendered = useCallback(
    (): JSX.Element => (
      <Grid sx={uploaderSX()} className="profile-uploader-container">
        <CustomLabel
          customLabel={customLabel}
          // subTitleLabel={subTitleLabel}
          required={required}
          tooltip={tooltip}
        />
        <Grid
          className="wrapper-file-uploader"
          component="div"
          onMouseEnter={() => {
            setShow(true);
          }}
          onMouseLeave={() => {
            setShow(false);
          }}
        >
          {!loading && files && (
            <Box className={"trash-box"}>
              <CustomIcon
                src={trashICON()}
                className="trash-icon"
                onClick={resetValue}
              />
            </Box>
          )}
          <input
            accept={"image/*"}
            id="file_upload"
            className="file-upload-input"
            type="file"
            ref={ref}
            onChange={(e) => {
              return e.target.files?.[0]
                ? checkImage(e.target.files?.[0]) &&
                    handleFileChange(e.target.files?.[0])
                : setTmpFile(undefined);
            }}
          />
          <label
            htmlFor={loading ? "" : "file_upload"}
            className="file-upload-handler"
          >
            <Box className="continuer-uploader">
              {show && !loading && (
                <>
                  <CustomIcon src={cameraICON()} className="file-upload" />
                  <Typography className="file-upload-label">
                    uploader_text
                  </Typography>
                  <Box className="file-upload-shadow" />
                </>
              )}
              {loading && (
                <>
                  <CustomImageBox
                    isAvatar
                    src={rollingIcon}
                    className="file-upload"
                  />
                  <Typography className="file-upload-label-loading">
                    uploader_loading_text
                  </Typography>
                </>
              )}
            </Box>
          </label>
          {!files ? (
            loading ? (
              <Skeleton
                variant={variant ?? "circular"}
                className="img-back-uploader"
              />
            ) : (
              <>
                <CustomImageBox
                  isAvatar
                  className="img-back-uploader"
                  src={
                    variant == "circular"
                      ? imageManageTheme()
                      : variant == "rounded"
                      ? imageManageTheme()
                      : emptyUserImage
                  }
                  variant={variant ?? "circular"}
                />
              </>
            )
          ) : (
            <CustomImageBox
              isAvatar
              variant={variant ?? "circular"}
              className="img-back-uploader"
              src={urlImageHandler(files.path)}
            />
          )}
        </Grid>
        {errorMessage && (
          <ErrorMessage
            text={errorMessage?.text}
            type={errorMessage?.type}
            disabled={errorMessage?.disabled}
          />
        )}
        {errorMessage
          ? undefined
          : helperText && <ErrorMessage text={helperText} type="helperText" />}
        <CustomDialog
          size="medium"
          dialogTitle={{
            hasCloseIcon: true,
            closeIconHandler: (() => setTmpFile(undefined)) as TAny,
            titleText: "image_cropper",
          }}
          content={
            <Grid
              sx={{
                position: "relative",
                width: "100%",
                height: "calc(100vh - 400px)",
                minHeight: "300px",
                maxHeight: "600px",
              }}
            >
              <Cropper
                image={tmpFile?.src as string}
                crop={crop}
                zoom={zoom}
                aspect={1 / 1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </Grid>
          }
          dialogAction={
            <>
              <CustomButton
                onClick={showCroppedImage}
                text={"save"}
                variant="contained"
              />
            </>
          }
          open={tmpFile !== undefined}
        />
      </Grid>
    ),
    [
      crop,
      customLabel,
      errorMessage,
      files,
      handleFileChange,
      helperText,
      imageManageTheme,
      loading,
      onCropComplete,
      required,
      resetValue,
      show,
      showCroppedImage,
      tmpFile,
      tooltip,
      uploaderSX,
      variant,
      zoom,
    ]
  );

  useEffect(() => {
    if (!files && defaultValue && !defaultUsed) {
      setFiles({ path: defaultValue, thumbPath: "" });
      setDefaultUsed(true);
    }
  }, [defaultUsed, defaultValue, files]);

  useEffect(() => {
    files?.path && filesState && filesState(files.path, resetValue);
    files?.thumbPath && thumbnailsState && thumbnailsState(files.thumbPath);
  }, [files, filesState, resetValue, thumbnailsState]);

  useEffect(() => {
    if (loading) changeLoadingUploader(loading);
    else changeLoadingUploader(false);
  });

  return { rendered, resetValue };
};
