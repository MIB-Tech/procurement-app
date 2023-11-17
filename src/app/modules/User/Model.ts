import { RoleModel } from '../Role';
import { LocationModel } from '../Location';
import { TeamModel } from '../Team';
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
  location?: LocationModel
  teams: Array<TeamModel>
} & Timestamp & AbstractModel

export default Model;