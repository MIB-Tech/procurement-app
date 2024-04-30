import {RoleModel} from '../Role'
import {AbstractModel, Timestamp} from '../../../_custom/types/types'
import {ClinicModel} from '../Clinic'
import {UserModel} from './index'
import {PurchaseOrderModel} from '../PurchaseOrder'
import {CategoryModel} from '../Category'


type Model = {
  username: string
  firstName: string
  lastName: string
  email?: string
  password: string
  passwordConfirm: string
  restrictedByCategories: boolean
  role?: RoleModel
  clinics: Array<ClinicModel>
  referentPurchaseOrders: Array<PurchaseOrderModel>
  categories: Array<CategoryModel>
} & Timestamp & AbstractModel

export default Model