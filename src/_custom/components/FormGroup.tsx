import React, { HTMLAttributes, ReactNode } from "react";
import { I18nMessageKey } from "../i18n/I18nMessages";
import clsx from "clsx";
import { Trans } from "./Trans";

type FormGroupProps = {
  label: I18nMessageKey | ReactNode;
  horizontal?: boolean;
  description?: string;
} & HTMLAttributes<HTMLDivElement>;

const FormGroup: React.FC<FormGroupProps> = ({
  label,
  description,
  children,
  horizontal,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(horizontal && "row", className)}
      {...props}
    >
      <div
        className={clsx("fw-bold text-truncate", horizontal && "col-xl-3 fs-6")}
      >
        {typeof label === "string" ? (
          <Trans id={label as I18nMessageKey} />
        ) : (
          label
        )}
      </div>
      <div className={clsx(horizontal && "col-xl-9")}>{children}</div>
    </div>
  );
};

export type { FormGroupProps };
export { FormGroup };
