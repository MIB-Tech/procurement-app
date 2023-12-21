import {AbstractModel} from '../../../_custom/types/types';
import {VendorOfferProductModel} from "../VendorOfferProduct";
import {VendorModel} from "../Vendor";


type Model = {
  status: boolean
  receiveAt: string
  devisDate:string
  isVATIncluded:boolean
  devisNumber:string
  note:string
  vendorOfferProducts: Array<VendorOfferProductModel>
  vendor:VendorModel
} & AbstractModel

export default Model;