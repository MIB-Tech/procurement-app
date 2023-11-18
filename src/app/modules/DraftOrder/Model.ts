import {AbstractModel, CreateTimestamp} from '../../../_custom/types/types';
import {UserModel} from '../User';
import {DraftOrderAttachmentModel} from '../DraftOrderAttachment';
import {CategoryModel} from '../Category';


export enum DraftOrderStatusEnum {
  Open = 'OPEN',
  Confirmed = 'CONFIRMED',
  PurchaseConfirmed = 'PURCHASE_CONFIRMED',
  Cancelled = 'CANCELLED',
}

export enum PriorityEnum {
  Normal = 'NORMAL',
  Urgent = 'URGENT'
}

type Model = {
  orderNumber: string
  description: string
  desiredDeliveryDate: string
  status: DraftOrderStatusEnum
  priority: PriorityEnum
  isRegularized: boolean
  createdBy: UserModel
  orderedFor: string
  recommendedVendors: string[]
  buyerFullName: string
  project: AbstractModel
  company: AbstractModel
  receptionManager: UserModel
  applicantService: AbstractModel
  lines: Array<AbstractModel>
  attachments: Array<DraftOrderAttachmentModel>
  readonly category: CategoryModel
  readonly validationPath: string
} & CreateTimestamp & AbstractModel

export default Model;