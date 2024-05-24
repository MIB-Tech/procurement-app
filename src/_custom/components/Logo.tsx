import { toAbsoluteUrl } from "../../_metronic/helpers";
import React, { FC, ImgHTMLAttributes } from "react";
import { useLayout } from "../../_metronic/layout/core";

type LogoProps = ImgHTMLAttributes<HTMLImageElement> & {
  theme?: "dark" | "light";
  size?: "sm" | "lg";
};
export const Logo: FC<LogoProps> = ({ size = "lg", ...props }) => {
  const { config } = useLayout();
  const { aside } = config;
  const theme = props.theme || aside.theme;

  return (
    <img
      alt='Logo'
      src={toAbsoluteUrl(`/media/logos/logo-${theme}-${size}.png`)}
      {...props}
    />
  );
};
