import {
  guidGenerator,
  arrayToStringHnadler,
  stringSepratorToArry,
} from "./array";
import { errorHookHandler } from "./handlers";
import { BASE_URL } from "../constants/statics";
import { errorAlert, successAlert } from "./messages";
import apiClient from "../../services/configs/apiClient";

export const checkImage = (file: File) => {
  const fileType = ["image/png", "image/jpeg", "image/webp"];
  if (file.size > 3000000) {
    errorAlert({ title: "Maximum File : 3MB" });
    return false;
  }
  if (file.name.length > 50) {
    errorAlert({ title: "Long File Name" });
    return false;
  }
  if (!fileType.includes(file.type)) {
    errorAlert({ title: "Correct Format: jpg | jpeg | png | webp" });
    return false;
  }
  return true;
};

export const checkVideo = (file: File) => {
  const fileType = ["video/mp4"];
  if (file.size > 1000000000) {
    errorAlert({ title: "Maximum File Size : 1GB" });
    return false;
  }
  if (file.name.length > 50) {
    errorAlert({ title: "Long File Name" });
    return false;
  }
  if (!fileType.includes(file.type)) {
    errorAlert({ title: "Correct Format: mp4" });
    return false;
  }
  return true;
};

export const checkAudio = (file: File) => {
  const fileType = ["audio/mpeg"];
  if (file.size > 30000000) {
    errorAlert({ title: "Maximum File Size : 30MB" });
    return false;
  }
  if (file.name.length > 50) {
    errorAlert({ title: "Long File Name" });
    return false;
  }
  if (!fileType.includes(file.type)) {
    errorAlert({ title: "Correct Format: mp3" });
    return false;
  }
  return true;
};

export const checkFile = (file: File) => {
  if (file.size > 1500000000) {
    errorAlert({ title: "Maximum File Size : 1.5GB" });
    return false;
  }
  if (file.name.length > 50) {
    errorAlert({ title: "Long File Name" });
    return false;
  }
};

export const hasPreviewFileType = ["image/png", "image/jpeg", "image/webp"];

export const uploaderIcons: TUploaderIcons = {
  gif: "",
  jpeg: "",
  jpg: "",
  mp3: "",
  mp4: "",
  pdf: "",
  png: "",
  txt: "",
  unknown: "",
  webp: "",
};

export const acceptFormat: TFileUploaderTypeAccept = {
  file: [],
  video: [".mp4"],
  audio: [".mp3"],
  image: [".jpg", ".jpeg", ".png", ".webp"],
};

export const checkAcceptDropZoneFormat: TFileUploaderTypes = {
  file: acceptFormat["file"],
  audio: { "audio/*": acceptFormat["audio"] },
  image: { "image/*": acceptFormat["image"] },
  video: { "vidoe/mp4": acceptFormat["video"] },
};

export const checkFileTypesFunctions: TFileUploaderTypes = {
  file: checkFile,
  audio: checkAudio,
  image: checkImage,
  video: checkVideo,
};

export const UploadFileNormal = async (
  file: File,
  options: {
    folderName?: string;
    showErrorMessege?: boolean;
    showSuccessMessege?: boolean;
  } = { folderName: "app", showErrorMessege: true, showSuccessMessege: false }
) => {
  const { folderName, showErrorMessege, showSuccessMessege } = options;

  let url = null;
  const data = new FormData();
  data.append("image", file);

  try {
    const res = await apiClient.post(
      `fileUploader?folder=${folderName}`,
      data,
      {
        headers: { "content-type": "multipart/form-data" },
      }
    );

    if (res.status !== 200) throw `Status : ${res.status}`;

    url = res.data.data;
    if (showSuccessMessege) successAlert({ title: "Uploaded" });
  } catch (error) {
    console.info("Catch Error", error);
    if (showErrorMessege) errorHookHandler({ error: `${error}` });
  }
  return url;
};

export const normalizePathToUploadFileObject = (
  paths: string[]
): IFileProps[] =>
  paths.map((item) => {
    const { search, pathname } = new URL(BASE_URL + item);
    const nameSplitter = stringSepratorToArry(pathname, ".");
    const hasPreview = hasPreviewFileType.includes(
      "image/" +
        nameSplitter[nameSplitter.length - 1]?.toString()?.toLowerCase()
    );
    const searchParams = new URLSearchParams(
      search.substring(search.indexOf("?"))
    );
    const name = searchParams.get("fname");
    const thumbPathName = [...nameSplitter];
    thumbPathName[thumbPathName.length - 1] = "180";
    thumbPathName[thumbPathName.length] = nameSplitter[nameSplitter.length - 1];
    const thumbPath = arrayToStringHnadler(thumbPathName, ".");
    return {
      id: guidGenerator(),
      preview: hasPreview
        ? BASE_URL + item
        : uploaderIcons[
            nameSplitter[nameSplitter.length - 1]
              ?.toString()
              ?.toLowerCase() as TUpladerIcon
          ] ?? uploaderIcons["unknown"],
      file: { name } as File,
      hasPreview: hasPreview as boolean,
      path: item,
      thumbPath,
    };
  }) as IFileProps[];
