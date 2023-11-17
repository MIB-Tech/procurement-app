import { RoleModel } from '../Role';
import { AbstractModel, Timestamp } from '../../../_custom/types/types';


type Model = {
  username: string
  firstName: string
  lastName: string
  email?: string
  password: string
  passwordConfirm: string
  phoneNumber: string
  role?: RoleModel
} & Timestamp & AbstractModel

export default Model;