import { AbstractFileModel } from '../AssetModel/Model';
import { AssetModelAttachmentModel } from './index';


type Model = {
  assetModel: AssetModelAttachmentModel
} & AbstractFileModel

export default Model;