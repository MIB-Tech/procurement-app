import {CheckboxField} from './CheckboxField'
import React, {FC} from 'react'
import {InputFieldProps} from './CheckboxField/CheckboxField'


export const BooleanField: FC<InputFieldProps> = (props) => (
  <CheckboxField {...props} />
)