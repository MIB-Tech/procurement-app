import React, { FC, ImgHTMLAttributes } from "react";
import { useLogo } from "../../app/utils";

type LogoProps = ImgHTMLAttributes<HTMLImageElement> & {
  theme?: "dark" | "light";
  size?: "sm" | "lg";
};
export const Logo: FC<LogoProps> = ({ size = "lg", ...props }) => {
  const { src } = useLogo();

  return (
    <img
      alt='Logo'
      src={src}
      {...props}
    />
  );
};
