import React, { FC, ReactNode, useState } from 'react';
import { useField, useFormikContext } from 'formik';
import { Field, FieldProps } from '../controls/fields';
import { Input } from './InputBase/Input';
import clsx from 'clsx';
import { ColumnIcon } from '../../ListingView/views/Table/ColumnIcon';
import { StringColumn, StringFormat } from './StringColumn';
import { Textarea } from './Textarea/Textarea';
import { InputPassword } from './Password/InputPassword';
import { DateTimePicker } from './Datetime/DateTimePicker';
import { DatePicker } from './Date/DatePicker';
import { TimePicker } from './Time/TimePicker';
import { useAuth } from '../../hooks/UseAuth';
import { Trans, useTrans } from '../../components/Trans';
import { Radio, RadioProps } from '../controls/base/Radio/Radio';
import { I18nMessageKey } from '../../i18n/I18nMessages';
import { Dropdown } from 'react-bootstrap';
import { Button } from '../../components/Button';
import { ClickAwayListener } from '@mui/material';
import { AutocompleteBase } from '../controls/base/Autocomplete';
import { ICONS } from '../../components/SVG/SVG';
import { Option, Popper } from '../controls/base/Autocomplete/Tag';
import { KTSVG } from '../../../_metronic/helpers';
import { formatToInputType } from './StringField.utils';
import { QRCodeInput } from './QRCodeInput';
import { DivToggle } from '../../ListingView/Filter/DivToggle';


type StringFieldProps = {
  className?: string
  column: StringColumn
} & FieldProps
export const StringField: FC<StringFieldProps> = ({ column, name, feedbackLabel, className, ...props }) => {
  const { values } = useFormikContext();
  const [field, { error }, { setValue, setTouched }] = useField({ name });
  const { value } = field;
  const [selectFieldOpen, setSelectFieldOpen] = useState<boolean>(false);
  const { isGranted } = useAuth();
  const { trans } = useTrans();
  let children: ReactNode;
  const { format } = column;
  const icon: boolean | undefined = !(format && [StringFormat.Password, StringFormat.Icon, StringFormat.Select].includes(format));

  switch (format) {
    case StringFormat.Text:
      children = (
        <Textarea 
          {...field}
          {...props}
          className={clsx('pe-10', error && 'is-invalid', className)}
        />
      );
      break;
    case StringFormat.Password:
      children = (
        <InputPassword
          {...field}
          {...props}
          meter={column.meter}
          className={clsx('pe-10', error && 'is-invalid', className)}
        />
      );
      break;
    case StringFormat.Datetime:
      children = (
        <DateTimePicker
          {...field}
          {...props}
          minDate={column.min}
          maxDate={column.max}
          className={clsx('pe-10', error && 'is-invalid', className)}
          onChange={date => setValue(date)}
        />
      );
      break;
    case StringFormat.Date:
      children = (
        <DatePicker
          {...field}
          {...props}
          minDate={column.min}
          maxDate={column.max}
          className={clsx('pe-10', error && 'is-invalid', className)}
          onChange={date => setValue(date)}
        />
      );
      break;
    case StringFormat.Time:
      children = (
        <TimePicker
          {...field}
          {...props}
          className={clsx('pe-10', error && 'is-invalid', className)}
          onChange={date => setValue(date)}
        />
      );
      break;
    case StringFormat.Icon:
      children = (
        <AutocompleteBase
          options={ICONS.map(({ path }) => path).filter((value, index, self) => self.indexOf(value) === index)}
          {...field}
          {...props}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onBlur={() => {
            setTouched(true);
          }}
          getOptionLabel={path => ICONS.find(icon => icon.path === path)?.name || path}
          renderPopper={({ options, getOptionProps, ...listboxProps }) => (
            <Popper {...listboxProps} >
              {(options.map((option, index) => (
                <Option
                  label={(
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-20px me-2'>
                    <span className='symbol-label'>
                      <KTSVG path={option} className='svg-icon-dark svg-icon-fluid align-self-center' />
                    </span>
                      </div>
                      <div className='text-truncate'>
                        {ICONS.find(({ path }) => path === option)?.name || option}
                      </div>
                    </div>
                  )}
                  {...getOptionProps({ option, index })}
                />
              )))}
            </Popper>
          )}
          className={clsx('pe-10', error && 'is-invalid', className)}
        />
      );
      break;
    case StringFormat.Select:
      const { inline, transitions } = column;
      const options = column.options.map(({ id }) => id);
      const getOptionDisabled = (option: string) => {
        if (!transitions) {
          // Disabled the feature when no transition is defined
          return false;
        }
        const transition = transitions.find(({ from, grant, when }) => {

          return from === value && (!grant || isGranted(grant)) && (!when || when(values));
        });
        if (!transition) {
          return true;
        }

        return transition.to !== option;
      };
      const getOptionLabel: RadioProps<string>['getOptionLabel'] = option => {
        return trans({ id: column.options.find(o => o.id === option)?.label || (option as I18nMessageKey) });
      };
      const getOptionVariant: RadioProps<string>['getOptionVariant'] = option => {
        return column.options.find(o => o.id === option)?.color;
      };

      if (inline) {
        children = (
          <Radio
            {...field}
            {...props}
            options={options}
            getOptionLabel={getOptionLabel}
            getOptionVariant={getOptionVariant}
            getOptionDisabled={getOptionDisabled}
            onChange={setValue}
            className={clsx(className, error && 'border-danger')}
          />
        );
      } else {
        children = (
          <ClickAwayListener
            onClickAway={() => {
              if (selectFieldOpen) {
                setSelectFieldOpen(false);
              }
            }}>
            <Dropdown show={selectFieldOpen}>
              <Dropdown.Toggle
                as={DivToggle}
                onClick={() => {
                  setSelectFieldOpen(true);
                }}
              >
                <Button
                  variant={value ? getOptionVariant(value) : 'light'}
                  size='sm'
                  className={clsx(
                    'text-nowrap w-100 px-3 text-truncate text-start',
                    // value && getOptionVariant && `text-${getOptionVariant(value)}`,
                    error && 'border border-danger',
                    className
                  )}
                >
                  {value ? getOptionLabel(value) : <Trans id='ENTER_OPTION' />}
                </Button>
              </Dropdown.Toggle>
              <Dropdown.Menu align='start'>
                {options.map((option, index) => {
                  const isActive = value === option;

                  return (
                    <Dropdown.Item
                      key={index}
                      disabled={getOptionDisabled(option)}
                      className={clsx(
                        // 'fw-bold',
                        isActive && `border-start border-primary border-2 bg-light`,
                        !isActive && `text-${getOptionVariant(option)}`
                      )}
                      onClick={() => {
                        setValue(option);
                        setSelectFieldOpen(false);
                      }}
                    >
                      {getOptionLabel(option)}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </ClickAwayListener>
        );
      }
      break;
    case StringFormat.Qrcode:
      return (
        <QRCodeInput
          {...field}
          {...props}
          className={clsx('pe-10', error && 'is-invalid', className)}
          type={format && formatToInputType(format)}
        />
      );
    default:
      children = (
        <Input
          {...field}
          {...props}
          className={clsx('pe-10', error && 'is-invalid', className)}
          type={format && formatToInputType(format)}
        />
      );
  }


  return (
    <Field name={name} feedbackLabel={feedbackLabel}>
      {icon ?
        <div className='position-relative'>
          {children}
          <ColumnIcon
            {...column}
            size='1'
            className='position-absolute translate-middle-y top-50 end-0 me-2'
          />
        </div> :
        children
      }
    </Field>
  )
};