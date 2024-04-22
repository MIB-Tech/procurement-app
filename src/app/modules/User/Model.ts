import {RoleModel} from '../Role'
import {AbstractModel, Timestamp} from '../../../_custom/types/types'
import {ClinicModel} from '../Clinic'
import {UserModel} from './index'
import {PurchaseOrderModel} from '../PurchaseOrder'


type Model = {
  username: string
  firstName: string
  lastName: string
  email?: string
  password: string
  passwordConfirm: string
  role?: RoleModel
  clinics: Array<ClinicModel>
  referentPurchaseOrders: Array<PurchaseOrderModel>
} & Timestamp & AbstractModel

export default Model