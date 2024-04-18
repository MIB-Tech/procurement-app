import {BooleanSchema} from 'yup'
import {ColumnTypeEnum} from '../../types/types'


export type BooleanColumn = {
  type: ColumnTypeEnum.Boolean,
  schema?: BooleanSchema
}
