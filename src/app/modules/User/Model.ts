import {RoleModel} from '../Role'
import {AbstractModel, Timestamp} from '../../../_custom/types/types'
import {ClinicModel} from '../Clinic'


type Model = {
  username: string
  firstName: string
  lastName: string
  email?: string
  password: string
  passwordConfirm: string
  role?: RoleModel
  clinics: Array<ClinicModel>
} & Timestamp & AbstractModel

export default Model