import { AbstractFileModel } from '../AssetModel/Model';
import { InterventionAttachmentModel } from './index';


type Model = {
  intervention: InterventionAttachmentModel
} & AbstractFileModel

export default Model;