import { NumberSchema } from 'yup';
import { ColumnTypeEnum } from '../../types/types';

//
export enum NumberFormat {
  Currency = 'CURRENCY',
  DecimalUnit = 'DECIMAL_UNIT'
  // Percent = 'PERCENT',
  // Rating = 'RATING',
  // Duration = 'DURATION',
}

export type NumberColumn = {
  type: ColumnTypeEnum.Number,
  format?: NumberFormat
  schema?: NumberSchema
  // min?: number
  // max?: number
  // step?: number
  // precision?: number
  // symbol: string => PERCENT
  // max?: number => RATING
  // durationFormat?: 'h:mm' | 'h:mm:ss' | 'h:mm:ss.S' | 'h:mm:ss.SS' | 'h:mm:ss.SSS'
}

export const NUMBER_FORMAT_CONFIG: Record<NumberFormat, { icon: string }> = {
  [NumberFormat.Currency]: { icon: '/finance/fin010.svg' },
  [NumberFormat.DecimalUnit]: { icon: '/finance/fin010.svg' }
};
