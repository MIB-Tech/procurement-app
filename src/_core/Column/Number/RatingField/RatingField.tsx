import React, { FC } from "react";
import { useField } from "formik";
import clsx from "clsx";
import { Field, FieldProps } from "../../controls/fields";
import { Rating, RatingProps } from "../Rating/Rating";

export type SliderFieldProps = FieldProps & RatingProps;

export const RatingField: FC<SliderFieldProps> = ({
  name,
  feedbackLabel,
  ...props
}) => {
  const [field, meta, helpers] = useField({ name });
  const { error } = meta;

  return (
    <Field
      name={name}
      feedbackLabel={feedbackLabel}
    >
      <Rating
        className={clsx(error && "is-invalid")}
        {...field}
        onChange={(event, value) => {
          helpers.setValue(value);
        }}
        {...props}
      />
    </Field>
  );
};
