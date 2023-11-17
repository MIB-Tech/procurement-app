import { WorkOrderModel } from '../WorkOrder';
import { AbstractModel } from '../../../_custom/types/types';


type Data = Pick<WorkOrderModel, 'status'>

export enum LogActionEnum {
  Create = 'create',
  Update = 'update',
}

type Model = {
  action: LogActionEnum
  loggedAt: string
  objectId?: string
  objectClass: string
  version: number
  data?: Data
  oldData?: Data
  username?: string
} & AbstractModel

export default Model;