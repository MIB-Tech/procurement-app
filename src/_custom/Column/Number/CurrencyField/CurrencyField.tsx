import React, {FC} from 'react'
import clsx from 'clsx'
import {InputNumberProps} from '../InputNumber/InputNumber'
import {NumberField} from '../NumberField'


export type Props = {
  currency?: string
} & Partial<InputNumberProps>

export const CurrencyField: FC<Props> = ({name = 'currency', currency, className, ...props}) => {
  return (
    <div className={clsx(currency && 'position-relative')}>
      <NumberField
        name={name}
        className={clsx(currency && 'pe-20', className)}
        {...props}
      />
      {currency && (
        <div className="position-absolute translate-middle-y top-50 end-0 me-12">
          {currency}
        </div>
      )}
    </div>
  )
}