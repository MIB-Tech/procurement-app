import {AbstractModel} from '../../../_custom/types/types';
import {VendorModel} from "../Vendor";


type Model = {
  name: string
  email?: string
  phoneNumber: string
  address?: string
  vendor: VendorModel
} & AbstractModel

export default Model;