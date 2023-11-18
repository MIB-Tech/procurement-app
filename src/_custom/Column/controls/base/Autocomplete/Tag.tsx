import React, { FC, forwardRef, HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { SVG } from '../../../../components/SVG/SVG';
import { AutocompleteGetTagProps } from '@mui/material';


type TagProps = {
  label: string;
  className?: string;
  disabled?: boolean;
} & ReturnType<AutocompleteGetTagProps>

export const Tag: React.FC<TagProps> = ({ label, className, disabled, onDelete, ...props }) => (
  <div
    className={clsx(
      'd-flex align-items-center badge my-1 me-2 ',
      !disabled && 'pe-0',
      className
    )}
    {...props}
  >
    <span className='text-truncate'>{label}</span>
    {!disabled && (
      <div onClick={onDelete}>
        <SVG
          path='/general/gen034.svg'
          variant='danger'
          className='px-2 cursor-pointer'
        />
      </div>)}
  </div>
);

type OptionProps = {
  label: ReactNode
} & HTMLAttributes<HTMLLIElement>
export const Option: FC<OptionProps> = (
  {
    label,
    className,
    onClick,
    'aria-disabled': disabled,
    'aria-selected': selected,
    ...props
  }) => {
  selected = selected === 'false' ? false : !!selected;

  return (
    <li
      {...props}
      className={clsx(
        className,
        'd-flex py-2 px-3',
        selected && 'bg-light-dark',
        disabled ? 'text-muted cursor-default' : 'bg-hover-light'
      )}
      onClick={disabled ? () => {} : onClick}
    >
      {/*<div className='w-10px me-4'>*/}
      {/*  {selected ?*/}
      {/*    <KTSVG path='/media/icons/duotune/general/gen037.svg' className='svg-icon-3 svg-icon-primary' /> :*/}
      {/*    <KTSVG path='/media/icons/duotune/general/gen036.svg' className='svg-icon-3 svg-icon-muted' />}*/}
      {/*</div>*/}
      <span>
        {label}
      </span>
    </li>
  );
};

type PopperProps = HTMLAttributes<HTMLUListElement>
export const Popper = forwardRef<HTMLUListElement, PopperProps>(({ className, style, ...props }, ref) => (
  <ul
    className={clsx(
      'position-absolute overflow-auto bg-white mh-250px rounded shadow p-0 min-w-100 mw-300px',
      className
    )}
    style={{ ...style, zIndex: 1000 }}
    {...props}
    ref={ref}
  />
));