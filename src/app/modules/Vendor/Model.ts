import {VendorContactModel} from '../VendorContact';
import {AbstractModel} from '../../../_custom/types/types';

type Model = {
  name: string
  code: string
  contacts: Array<VendorContactModel>
} & AbstractModel

export default Model;