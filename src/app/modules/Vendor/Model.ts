import { AssetModel } from '../Asset';
import { VendorContactModel } from '../VendorContact';
import { VendorAttachmentModel } from '../VendorAttachment';
import { VendorImageModel } from '../VendorImage';
import { AbstractModel } from '../../../_custom/types/types';


type Model = {
  name: string
  description?: string
  assets: Array<AssetModel>
  contacts: Array<VendorContactModel>
  attachments: Array<VendorAttachmentModel>
  images: Array<VendorImageModel>
} & AbstractModel

export default Model;