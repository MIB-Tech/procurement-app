import { NumberSchema } from 'yup';
import { ColumnTypeEnum } from '../../types/types';

//
export enum NumberFormat {
  Amount = 'AMOUNT',
  Percent = 'PERCENT',
  DecimalUnit = 'DECIMAL_UNIT',
  // Percent = 'PERCENT',
  // Rating = 'RATING',
  // Duration = 'DURATION',
}

export type NumberColumn = {
  type: ColumnTypeEnum.Number,
  format?: NumberFormat
  schema?: NumberSchema
  unit?: string
  precision?: number
  // min?: number
  // max?: number
  // step?: number
  // symbol: string => PERCENT
  // max?: number => RATING
  // durationFormat?: 'h:mm' | 'h:mm:ss' | 'h:mm:ss.S' | 'h:mm:ss.SS' | 'h:mm:ss.SSS'
}

export const NUMBER_FORMAT_CONFIG: Record<NumberFormat, { icon: string }> = {
  [NumberFormat.Amount]: { icon: '/finance/fin010.svg' },
  [NumberFormat.Percent]: { icon: '/finance/fin010.svg' },
  [NumberFormat.DecimalUnit]: { icon: '/finance/fin010.svg' }
};
