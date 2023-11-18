import * as React from 'react';
import { ElementType } from 'react';
import { DefaultChipComponent, Props, UndefinedBool } from './Autocomplete.types';
import { Input } from '../../../String/InputBase/Input';
import clsx from 'clsx';
import { Option, Popper, Tag } from './Tag';
import { InputIcon } from '../../../../components/InputIcon';
import { Trans } from '../../../../components/Trans';
import { useAutocomplete } from '@mui/lab';


const Autocomplete = <T,
  Multiple extends UndefinedBool,
  DisableClearable extends UndefinedBool,
  FreeSolo extends UndefinedBool,
  ChipComponent extends ElementType = DefaultChipComponent>(
  {
    size,
    bg,
    className,
    renderPopper,
    renderOption,
    loading,
    loadingText = 'LOADING',
    noOptionsText,
    ...props
  }: Props<T, Multiple, DisableClearable, FreeSolo, ChipComponent>
) => {
  const { multiple, disabled, getOptionLabel = (option) => option, placeholder, onBlur, onFocus } = props;
  const {
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
    popupOpen
  } = useAutocomplete<T, Multiple, DisableClearable, FreeSolo>({ ...props });

  const inputProps = getInputProps();
  const listboxProps = getListboxProps();
  const options = groupedOptions as Array<T>;

  return (
    <>
      <div
        ref={setAnchorEl}
        className='position-relative'
      >
        <div
          className={clsx(
            'form-control py-0',
            bg && `form-control-${bg}`,
            size && `form-control-${size}`,
            disabled && 'bg-gray-200',
            focused && 'focused',
            multiple && ((value as Array<T>).length === 0 && size !== 'sm' && 'py-3'),
            className
          )}>
          <div className={clsx('d-flex flex-wrap flex-grow-1 align-items-center')}>
            {multiple && (value as Array<T>).map((option, index: number) => (
              <Tag
                label={getOptionLabel(option) as string}
                disabled={disabled}
                className={clsx(bg === 'solid' ? 'badge-white' : 'badge-light')}
                {...getTagProps({ index })}
              />
            ))
            }
            <Input
              {...inputProps}
              placeholder={placeholder}
              bg={'flush'}
              size={size}
              className={clsx(
                inputProps.className,
                'w-100 min-w-50px px-0',
                multiple && 'py-0',
                size === 'sm' && 'mh-0'
              )}
              style={{ flex: 1, minHeight: size === 'sm' ? 0 : undefined }}
              disabled={disabled}
              onBlur={event => {
                onBlur?.(event);
                inputProps.onBlur?.(event);
              }}
              onFocus={event => {
                onFocus?.(event);
                inputProps.onFocus?.(event);
              }}
            />
          </div>
        </div>
        <InputIcon
          path='/media/icons/duotune/general/gen004.svg'
          loading={loading}
          loadingLabel={false}
        />

        {popupOpen && (
          renderPopper ?
            renderPopper({ options, getOptionProps, ...listboxProps }) :
            <Popper {...listboxProps} >
              {options.map((option, index) => {
                const liProps = getOptionProps({ option, index })
                const selected = liProps['aria-selected']

                if (renderOption) {
                  return renderOption(
                    liProps,
                    option,
                    {
                      index,
                      inputValue: inputProps.value + '',
                      selected: selected === 'false' ? false : !!selected
                    }
                  )
                }

                return <Option label={getOptionLabel(option) as string} {...liProps}/>
              })}
              {loading && <Option label={loadingText} />}
              {(!loading && options.length === 0) && <Option label={noOptionsText || <Trans id='NO_ITEM_FOUND' />} />}

            </Popper>
        )}
      </div>
    </>
  );
};


export default Autocomplete;
