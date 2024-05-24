import React, { forwardRef } from "react";
import { DesktopTimePicker, DesktopTimePickerProps } from "@mui/x-date-pickers";
import { BaseDesktopPickerProps } from "../Datetime/DateTimePicker";
import { Input } from "../InputBase/Input";
import { InputNumberButton } from "../../Number/InputNumber/InputNumber";
import { MomentLocalizationProvider } from "../MomentLocalizationProvider";
import { STRING_FORMAT_CONFIG } from "../StringColumn";

type TimePickerProps = Omit<
  BaseDesktopPickerProps<DesktopTimePickerProps<any, any>>,
  "onChange" | "value"
> &
  Partial<BaseDesktopPickerProps<DesktopTimePickerProps<any, any>>>;

const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(
  (
    { bg, size, onChange = () => {}, value = new Date(), className, ...props },
    ref
  ) => {
    const [open, setOpen] = React.useState<boolean>(false);

    return (
      <MomentLocalizationProvider>
        <DesktopTimePicker
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          value={value}
          onChange={onChange}
          {...props}
          renderInput={({ inputRef, inputProps, InputProps }) => (
            <div className='position-relative'>
              <Input
                ref={inputRef}
                {...inputProps}
                onClick={() => setOpen(true)}
                bg={bg}
                size={size}
                className={className}
              />
              <InputNumberButton
                className='end-0'
                path={STRING_FORMAT_CONFIG.TIME.icon}
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

export { TimePicker };
export type { TimePickerProps };
