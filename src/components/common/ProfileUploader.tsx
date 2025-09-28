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
  COLOR_RED,
  COLOR_WHITE,
  COLOR_BORDER,
  COLOR_BLACK,
} from "../../helpers/constants/colors";
import { CustomLabel } from "../controllers/CustomLabel";
import { CustomDialog } from "../controllers/CustomDialog";
import { CustomButton } from "../controllers/CustomButton";
import { ErrorMessage } from "../controllers/CustomTextfield";
import { MainContext } from "../../helpers/others/mainContext";
import { cameraICON, trashICON } from "../other/FunctionalSVG";
import { SPACE_MD, SPACE_XL } from "../../helpers/constants/spaces";
import { CustomIcon, CustomImageBox } from "../controllers/CustomImage";
import { checkImage, UploadFileNormal } from "../../helpers/utils/files";
import { getCroppedImg, urlImageHandler } from "../../helpers/utils/images";

import rollingIcon from "../../assets/images/Rolling.gif";
import emptyImage from "../../assets/images/empty-image.webp";
import emptyUserImage from "../../assets/images/empty-image-user.png";

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
        const data = await UploadFileNormal(file as File, {});
        if (!data) throw "Path is null";
        setFiles({ path: data, thumbPath: data });
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
    if (filesState) filesState("", resetValue);
    if (ref.current) (ref.current as { value: string }).value = "";
  }, [filesState]);

  const uploaderSX = useCallback(
    (): SxProps<Theme> => ({
      p: SPACE_XL,
      gap: SPACE_MD,
      display: "flex",
      flexDirection: "column",
      // background: COLOR_WHITE,
      border: "1px solid" + COLOR_BORDER,
      // boxShadow: `-20px 20px 40px -4px ${COLOR_GRAY_LIGHT}30, 0px 0px 2px 0px ${COLOR_GRAY_LIGHT}30`,

      "& .wrapper-file-uploader": {
        padding: "10px",
        position: "relative",
      },
      "& .file-upload-input": {
        display: "none",
      },
      "& .trash-box": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: COLOR_RED,
        width: "36px",
        height: "36px",
        position: "absolute",
        zIndex: "1000",
        top: variant == "rounded" ? undefined : "12px",
        right: variant == "rounded" ? undefined : "16px",
        border: `3px solid ${COLOR_WHITE}`,
        cursor: "pointer",
        "& svg": {
          width: "20px",
          height: "20px",
          filter: "(0)",
        },
      },
      "& .file-upload-handler": {
        "& .continuer-uploader": {
          cursor: loading ? "" : "pointer",
          width: "180px",
          height: "180px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",

          "&:hover": {
            "& .file-upload-shadow": { backgroundColor: "#2a2a2ade" },
          },

          "& .file-upload": {
            width: "35px !important",
            minWidth: "35px !important",
            maxWidth: "35px !important",
            height: "35px !important",
            minHeight: "35px !important",
            maxHeight: "35px !important",
            zIndex: "20",
            borderRadius: "0 !important",
          },
          "& .file-upload-label": {
            color: `${COLOR_WHITE} !important`,
            fontSize: "14px !important",
            zIndex: "20",
          },
          "& .file-upload-label-loading": {
            color: `${COLOR_BLACK} !important`,
            fontSize: "14px !important",
            zIndex: "20",
          },
          "& .file-upload-shadow": {
            zIndex: "10",
            opacity: "0.5",
            position: "absolute",
            backgroundColor: COLOR_BLACK,
            width: "180px",
            height: "180px",
          },
        },
      },
      "& .image-box-wrapper": {
        position: "absolute",
        backgroundSize: "cover",
        top: "11px",
        right: "14px",
      },
    }),
    [loading, variant]
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
                src={trashICON(COLOR_WHITE)}
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
                    Upload Photo
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
                className="image-box-wrapper"
              />
            ) : (
              <>
                <CustomImageBox
                  isAvatar
                  width="180px"
                  height="180px"
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
              width="180px"
              height="180px"
              variant={variant ?? "circular"}
              className="image-box-wrapper"
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
            titleText: "Photo cropping",
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
                customWidth="100%"
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
    if (files?.path && filesState) filesState(files.path, resetValue);
    if (files?.thumbPath && thumbnailsState) thumbnailsState(files.thumbPath);
  }, [files, filesState, resetValue, thumbnailsState]);

  useEffect(() => {
    if (loading) changeLoadingUploader(loading);
    else changeLoadingUploader(false);
  });

  return <>{rendered()}</>;
};
