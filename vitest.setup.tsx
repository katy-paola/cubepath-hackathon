import type { ImgHTMLAttributes } from "react";
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

vi.mock("next/image", () => ({
  default: function MockImage(props: Record<string, unknown>) {
    const { src, alt, ...rest } = props;
    const imgProps = { ...rest } as Record<string, unknown>;
    delete imgProps.fill;
    delete imgProps.priority;
    delete imgProps.sizes;
    const srcStr = typeof src === "string" ? src : "";
    return (
      // next/image is mocked as a plain img for Vitest (see eslint comment below).
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={srcStr}
        alt={typeof alt === "string" ? alt : ""}
        {...(imgProps as ImgHTMLAttributes<HTMLImageElement>)}
      />
    );
  },
}));

vi.mock("next/font/google", () => ({
  Lexend: () => ({ className: "__font_lexend__" }),
  Fugaz_One: () => ({ className: "__font_fugaz__" }),
}));
