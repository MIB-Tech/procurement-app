import {AbstractModel} from '../../../_custom/types/types';
import {PurchaseNeedModel} from '../PurchaseNeed';
import {PurchaseOrderModel} from "../PurchaseOrder";


type Model = {
  name: string
  purchaseNeeds: Array<PurchaseNeedModel>
  PurchaseOrders:Array<PurchaseOrderModel>
} & AbstractModel

export default Model;