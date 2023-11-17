import { AssetModel } from '../Asset';
import { ContractAttachmentModel } from '../ContractAttachment';
import { AbstractModel } from '../../../_custom/types/types';


export enum ContractTypeEnum {
  LaborAndParts = 'LABOR_AND_PARTS',
  LaborOnly = 'LABOR_ONLY',
  PreventiveMaintenance = 'PREVENTIVE_MAINTENANCE',
}

type Model = {
  contractNumber: string
  contractType: ContractTypeEnum
  startAt?: string
  endAt?: string
  assets: Array<AssetModel>
  attachments: Array<ContractAttachmentModel>
} & AbstractModel

export default Model;