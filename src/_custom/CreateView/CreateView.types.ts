import {ModelEnum} from '../../app/modules/types'


export type CreateViewProps<M extends ModelEnum> = {
  modelName: M
}
