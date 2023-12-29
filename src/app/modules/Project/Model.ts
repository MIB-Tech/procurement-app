import {AbstractModel} from '../../../_custom/types/types';
import {PurchaseNeedModel} from '../PurchaseNeed';
import {PurchaseOrderModel} from '../PurchaseOrder';


type Model = {
  name: string
  purchaseNeeds: Array<PurchaseNeedModel>
  purchaseOrders: Array<PurchaseOrderModel>
  budgetAmount:number
  startDate:string
  endDate:string
  purchaseOrderAllowed:boolean
} & AbstractModel

export default Model;