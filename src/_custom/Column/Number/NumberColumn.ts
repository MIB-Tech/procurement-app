import {NumberSchema} from 'yup'
import {ColumnTypeEnum} from '../../types/types'
import {Model} from '../../types/ModelMapping'
import {ModelEnum} from '../../../app/modules/types'

//
export enum NumberFormat {
  Amount = 'AMOUNT',
  Percent = 'PERCENT',
  DecimalUnit = 'DECIMAL_UNIT',
  // Percent = 'PERCENT',
  // Rating = 'RATING',
  // Duration = 'DURATION',
}

type Limit<M extends ModelEnum> = number | keyof Model<M>
export type NumberColumn<M extends ModelEnum> = {
  type: ColumnTypeEnum.Number,
  format?: NumberFormat
  schema?: NumberSchema | ((schema: NumberSchema) => NumberSchema)
  unit?: string
  precision?: number
  validation?: {
    min?: Limit<M>
    max?: Limit<M>
    lessThan?: Limit<M>
    moreThan?: Limit<M>
    positive?: boolean
    negative?: boolean
  }
  // step?: number
  // symbol: string => PERCENT
  // max?: number => RATING
  // durationFormat?: 'h:mm' | 'h:mm:ss' | 'h:mm:ss.S' | 'h:mm:ss.SS' | 'h:mm:ss.SSS'
}

export const NUMBER_FORMAT_CONFIG: Record<NumberFormat, {icon: string}> = {
  [NumberFormat.Amount]: {icon: '/finance/fin010.svg'},
  [NumberFormat.Percent]: {icon: '/finance/fin010.svg'},
  [NumberFormat.DecimalUnit]: {icon: '/finance/fin010.svg'},
}
