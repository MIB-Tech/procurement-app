import React, { FC } from "react";
import { useField } from "formik";
import clsx from "clsx";
import { Field, FieldProps } from "../../controls/fields";
import { InputPassword, InputPasswordProps } from "../Password/InputPassword";

export type InputFieldProps = FieldProps & InputPasswordProps;

export const PasswordField: FC<InputFieldProps> = ({
  name,
  feedbackLabel,
  className,
  ...props
}) => {
  const [field, { error }, helpers] = useField({ name });

  return (
    <Field
      name={name}
      feedbackLabel={feedbackLabel}
    >
      <InputPassword
        {...field}
        {...props}
        className={clsx(className, error && "is-invalid")}
        onChange={(e) => {
          helpers.setValue(e.target.value);
        }}
      />
    </Field>
  );
};
