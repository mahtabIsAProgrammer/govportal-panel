import {
  map,
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
  COLOR_PRIMARY,
  COLOR_SECONDRY,
} from "../../helpers/constants/colors";
import {
  SPACE_LG,
  SPACE_MD,
  SPACE_SM,
  SPACE_XL,
} from "../../helpers/constants/spaces";
import { CustomLabel } from "../controllers/CustomLabel";
import { errorAlert } from "../../helpers/utils/messages";
import { BASE_URL } from "../../helpers/constants/statics";
import { ErrorMessage } from "../controllers/CustomTextfield";
import { MainContext } from "../../helpers/others/mainContext";
import { FONT_SMALL_TEXT } from "../../helpers/constants/fonts";
import { guidGenerator, stringSepratorToArry } from "../../helpers/utils/array";

import imageUploader from "../../assets/images/image.webp";

const UploadType: TFileUploaderTypes = {
  audio: "",
  file: "",
  image: imageUploader,
  video: "",
};

export const FileUploader = memo<IFileUploader>(
  ({
    type,
    customLabel,
    defaultFile,
    // deletable,
    disabled,
    // downloadable,
    errorMessage,
    filesState,
    helperText,
    required,
    thumbnailsState,
  }) => {
    const { changeLoadingUploader, isLoadingUploader } =
      useContext(MainContext);

    const [files, setFiles] = useState<IFileProps[] | undefined>(undefined);
    const [progress, setProgress] = useState<{ [key: string]: number }>({});

    const finalType: TFileUploaderType = type || "image";
    const placeholderImage = UploadType[finalType];

    // const nameSplitter = stringSepratorToArry(
    //   (files || [])?.[0]?.file?.name || "",
    //   "."
    // );

    const { getRootProps, getInputProps } = useDropzone({
      accept: checkAcceptDropZoneFormat[finalType],
      onDrop: async (acceptedFiles) => {
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
      },
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
              const data = await UploadFileNormal(file as File, {});
              if (!data) throw "Path is null";
              setProgress({ ...progress, [id as TAny]: 100 });
              setFiles((prev) => {
                const tmp = [...(prev ?? [])];
                const index = tmp.findIndex(({ id: cId }) => id == cId);

                tmp[index] = {
                  ...tmp[index],
                  path: data,
                  thumbPath: data,
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
      [files, progress]
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
      <Grid
        className="uploader-container"
        sx={uploaderNewSX(isLoadingUploader)}
      >
        <Grid className="custom-label-container">
          <CustomLabel
            customLabel={customLabel}
            disabled={disabled}
            required={required}
          />
        </Grid>
        {disabled || (
          <>
            {
              <>
                <Grid className="wrapper-uploader-box">
                  <Grid container {...getRootProps()} className="uploader-box">
                    <input
                      {...getInputProps()}
                      accept={checkAcceptDropZoneFormat[finalType]}
                    />
                    {
                      <>
                        <Box
                          component="img"
                          alt="uploader"
                          style={{
                            width: "auto",
                            height: "120px",
                          }}
                          src={
                            files?.[0]?.path
                              ? BASE_URL + files?.[0]?.path
                              : placeholderImage
                          }
                        />
                        <Typography className="click-here-text">
                          {files?.[0]?.path
                            ? "Change Photo"
                            : "To upload Click Here"}
                        </Typography>
                      </>
                    }
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
            }
          </>
        )}
      </Grid>
    );
  }
);

const uploaderNewSX = (isLoadingUploader?: boolean): SxProps<Theme> => ({
  p: "20px",
  background: COLOR_WHITE,
  borderRadius: "14px",
  boxShadow: `-20px 20px 40px -4px ${"#A3A3A3"}30, 0px 0px 2px 0px ${"#A3A3A3"}30`,
  "& .title": {
    marginBottom: SPACE_MD,
    color: COLOR_SECONDRY,
    fontSize: FONT_SMALL_TEXT,
    fontWeight: "600",
  },
  "& .wrapper-uploader-box": {
    p: SPACE_SM,
    cursor: isLoadingUploader ? "not-allowed" : "pointer",
    borderRadius: "14px",
    background: "#F7F9FA",
    border: "1px dashed " + "#B2B2B2",
    height: "220px",
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",

    "& .uploader-box": {
      my: "20px",
      gap: "20px",
      display: "flex",
      textAlign: "center",
      alignItems: "center",
      alignContent: "center",
      flexDirection: "column",
      justifyContent: "center",
      "& .click-here-text": {
        color: "#B2B2B2",
        lineHeight: SPACE_LG,
        fontSize: FONT_SMALL_TEXT,
        fontWeight: "400",
      },
      "& .select-file-text": {
        color: COLOR_PRIMARY,
        fontSize: "12px",
        fontWeight: "600",
      },
      "& .image-avatar": {
        "& .file-upload-loading-image": {
          width: "100px",
          height: "30px",
          "& img": {
            width: "100px",
            height: "40px",
          },
        },
      },
      "& .file-upload-label-loading ": {
        mt: SPACE_XL,
        color: COLOR_PRIMARY,
        fontSize: "12px",
        fontWeight: "600",
      },
    },
  },
  "& .uploader-box": {
    // my: "20px",
    gap: "20px",
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "column",
    justifyContent: "center",

    "& .click-here-text": {
      color: "#B2B2B2",
      lineHeight: SPACE_LG,
      fontSize: FONT_SMALL_TEXT,
      fontWeight: "400",
    },
  },
  "& .custom-label-container": {
    display: "flex",
    alignItems: "unset",
  },
});
