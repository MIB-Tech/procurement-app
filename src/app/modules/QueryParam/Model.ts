import {AbstractModel, ColumnTypeEnum} from '../../../_custom/types/types'
import {ModelEnum} from '../types'
import {QueryModel} from '../Query'
import {StringFormat} from '../../../_custom/Column/String/StringColumn'


type Model = {
  label: string
  name: string
  paramType: ColumnTypeEnum.String | ColumnTypeEnum.Number | ColumnTypeEnum.Boolean | ModelEnum | StringFormat.Date | StringFormat.Datetime
  query: QueryModel
} & AbstractModel


export default Model