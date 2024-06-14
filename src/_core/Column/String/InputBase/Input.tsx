import React, { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";
import { FormControlProps } from "./Input.types";

export type InputProps = FormControlProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size, bg, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          "form-control",
          bg && `form-control-${bg}`,
          size && `form-control-${size}`,
          className
        )}
        {...props}
      />
    );
  }
);
