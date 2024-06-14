import { ButtonHTMLAttributes } from "react";
import { InputSize } from "../../Column/String/InputBase/Input.types";
import { ButtonVariant, Variant } from "react-bootstrap/types";
import { I18nMessageKey } from "../../i18n/I18nMessages";

export type ButtonColor = "color-gray-700" | "color-danger" | "color-primary";
export type ButtonProps = {
  variant?:
    | ButtonVariant
    | "outline-default"
    | "outline-primary"
    | "outline-success"
    | "outline-info"
    | "outline-warning"
    | "outline-danger"
    | "outline-dark"
    | "outline-secondary"
    | "facebook"
    | "google"
    | "twitter"
    | "instagram"
    | "youtube"
    | "linkedin"
    | "link"
    | "flush"
    | "color-muted";
  activeVariant?: ButtonVariant | ButtonColor;
  // textColor?:
  // 'color-white'|'color-primary'|'color-secondary'|'color-light'|'color-success'|'color-info'|'color-warning'|'color-danger'|'color-dark'|'color-muted'|'gray-100'|''|''
  hoverEffect?: "rise" | "scale" | "rotate-end" | "rotate-start";
  size?: InputSize;
  icon?: boolean;
  dashed?: boolean;
  flush?: boolean;
  loading?: boolean;
  pulse?: boolean;
  pulseVariant?: Variant;
  loadingLabel?: I18nMessageKey | false;
} & ButtonHTMLAttributes<HTMLButtonElement>;
