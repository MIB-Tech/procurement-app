import { AbstractImageModel } from '../AssetModel/Model';
import { AssetModelImageModel } from './index';


type Model = {
  assetModel: AssetModelImageModel
} & AbstractImageModel

export default Model;