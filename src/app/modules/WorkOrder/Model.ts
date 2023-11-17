import { AssetModel } from '../Asset';
import { WorkOrderAttachmentModel } from '../WorkOrderAttachment';
import { WorkOrderImageModel } from '../WorkOrderImage';
import { InterventionModel } from '../Intervention';
import { AbstractModel, CreateTimestamp } from '../../../_custom/types/types';


export enum WorkOrderStatusEnum {
  Open = 'OPEN',
  InProgress = 'IN_PROGRESS',
  Completed = 'COMPLETED',
  Closed = 'CLOSED',
}

export enum NatureEnum {
  Breakdown = 'BREAK_DOWN',
  BlockingBreakdown = 'BLOCKING_BREAK_DOWN',
  Update = 'UPDATE',
  Preventive = 'PREVENTIVE',
}

type Model = {
  name: string
  description?: string
  nature?: NatureEnum
  status: WorkOrderStatusEnum
  startAt: string
  endAt?: string
  isBadManipulation: boolean
  companyCalledAt?: string
  readonly progressStartedAt?: string
  asset?: AssetModel
  interventions: Array<InterventionModel>
  attachments: Array<WorkOrderAttachmentModel>
  images: Array<WorkOrderImageModel>
} & CreateTimestamp & AbstractModel

export default Model;