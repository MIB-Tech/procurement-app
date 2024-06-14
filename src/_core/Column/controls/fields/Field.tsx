import React, { FC, HTMLAttributes } from "react";
import {
  FeedbackErrorType,
  FeedbackLabelType,
  FieldProps,
} from "./Field.types";
import { useField } from "formik";
import { Trans } from "../../../components/Trans";

const FeedbackError: FC<FeedbackErrorType> = ({
  error,
  variant = "danger",
}) => {
  return (
    <div className={`text-${variant}`}>
      {typeof error === "string" && <Trans id={error} />}
      {typeof error === "object" && "id" in error && (
        <Trans
          id={error.id}
          values={error.params}
        />
      )}
    </div>
  );
};

const FeedbackLabel: FC<FeedbackLabelType> = ({ label }) => (
  <div className='text-gray-600'>{label && <Trans id={label} />}</div>
);

const Field: FC<FieldProps & HTMLAttributes<any>> = ({
  name,
  feedbackLabel,
  children,
}) => {
  const [, { error }] = useField({ name });

  return (
    <>
      {children}
      {error && <FeedbackError error={error as FeedbackErrorType["error"]} />}
      {!error && feedbackLabel && <FeedbackLabel label={feedbackLabel} />}
    </>
  );
};

export default Field;

export { FeedbackError, FeedbackLabel };
