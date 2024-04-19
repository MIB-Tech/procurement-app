import {ImportViewType} from '../types/ModelMapping'
import {ModelEnum} from '../../app/modules/types'


export type ImportViewProps<M extends ModelEnum> = {
  modelName: M
  view: Omit<ImportViewType<M>, 'type'>
}
