import { AbstractFileModel } from '../AssetModel/Model';
import { VendorAttachmentModel } from './index';


type Model = {
  vendor: VendorAttachmentModel
} & AbstractFileModel

export default Model;