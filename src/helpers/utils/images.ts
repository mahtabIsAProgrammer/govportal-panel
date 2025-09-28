import type { JSX } from "react";
import { isString } from "lodash";

import { BASE_URL } from "./../constants/statics";
import emptyImage from "../../assets/images/empty-image.webp";
import emptyUserImage from "../../assets/images/empty-image-user.png";

export const urlImageHandler = (
  url: string | null | JSX.Element | undefined,
  isUserImageEmpty?: boolean,
  customSourceImage?: string
): string => {
  const sourceImage = customSourceImage ? customSourceImage : BASE_URL;

  if (isString(url)) {
    if (url?.includes(sourceImage)) return url;
    if (url) return (customSourceImage ? customSourceImage : BASE_URL) + url;
  }

  return isUserImageEmpty ? emptyUserImage : emptyImage;
};

export const getCroppedImg = async (
  imageSrc: TAny,
  croppedAreaPixels: TAny
) => {
  const canvas = document.createElement("canvas");
  const scaleX = imageSrc.naturalWidth / imageSrc.width;
  const scaleY = imageSrc.naturalHeight / imageSrc.height;
  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;
  const ctx = canvas.getContext("2d");

  if (ctx)
    ctx.drawImage(
      imageSrc,
      croppedAreaPixels.x * scaleX,
      croppedAreaPixels.y * scaleY,
      croppedAreaPixels.width * scaleX,
      croppedAreaPixels.height * scaleY,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        console.info("Canvas is empty !!");
        return;
      }
      resolve(blob);
    }, "image/jpeg");
  });
};
