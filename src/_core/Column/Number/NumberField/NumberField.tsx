import React, { FC } from "react";
import { useField } from "formik";
import { Field, FieldProps } from "../../controls/fields";
import { InputNumber, InputNumberProps } from "../InputNumber/InputNumber";

export type InputFieldProps = FieldProps & InputNumberProps;

export const NumberField: FC<InputFieldProps> = ({
  name,
  feedbackLabel,
  ...props
}) => {
  const [field] = useField({ name });

  return (
    <Field
      name={name}
      feedbackLabel={feedbackLabel}
    >
      <InputNumber
        {...field}
        {...props}
      />
    </Field>
  );
};
