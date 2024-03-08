import {AbstractModel} from '../../../_custom/types/types';
import {RoleModel} from '../Role';
import {ResourceModel} from '../Resource';
import {ViewEnum} from '../../../_custom/types/ModelMapping';
import {StringSelectOption} from "../../../_custom/Column/String/StringColumn";

export enum OperationsTypeEnum {
  Listing = 'LISTING',
  Create = 'CREATE',
  Update = 'UPDATE',
  Detail = 'DETAIL',
  Delete = 'DELETE',
}

export const OPERATIONS_TYPE_OPTIONS: Array<StringSelectOption> = [
  {id: OperationsTypeEnum.Listing},
  {id: OperationsTypeEnum.Create},
  {id: OperationsTypeEnum.Update},
  {id: OperationsTypeEnum.Delete},
  {id: OperationsTypeEnum.Detail},
];

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