import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Convención Next: opengraph-image / twitter-image (1200×630). */
export const ogImageSize = {
  width: 1200,
  height: 630,
} as const;

export const ogImageContentType = "image/png";

export const ogImageAlt = "Stridia — icono de running";

/**
 * PNG generado con el mismo SVG que `app/icon.svg` (data URL), patrón de la doc de Next.js.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
 */
export async function renderStridiaOgImage() {
  const svgPath = join(process.cwd(), "app", "icon.svg");
  const svg = await readFile(svgPath);
  const src = `data:image/svg+xml;base64,${svg.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(145deg, #141822 0%, #0c0f14 50%, #1a2233 100%)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse/satori; doc Next usa <img> con asset local */}
      <img
        alt=""
        src={src}
        width={280}
        height={312}
        style={{ objectFit: "contain" }}
      />
    </div>,
    {
      ...ogImageSize,
    },
  );
}
