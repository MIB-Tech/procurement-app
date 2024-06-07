import React, { FC } from "react";
import { useField } from "formik";
import clsx from "clsx";
import { Field, FieldProps } from "../../controls/fields";
import { Checkbox, CheckboxProps } from "../Chechbox/Checkbox";
import {
  RadioField,
  RadioFieldProps,
} from "../../controls/fields/RadioField/RadioField";
import { useTrans } from "../../../components/Trans";

export type InputFieldProps = FieldProps &
  Omit<RadioFieldProps<boolean>, "options">;

export const CheckboxField: FC<InputFieldProps> = ({
  name,
  feedbackLabel,
  className,
  ...props
}) => {
  const [field, { error }] = useField({ name });
  const { trans } = useTrans();

  return (
    <Field
      name={name}
      feedbackLabel={feedbackLabel}
    >
      <RadioField
        {...field}
        {...props}
        className={clsx(className, error && "is-invalid")}
        options={[true, false]}
        getOptionVariant={(checked) => (checked ? "success" : "danger")}
        getOptionLabel={(checked) => trans({ id: checked ? "YES" : "NO" })}
        scrollDisabled
      />
      {/*<Checkbox*/}
      {/*  {...field}*/}
      {/*  onChange={field.onChange}*/}
      {/*  {...props}*/}
      {/*  className={clsx(className, error && "is-invalid")}*/}
      {/*  checked={field.value}*/}
      {/*/>*/}
    </Field>
  );
};
