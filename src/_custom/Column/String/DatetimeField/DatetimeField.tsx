import React, {FC} from 'react'
import {useField} from 'formik'
import clsx from 'clsx'
import {DateTimePicker} from '../Datetime/DateTimePicker'
import {Field} from '../../controls/fields'
import {Props} from './DatetimeField.types'


export const DatetimeField: FC<Props> = ({name, feedbackLabel, className, ...props}) => {
  const [field, meta, helpers] = useField({name})
  const {error} = meta

  return (
    <Field name={name} feedbackLabel={feedbackLabel}>
      <DateTimePicker
        {...field}
        {...props}
        className={clsx(className, error && 'is-invalid')}
        onChange={date => {
          helpers.setValue(date)
        }}
      />
    </Field>
  )
}