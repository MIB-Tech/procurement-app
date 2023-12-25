import {AbstractModel} from '../../../_custom/types/types';
import {PurchaseOrderModel} from "../PurchaseOrder";


type Model = {
  fileName: string
  purchaseOrder: PurchaseOrderModel
} & AbstractModel

export default Model;