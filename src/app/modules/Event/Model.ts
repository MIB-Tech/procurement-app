import { AbstractModel } from '../../../_custom/types/types';
import { AssetModel } from '../Asset';


type Model = {
  name: string
  description?: string
  startAt: string
  endAt?: string
  asset?: AssetModel
} & AbstractModel

export default Model;