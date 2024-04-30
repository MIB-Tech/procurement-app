import React, {InputHTMLAttributes} from 'react'
import clsx from 'clsx'
import {FormControlProps} from '../../String/InputBase/Input.types'
import {I18nMessageKey} from '../../../i18n/I18nMessages'
import {Trans} from '../../../components/Trans'


export type CheckboxProps = {
  formSwitch?: boolean
  label?: I18nMessageKey
  isInvalid?: boolean
} & FormControlProps
  & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>

export const Checkbox: React.FC<CheckboxProps> = (
  {
    formSwitch,
    label,
    size,
    bg,
    className,
    isInvalid,
    checked,
    ...props
  }) => {


  return (
    <span
      className={clsx(
        'form-check form-check-custom',
        bg && `form-check-${bg}`,
        size && `form-check-${size}`,
        formSwitch && 'form-switch',
        className,
      )}
    >
      <input
        className={clsx('form-check-input', isInvalid && 'is-invalid')}
        type="checkbox"
        checked={checked}
        readOnly
        {...props}
      />
      {label && (
        <label className="form-check-label">
          <Trans id={label} />
        </label>
      )}
    </span>
  )
}