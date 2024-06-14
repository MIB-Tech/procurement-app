import { SVGProps } from "../../SVG/SVG.types";
import { ButtonProps } from "../index";
import { Variant } from "react-bootstrap/types";

export type IconButtonProps = {
  variant?: Variant;
  activeVariant?: Variant;
} & Pick<SVGProps, "path" | "size"> &
  Omit<ButtonProps, "variant" | "size" | "activeVariant">;
