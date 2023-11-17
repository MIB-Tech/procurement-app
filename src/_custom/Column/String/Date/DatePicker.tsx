import React, { forwardRef } from 'react';
import { DesktopDatePicker, DesktopDatePickerProps } from '@mui/x-date-pickers';
import { BaseDesktopPickerProps } from '../Datetime/DateTimePicker';
import { Input } from '../InputBase/Input';
import { InputNumberButton } from '../../Number/InputNumber/InputNumber';
import { MomentLocalizationProvider } from '../MomentLocalizationProvider';
import { STRING_FORMAT_CONFIG } from '../StringColumn';


type DatePickerProps =
  Omit<BaseDesktopPickerProps<DesktopDatePickerProps<any, any>>, 'onChange' | 'value'>
  & Partial<BaseDesktopPickerProps<DesktopDatePickerProps<any, any>>>

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>((
  {
    bg,
    size,
    onChange = () => { },
    value,
    className,
    placeholder,
    ...props
  }, ref) => {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <MomentLocalizationProvider>
      <DesktopDatePicker
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
              className={className}
              placeholder={placeholder || inputProps?.placeholder}
            />
            <InputNumberButton
              className='end-0'
              path={STRING_FORMAT_CONFIG.DATE.icon}
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
});

export { DatePicker };
export type { DatePickerProps };
