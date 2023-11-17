import { AbstractFileModel } from '../AssetModel/Model';
import { WorkOrderAttachmentModel } from './index';


type Model = {
  workOrder: WorkOrderAttachmentModel
} & AbstractFileModel

export default Model;