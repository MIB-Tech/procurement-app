import React, {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import clsx from "clsx";
import { FormControlProps } from "../../../String/InputBase/Input.types";
import { Button } from "../../../../components/Button";
import { Variant } from "react-bootstrap/types";

const defaultVariant = "primary";
export type RadioProps<T> = {
  options: Array<T>;
  getOptionLabel?: (option: T) => string | ReactNode;
  getOptionDisabled?: (option: T) => boolean | undefined;
  getOptionVariant?: (option: T) => Variant | undefined;
  isOptionEqualToValue?: (option: T, value: T) => boolean;
  onChange?: (option?: T | null) => void;
  value?: T;
  direction?: "VERTICAL" | "HORIZONTAL";
  scrollDisabled?: boolean;
} & FormControlProps &
  Omit<InputHTMLAttributes<HTMLDivElement>, "size" | "value" | "onChange">;

const RadioInner = <T extends {} | undefined>(
  {
    size,
    bg,
    className,
    disabled,
    multiple,
    options = [],
    getOptionLabel = (o) => o,
    getOptionDisabled = () => false,
    getOptionVariant = () => defaultVariant,
    value,
    onChange,
    direction = "VERTICAL",
    scrollDisabled,
    ...props
  }: RadioProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const { isOptionEqualToValue = (option, value) => option === value } = props;

  const isVertical = direction === "VERTICAL";

  return (
    <div className={clsx(!scrollDisabled && "scroll")}>
      <div
        ref={ref}
        className={clsx(
          "rounded",
          isVertical ? "d-inline-flex" : "flex-column",
          size === "sm" ? "p-1" : "p-2",
          bg === "solid" ? "bg-light" : "border",
          className
        )}
      >
        {options.map((option, index) => {
          const isActive =
            value !== undefined && isOptionEqualToValue(option, value);
          const variant = getOptionVariant(option) || defaultVariant;

          return (
            <div
              key={index}
              className='d-flex align-items-center'
            >
              {isVertical && !!index && (
                <div
                  className={clsx(
                    "bullet bg-gray-500 w-1px h-15px",
                    size === "sm" ? "mx-1" : "mx-2"
                  )}
                />
              )}
              <Button
                size={size}
                disabled={disabled || getOptionDisabled(option)}
                dashed
                className={clsx(
                  "text-truncate py-1 px-2 rounded-1",
                  isActive && `btn-active-${variant} active`,
                  isVertical
                    ? size === "sm"
                      ? "min-w-30px mw-100px"
                      : "min-w-100px mw-120px"
                    : "w-100"
                )}
                onClick={() => {
                  if (onChange) {
                    if (multiple) {
                      if (isActive) {
                        //todo remove
                      } else {
                        // @ts-ignore
                        onChange([...value, option]);
                      }
                    } else {
                      onChange(isActive ? null : option);
                    }
                  }
                }}
              >
                {getOptionLabel(option)}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Radio = forwardRef(RadioInner) as <T>(
  props: RadioProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof RadioInner>;
