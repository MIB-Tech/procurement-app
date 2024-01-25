import {RoleModel} from '../Role';
import {LocationModel} from '../Location';
import {AbstractModel, Timestamp} from '../../../_custom/types/types';


type Model = {
  username: string
  firstName: string
  lastName: string
  email?: string
  password: string
  passwordConfirm: string
  phoneNumber: string
  role?: RoleModel
  locations: Array<LocationModel>
} & Timestamp & AbstractModel

export default Model;