import React from "react";

export interface NextImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fill?: boolean;
  priority?: boolean;
}

export default function Image({
  src,
  alt = "",
  width,
  height,
  className,
  draggable = true,
  priority = false,
  fill = false,
  style,
  ...props
}: NextImageProps) {
  const combinedStyle: React.CSSProperties = {
    ...style,
    ...(fill
      ? {
          position: "absolute",
          height: "100%",
          width: "100%",
          inset: 0,
          objectFit: "cover",
        }
      : {}),
  };

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      draggable={draggable}
      loading={priority ? "eager" : "lazy"}
      style={combinedStyle}
      {...props}
    />
  );
}
