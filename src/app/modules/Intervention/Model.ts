import { WorkOrderModel } from '../WorkOrder';
import { PartModel } from '../Part';
import { AbstractModel } from '../../../_custom/types/types';


type Model = {
  description?: string
  startAt: string
  endAt: string
  workOrder?: WorkOrderModel
  parts: Array<PartModel>
  attachments: Array<PartModel>
} & AbstractModel

export default Model;