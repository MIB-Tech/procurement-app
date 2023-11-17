import { AssetModelModel } from '../AssetModel';
import { AbstractModel } from '../../../_custom/types/types';


type Model = {
  name: string
  assetModels: Array<AssetModelModel>
} & AbstractModel

export default Model;