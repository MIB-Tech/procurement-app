import React, { HTMLAttributes } from "react";
import clsx from "clsx";

export const Reference = ({
  refId,
  label,
  ...props
}: { refId?: number; label: string } & HTMLAttributes<HTMLAnchorElement>) => (
  <a
    href='#'
    {...props}
    className={clsx(`text-black`, props.className)}
  >
    {label}
    {refId && `#${refId}`}
  </a>
);
