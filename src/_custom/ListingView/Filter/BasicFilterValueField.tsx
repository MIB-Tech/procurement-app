import {PropertyFilterOperator} from './Filter.types'
import {InputBackground} from '../../Column/String/InputBase/Input.types'
import React from 'react'
import {ValueFieldProps} from '../../Column/ValueField'
import {StringFormat} from '../../Column/String/StringColumn'
import {ColumnTypeEnum} from '../../types/types'
import {AdvancedFilterValueField} from './AdvancedFilterValueField'
import {StringField} from '../../Column/String/StringField'


export const BasicFilterValueField = (props: ValueFieldProps) => {
  const {name, size = 'sm', column, className} = props
  const rest = {
    size,
    className,
    background: 'solid' as InputBackground,
    name,
  }

  switch (column.type) {
    case ColumnTypeEnum.Number:
    case ColumnTypeEnum.Boolean:
    case ColumnTypeEnum.Array:
      break
    case ColumnTypeEnum.String:
      switch (column.format) {
        case StringFormat.Date:
        case StringFormat.Datetime:
        case StringFormat.Time:
          return (
            <>
              <div className="input-group flex-nowrap">
                <StringField
                  column={column}
                  {...rest}
                  className="rounded-end-0"
                  name={`${name}[0]`}
                />
                <StringField
                  column={column}
                  {...rest}
                  className="rounded-start-0"
                  name={`${name}[1]`}
                />
              </div>
            </>
          )
        default:
          break
      }
      break
    default:
      break
  }

  return (
    <AdvancedFilterValueField
      {...props}
      {...rest}
      operator={PropertyFilterOperator.Equal}
    />
  )
}