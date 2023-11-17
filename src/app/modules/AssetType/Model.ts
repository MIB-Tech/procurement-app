import { AssetModelModel } from '../AssetModel';
import { CategoryModel } from '../Category';
import { AbstractModel } from '../../../_custom/types/types';


type Model = {
  name: string
  modalityDesign?: string
  category: CategoryModel
  assetModels: Array<AssetModelModel>
} & AbstractModel

export default Model;