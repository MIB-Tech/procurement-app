import React, { forwardRef, HTMLAttributes } from "react";
import { Input } from "../InputBase/Input";
import {
  DesktopDateTimePicker,
  DesktopDateTimePickerProps,
} from "@mui/x-date-pickers";
import { FormControlProps } from "../InputBase/Input.types";
import { InputNumberButton } from "../../Number/InputNumber/InputNumber";
import clsx from "clsx";
import { MomentLocalizationProvider } from "../MomentLocalizationProvider";
import { STRING_FORMAT_CONFIG } from "../StringColumn";

type BaseDesktopPickerProps<
  TDesktopPicker = DesktopDateTimePickerProps<any, any>
> = HTMLAttributes<HTMLInputElement> &
  FormControlProps &
  Omit<TDesktopPicker, "renderInput">;

type DatetimePickerProps = Omit<BaseDesktopPickerProps, "onChange" | "value"> &
  Partial<BaseDesktopPickerProps>;

const DateTimePicker = forwardRef<HTMLDivElement, DatetimePickerProps>(
  (
    { bg, size, onChange = () => {}, className, value, placeholder, ...props },
    ref
  ) => {
    const [open, setOpen] = React.useState<boolean>(false);

    return (
      <MomentLocalizationProvider>
        <DesktopDateTimePicker
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          value={value}
          onChange={onChange}
          {...props}
          ref={ref}
          renderInput={({ inputRef, inputProps, InputProps }) => (
            <div className='position-relative'>
              <Input
                ref={inputRef}
                {...inputProps}
                onClick={() => setOpen(true)}
                bg={bg}
                size={size}
                className={clsx(className, "pe-10")}
                placeholder={placeholder || inputProps?.placeholder}
              />
              <InputNumberButton
                className='end-0'
                path={STRING_FORMAT_CONFIG.DATETIME.icon}
                onClick={() => {
                  if (!inputProps?.disabled) {
                    setOpen(true);
                  }
                }}
              />
            </div>
          )}
        />
      </MomentLocalizationProvider>
    );
  }
);

export { DateTimePicker };
export type { BaseDesktopPickerProps, DatetimePickerProps };
