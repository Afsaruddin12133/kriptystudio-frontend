import NextImage, { type ImageProps } from "next/image";
import type { CSSProperties } from "react";

/**
 * next/image whose default size is in rem instead of CSS pixels.
 *
 * The page scales with the screen on very wide viewports (the root font size grows, see globals.css), so an image
 * that kept its `width`/`height` attributes as plain pixels would stay small while everything around it grows.
 * The size is handed to CSS as variables and applied by `img[data-rem]` in globals.css, at a low priority:
 * any width/height class on the image still wins, exactly as before.
 */
export default function Image({ style, ...props }: ImageProps) {
  const { width, height, fill } = props;
  const scaled = !fill && typeof width === "number" && typeof height === "number";
  const merged = scaled ? ({ "--img-w": `${width / 16}rem`, "--img-h": `${height / 16}rem`, ...style } as CSSProperties) : style;
  return <NextImage {...props} data-rem={scaled ? "" : undefined} style={merged} />;
}
