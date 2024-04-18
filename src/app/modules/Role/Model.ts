import {UserModel} from '../User';
import {AbstractModel} from '../../../_custom/types/types';
import {OperationModel} from '../Operation';


export enum RoleKeyEnum {
  SuperAdmin = 'ROLE_SUPER_ADMIN',
  Admin = 'ROLE_ADMIN',
  Buyer = 'ROLE_BUYER',
  Viewer = 'ROLE_VIEWER',

}

type Model = {
  roleKey: RoleKeyEnum
  name: string
  operations: Array<OperationModel>
  users: Array<UserModel>
} & AbstractModel

export default Model;