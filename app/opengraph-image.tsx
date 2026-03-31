import {
  ogImageAlt,
  ogImageContentType,
  ogImageSize,
  renderStridiaOgImage,
} from "@/lib/stridia-og-image";

export const alt = ogImageAlt;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return renderStridiaOgImage();
}
