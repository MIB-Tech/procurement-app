import {AbstractModel} from '../../../_custom/types/types';
import {PurchaseOrderModel} from "../PurchaseOrder";


type Model = {
  name: string
  PurchaseOrders:Array<PurchaseOrderModel>
} & AbstractModel

export default Model;