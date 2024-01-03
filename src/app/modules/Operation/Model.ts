import {AbstractModel} from '../../../_custom/types/types';
import {RoleModel} from '../Role';
import {ResourceModel} from '../Resource';
import {ViewEnum} from '../../../_custom/types/ModelMapping';


type Model = {
  title: string
  operationType: ViewEnum
  isMenuItem: boolean
  resource: ResourceModel
  roles: Array<RoleModel>
  readonly suffix: string
  readonly icon: string
} & AbstractModel

export const OPERATION_TYPE_CONFIG: Record<ViewEnum, { isStatic?: boolean }> = {
  [ViewEnum.Listing]: {
    isStatic: true
  },
  [ViewEnum.Create]: {
    isStatic: true
  },
  [ViewEnum.Detail]: {},
  [ViewEnum.Update]: {},
  [ViewEnum.Delete]: {}
};

export default Model;