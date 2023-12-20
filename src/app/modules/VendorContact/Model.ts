import { AbstractModel } from '../../../_custom/types/types';


type Model = {
  name: string
  email: string
  phoneNumber: string
  activity?: string
  // vendor: VendorModel
} & AbstractModel

export default Model;