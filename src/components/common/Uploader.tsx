import {
  map,
  last,
  some,
  filter,
  isEqual,
  toLower,
  toString,
  isFunction,
} from "lodash";
import { useDropzone } from "react-dropzone";
import { memo, useCallback, useContext, useEffect, useState } from "react";
import { Box, Grid, Typography, type SxProps, type Theme } from "@mui/material";

import {
  uploaderIcons,
  UploadFileNormal,
  hasPreviewFileType,
  checkFileTypesFunctions,
  checkAcceptDropZoneFormat,
  normalizePathToUploadFileObject,
} from "../../helpers/utils/files";
import {
  COLOR_WHITE,
  COLOR_GREEN,
  COLOR_SECONDRY,
  COLOR_MUTED_TEXT,
} from "../../helpers/constants/colors";
import { CustomLabel } from "../controllers/CustomLabel";
import { BASE_URL } from "../../helpers/constants/statics";
import { CustomButton } from "../controllers/CustomButton";
import { errorAlert } from "../../helpers/utils/messages";
import { ErrorMessage } from "../controllers/CustomTextfield";
import { MainContext } from "../../helpers/others/mainContext";
import { CustomLinearProgress } from "../controllers/CustomProgress";
import { clearICON, downloadICON, trashICON } from "../other/FunctionalSVG";
import { SPACE_MD, SPACE_SM, SPACE_XS } from "../../helpers/constants/spaces";
import { CustomIconButton, CustomImageBox } from "../controllers/CustomImage";
import { FONT_BODY, FONT_HEADING_SMALL } from "../../helpers/constants/fonts";
import { guidGenerator, stringSepratorToArry } from "../../helpers/utils/array";

const UploadType: TFileUploaderTypes = {
  audio: "",
  file: "",
  image: "",
  video: "",
};

export const FileUploader = memo<IFileUploader>(
  ({
    customLabel,
    defaultFile,
    deletable,
    disabled,
    downloadable,
    errorMessage,
    filesState,
    helperText,
    multiple,
    required,
    setting,
    thumbnailsState,
    type,
  }) => {
    const { folderName } = setting ?? {};

    const { changeLoadingUploader, isLoadingUploader } =
      useContext(MainContext);

    const [files, setFiles] = useState<IFileProps[] | undefined>(undefined);
    const [progress, setProgress] = useState<{ [key: string]: number }>({});

    const finalType: TFileUploaderType = type || "file";
    const placeholderImage = UploadType[finalType];

    const nameSplitter = stringSepratorToArry(
      (files || [])?.[0]?.file?.name || "",
      "."
    );

    const { getRootProps, getInputProps } = useDropzone({
      accept: checkAcceptDropZoneFormat[finalType],
      onDrop: async (acceptedFiles) => {
        if (multiple) {
          setFiles([
            ...(files ?? []),
            ...(map(acceptedFiles, (file) => {
              if (checkFileTypesFunctions[finalType](file)) {
                const hasPreview = hasPreviewFileType.includes(file.type);
                const nameSplitter = stringSepratorToArry(file.name, ".");
                return {
                  id: guidGenerator(),
                  file,
                  hasPreview,
                  filePath: URL.createObjectURL(file),
                  preview: hasPreview
                    ? URL.createObjectURL(file)
                    : uploaderIcons[
                        toLower(toString(last(nameSplitter))) as TUpladerIcon
                      ] ?? uploaderIcons["unknown"],
                };
              }
              return undefined;
            }).filter((a) => a) as IFileProps[]),
          ]);
        } else {
          const file = acceptedFiles[0];
          if (checkFileTypesFunctions[finalType](file)) {
            const hasPreview = hasPreviewFileType.includes(file.type);
            const nameSplitter = stringSepratorToArry(file.name, ".");
            const value = {
              id: guidGenerator(),
              file,
              hasPreview,
              isSingle: true,
              filePath: URL.createObjectURL(file),
              preview: hasPreview
                ? URL.createObjectURL(file)
                : uploaderIcons[
                    toLower(
                      toString([nameSplitter[nameSplitter.length - 1]])
                    ) as TUpladerIcon
                  ] ?? uploaderIcons["unknown"],
            };
            setFiles([value]);
            handleUploadCurrentTime(value);
          }
        }
      },
      multiple,
      disabled: isLoadingUploader,
    });

    const handleUploadCurrentTime = useCallback(
      async (content: IFileProps) => {
        const errorHandler = (id: string, error: TAny) => {
          errorAlert({ title: error });
          setFiles([...(files ?? [])].filter(({ id: dId }) => dId !== id));
        };
        if (content) {
          const { id, file } = content;

          if (file) {
            try {
              setProgress({ ...progress, [id as TAny]: 20 });
              const { path, thumbPath } = await UploadFileNormal(file as File, {
                folderName,
              });
              if (!path) throw "Path is null";
              setProgress({ ...progress, [id as TAny]: 100 });
              setFiles((prev) => {
                const tmp = [...(prev ?? [])];
                const index = tmp.findIndex(({ id: cId }) => id == cId);

                tmp[index] = {
                  ...tmp[index],
                  path,
                  thumbPath,
                  isUploading: false,
                };
                return tmp;
              });
            } catch (e) {
              errorHandler(id, e);
            }
          }
        }
      },
      [files, folderName, progress]
    );

    const handlerAbortUploads = useCallback(async () => {
      const tmpIndex = (files || []).findIndex(
        ({ path, isUploading, isAborted }) => path && !isUploading && !isAborted
      );
      if (tmpIndex != -1) {
        await setFiles((prev) => {
          const tmp = [...(prev ?? [])];
          tmp[tmpIndex] = {
            ...tmp[tmpIndex],
            isAborted: true,
          };
          return tmp;
        });
        if (isFunction((files || [])[tmpIndex]?.uploadObject?.abort)) {
          (files || [])[tmpIndex]?.uploadObject.abort();
        }
      }
    }, [files]);

    useEffect(() => {
      if (filesState) {
        const data = filter(
          map(files ?? [], ({ path }) => path),
          (i) => i
        ) as string[];

        if (!isEqual(defaultFile, data)) filesState(data);
      }
      if (finalType == "image" && thumbnailsState) {
        const data = (files ?? [])
          .map(({ thumbPath }) => thumbPath)
          .filter((i) => i) as string[];

        thumbnailsState(data);
        return () =>
          (files ?? []).forEach(({ preview }: IFileProps) =>
            URL.revokeObjectURL(preview)
          );
      }
    }, [defaultFile, files, filesState, finalType, thumbnailsState]);

    useEffect(() => {
      if (defaultFile && !files) {
        const data = normalizePathToUploadFileObject(defaultFile || []);
        setFiles(data);
      }
    }, [defaultFile, files]);

    useEffect(() => {
      if (files && some(files, ({ path, isAborted }) => path && !isAborted))
        handlerAbortUploads();
    }, [files, handlerAbortUploads]);

    useEffect(() => {
      if ((files || []).length > 0)
        changeLoadingUploader(
          some(files || [], ({ isUploading }) => isUploading)
        );
      else changeLoadingUploader(false);
    }, [changeLoadingUploader, files]);

    return (
      <Grid className="Uploader-container">
        <Grid className="custom-label-container">
          <CustomLabel
            customLabel={customLabel}
            disabled={disabled}
            required={required}
          />
        </Grid>
        {disabled || (
          <>
            {multiple && files?.[0]?.path ? (
              <Grid>
                {map(files, ({ path, id }, key) => (
                  <Grid key={key + id}>
                    {finalType == "image" && (
                      <>
                        <Box>
                          <Box>
                            <CustomButton text={"Change Image"} />
                            <CustomIconButton
                              src={trashICON()}
                              onClick={(e) => {
                                e.stopPropagation();
                                return (
                                  setFiles &&
                                  setFiles(
                                    filter(
                                      [...(files ?? [])],
                                      ({ id: dId }) => {
                                        return dId != id;
                                      }
                                    )
                                  )
                                );
                              }}
                            />
                          </Box>
                        </Box>
                      </>
                    )}
                    {finalType == "video" && (
                      <>
                        <video
                          controls
                          style={{ width: "100%", height: "100%" }}
                        >
                          <source src={BASE_URL + path} type="video/mp4" />
                        </video>
                      </>
                    )}
                    {finalType == "audio" && (
                      <>
                        <audio
                          controls
                          style={{ width: "100%", height: "100%" }}
                        >
                          <source src={BASE_URL + path} type="audio/mp3" />
                        </audio>
                      </>
                    )}
                    {finalType == "file" && (
                      <>
                        <Box
                          component="img"
                          src={
                            uploaderIcons[
                              toLower(
                                toString(nameSplitter[nameSplitter.length - 1])
                              ) as TUpladerIcon
                            ] ?? uploaderIcons["unknown"]
                          }
                        />
                      </>
                    )}
                  </Grid>
                ))}
              </Grid>
            ) : (
              <>
                <Grid>
                  <Grid container {...getRootProps()}>
                    <input
                      {...getInputProps()}
                      accept={checkAcceptDropZoneFormat[finalType]}
                    />
                    {!multiple && type == "image" && isLoadingUploader ? (
                      <>
                        <CustomImageBox src={""} />
                        <Typography>Loading</Typography>
                      </>
                    ) : (
                      <>
                        <CustomImageBox src={placeholderImage} />
                        <Typography>{type || "" + "selected"}</Typography>
                      </>
                    )}
                  </Grid>
                </Grid>
                {errorMessage && (
                  <ErrorMessage
                    disabled={disabled}
                    text={errorMessage?.text}
                    type={errorMessage?.type}
                  />
                )}
                {errorMessage
                  ? undefined
                  : helperText && (
                      <ErrorMessage text={helperText} type={"helperText"} />
                    )}
              </>
            )}
          </>
        )}

        <UploaderFileView
          downloadable={downloadable}
          multiple={multiple}
          files={files}
          deletable={deletable}
          setFiles={setFiles}
          progress={progress}
        />
      </Grid>
    );
  }
);

export const UploaderFileView = memo<{
  downloadable?: IFileUploader["downloadable"];
  largeImage?: boolean;
  multiple?: IFileUploader["multiple"];
  files?: IFileProps[] | undefined;
  deletable?: IFileUploader["deletable"];
  setFiles?: (value: IFileProps[] | undefined) => void;
  progress?: {
    [key: string]: number;
  };
}>(
  ({
    files,
    multiple,
    progress,
    setFiles,
    largeImage,
    downloadable,
    deletable,
  }) => {
    const thumbsUploaded = (files || []).map(
      ({ id, preview, file, hasPreview, path, uploadObject }: IFileProps) => {
        const hasLargeImage = largeImage && hasPreview;
        return (
          <>
            <Grid
              size={{ xs: 12 }}
              className={hasPreview ? "" : "icons"}
              sx={uploaderFileViewSX(
                multiple || false,
                Boolean(path),
                hasLargeImage
              )}
              key={id}
              onClick={() => window.open(BASE_URL + path, "__blank")}
            >
              <Box component="div" className="box-upload">
                <CustomImageBox
                  src={hasPreview && path ? BASE_URL + path : preview}
                  className={"image-preview " + (hasPreview ? "" : "icons")}
                  title={(file ?? { name: "" }).name}
                />
              </Box>
              <Grid className="text-box">
                <Typography className="name-file">
                  {(file ?? { name: "" })?.name?.length &&
                  (file ?? { name: "" })?.name?.length > 10
                    ? (file ?? { name: "" }).name.slice(0, 10) + "..."
                    : (file ?? { name: "" })?.name || ""}
                </Typography>
                <Typography className="size-file">
                  {file && file.size
                    ? Math.round(file.size / 1024) + " KB "
                    : ""}
                </Typography>
                {path ? (
                  <></>
                ) : (
                  <Grid className="wrapper-loading">
                    {progress && progress[id !== undefined ? id : ""] ? (
                      <CustomLinearProgress
                        variant="buffer"
                        value={progress && progress[id !== undefined ? id : ""]}
                        valueBuffer={
                          progress && progress[id !== undefined ? id : ""]
                        }
                        counter={
                          progress && progress[id !== undefined ? id : ""]
                        }
                      />
                    ) : (
                      <></>
                    )}
                  </Grid>
                )}
              </Grid>
              <Grid className="button-cancel">
                {path ? (
                  <>
                    {deletable ? (
                      ""
                    ) : (
                      <CustomIconButton
                        className="x-preview"
                        onClick={(e) => (
                          e.stopPropagation(),
                          setFiles &&
                            setFiles(
                              [...(files ?? [])].filter(({ id: dId }) => {
                                return dId != id;
                              })
                            )
                        )}
                        src={trashICON()}
                      />
                    )}
                  </>
                ) : (
                  <CustomIconButton
                    className="x-preview"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isFunction(uploadObject?.abort)) {
                        uploadObject.abort();
                      }
                      return (
                        setFiles &&
                        setFiles(
                          [...(files ?? [])].filter(({ id: dId }) => dId != id)
                        )
                      );
                    }}
                    src={clearICON(COLOR_WHITE)}
                  />
                )}
              </Grid>
            </Grid>
          </>
        );
      }
    );

    return (
      <>
        <Grid container className="file-card">
          {multiple ? thumbsUploaded : undefined}
        </Grid>
        {downloadable && (
          <Grid>
            <CustomButton
              type="button"
              text={"download"}
              variant="text"
              color="secondary"
              sx={{
                width: "100%",
                backgroundColor: "#00AB55",
                color: COLOR_WHITE,
                mt: SPACE_MD,
                "&:hover": {
                  backgroundColor: "#019249",
                },
              }}
              startIcon={downloadICON(COLOR_WHITE)}
              onClick={() =>
                downloadImage(
                  BASE_URL + (files?.[0]?.path || ""),
                  "download." +
                    last(stringSepratorToArry(files?.[0]?.path || "", "."))
                )
              }
            />
          </Grid>
        )}
      </>
    );
  }
);

const downloadImage = async (url: string, fileName: string) => {
  window.open(url + "?fName=" + fileName, "_blank");
};

const uploaderFileViewSX = (
  multiple: boolean,
  path: boolean,
  largeImage?: boolean
): SxProps<Theme> => ({
  // mt: SPACE_M,
  // px: SPACE_M,
  py: largeImage ? SPACE_SM : undefined,
  gap: largeImage ? "unset" : SPACE_SM,
  width: largeImage ? "auto" : "90px",
  height: largeImage ? "auto" : "90px",
  // marginTop: SPACE_M,
  position: "relative",
  alignItems: "center",
  // marginBottom: SPACE_M,
  alignContent: "center",
  display: "inline-flex",
  boxSizing: "border-box",
  // borderRadius: RADIUS_SMALL,
  cursor: "pointer",
  border: path
    ? `2px solid ${COLOR_GREEN} !important`
    : multiple
    ? `2px solid ${COLOR_SECONDRY}50`
    : "none",
  backgroundColor: path ? ` ${COLOR_GREEN}30` : "none",
  "& .button-cancel": {
    height: "100%",
    display: "flex",
    "& .x-preview": {
      // mt: SPACE_M,
      opacity: path ? 1 : "0.75",
      padding: path ? 0 : SPACE_XS,
      width: path ? "25px" : "22px !important",
      height: path ? "25px" : "22px !important",
      minWidth: path ? "25px" : "22px !important",
      // borderRadius: RADIUS_FULL,
      minHeight: path ? "25px" : "22px !important",
      border: path ? "none !important" : "1px solid !important",
      color: path ? COLOR_GREEN : COLOR_WHITE + " !important",
      background: path ? "none !important" : `${COLOR_MUTED_TEXT} !important`,
      borderColor: path ? "none !important" : COLOR_WHITE + " !important",
      fontSize: path ? FONT_HEADING_SMALL : FONT_BODY + " !important",
      fontWeight: "900 !important",
      "&:hover": {
        opacity: 0.4,
        transform: "scale(110%)",
      },
    },
  },
  ".box-upload": {
    display: "flex",
    // borderRadius: RADIUS_SMALL,
    " .image-preview": {
      width: largeImage ? "100%" : "70px",
      height: largeImage ? "auto" : "70px",
      minHeight: largeImage ? "200px" : undefined,
      maxHeight: largeImage ? "500px" : undefined,
      display: "block",
      objectFit: "cover",
      // borderRadius: RADIUS_SMALL,
      boxShadow: ` 0px 0px 10px -5px ${COLOR_SECONDRY}`,
    },
  },
  "& .text-box": {
    width: "100%",
    display: largeImage ? "none" : "block",
    "& .name-file": {
      // fontWeight: FONT_WEIGHT_EXTRA_BOLD,
    },
    "& .size-file": {
      // mt: SPACE_M,
      // color: COLOR_SECONDARY,
      // fontSize: FONT_LABEL_SMALL,
    },
  },
  "&.icons": {
    background: path ? `${COLOR_GREEN}40` : COLOR_MUTED_TEXT,
  },
});
