import React from "react";
import { Radio, RadioProps } from "../../base/Radio/Radio";
import { useField } from "formik";
import clsx from "clsx";
import { Field, FieldProps } from "../index";

export type RadioFieldProps<T> = FieldProps & RadioProps<T>;

export const RadioField = <T extends {} | undefined>({
  name,
  feedbackLabel,
  className,
  ...props
}: RadioFieldProps<T>) => {
  const [field, meta, helpers] = useField({ name });
  const { error } = meta;

  return (
    <Field
      name={name}
      feedbackLabel={feedbackLabel}
    >
      <Radio
        {...field}
        {...props}
        onChange={helpers.setValue}
        className={clsx(className, error && "border-danger")}
      />
    </Field>
  );
};
