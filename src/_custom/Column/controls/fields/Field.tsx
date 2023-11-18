import React, { FC } from 'react';
import { FeedbackErrorType, FeedbackLabelType, FieldProps } from './Field.types';
import { useField } from 'formik';
import { Trans } from '../../../components/Trans';
import { I18nMessageKey } from '../../../i18n/I18nMessages';


const FeedbackError: FC<FeedbackErrorType> = ({ error, variant = 'danger' }) => (
  <div className={`text-${variant}`}>
    {/*TOTO*/}
    {typeof error === 'string' ?
      <Trans id={error} /> :
      <Trans id={error.id} values={error.params} />
    }
  </div>
)

const FeedbackLabel: FC<FeedbackLabelType> = ({ label }) => (
  <div className='text-muted'>
    {label && <Trans id={label} />}
  </div>
);

const Field: FC<FieldProps> = ({ name, feedbackLabel, children }) => {
  const [, { error }] = useField({ name });

  return (
    <>
      {children}
      {error && <FeedbackError error={error as I18nMessageKey} />}
      {!error && feedbackLabel && <FeedbackLabel label={feedbackLabel} />}
    </>
  );
};

export default Field;

export { FeedbackError, FeedbackLabel };