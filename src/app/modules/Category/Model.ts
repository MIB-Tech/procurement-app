import { AssetTypeModel } from '../AssetType';
import { AbstractModel } from '../../../_custom/types/types';


type Model = {
  name: string
  description?: string
  code: string
  parent?: Model
  children: Array<Model>
  assetTypes: Array<AssetTypeModel>
} & AbstractModel

export default Model;