import { toAbsoluteUrl } from "../_metronic/helpers";

export const useLogo = () => {
  const theme = "light";
  const size = "lg";

  return {
    src: toAbsoluteUrl(`/media/logos/logo-${theme}-${size}.png`),
  };
};
