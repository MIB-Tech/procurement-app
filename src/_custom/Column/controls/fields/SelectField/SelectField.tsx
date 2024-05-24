import { Field, FieldProps } from "../index";
import { RadioProps } from "../../base/Radio/Radio";
import React, { HTMLAttributes, useState } from "react";
import { useField } from "formik";
import { ClickAwayListener } from "@mui/material";
import { Dropdown } from "react-bootstrap";
import { Button } from "../../../../components/Button";
import clsx from "clsx";

import { DivToggle } from "../../../../ListingView/Filter/DivToggle";

export type SelectFieldProps<T extends {}> = {
  onChange?: (option: T) => void;
} & FieldProps &
  Omit<RadioProps<T>, "onChange"> &
  Omit<HTMLAttributes<HTMLDivElement>, "onChange">;
export const SelectField = <T extends {}>({
  name,
  options,
  size,
  getOptionLabel = (o) => o + "",
  isOptionEqualToValue = (option, value) => option === value,
  getOptionVariant,
  getOptionDisabled,
  className,
  onChange,
  feedbackLabel,
  placeholder = "Select Option",
  disabled,
}: SelectFieldProps<T>) => {
  const [open, setOpen] = useState<boolean>(false);
  const [{ value }, { error }, helpers] = useField({ name });

  return (
    <Field
      name={name}
      feedbackLabel={feedbackLabel}
    >
      <ClickAwayListener onClickAway={() => open && setOpen(false)}>
        <Dropdown show={open}>
          <Dropdown.Toggle
            as={DivToggle}
            onClick={() => !disabled && setOpen(true)}
            disabled={disabled}
          >
            <Button
              variant={
                (value && getOptionVariant && getOptionVariant(value)) ||
                "light"
              }
              size={size}
              className={clsx(
                "text-nowrap w-100 px-3 text-truncate text-start",
                // value && getOptionVariant && `text-${getOptionVariant(value)}`,
                error && "border border-danger",
                className
              )}
              disabled={disabled}
            >
              {value !== null && value !== undefined
                ? getOptionLabel(value)
                : placeholder}
            </Button>
          </Dropdown.Toggle>
          <Dropdown.Menu align='start'>
            {options.map((option, index) => {
              const isActive = value && isOptionEqualToValue(option, value);

              return (
                <Dropdown.Item
                  key={index}
                  disabled={getOptionDisabled?.(option)}
                  className={clsx(
                    // 'fw-bold',
                    isActive && `border-start border-primary border-2 bg-light`,
                    !isActive &&
                      getOptionVariant &&
                      `text-${getOptionVariant(option)}`
                  )}
                  onClick={() => {
                    if (onChange) {
                      onChange(option);
                    } else {
                      helpers.setValue(option);
                    }

                    setOpen(false);
                  }}
                >
                  {getOptionLabel(option)}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </ClickAwayListener>
    </Field>
  );
};
