import {AbstractModel} from '../../../_custom/types/types';
import {VendorOfferProductModel} from '../VendorOfferProduct';
import {VendorModel} from '../Vendor';


type Model = {
  status: string
  receiveAt: string
  quoteDate: string
  VATIncluded: boolean
  quoteNumber: string
  note: string
  vendorOfferProducts: Array<VendorOfferProductModel>
  vendor: VendorModel
} & AbstractModel

export default Model;