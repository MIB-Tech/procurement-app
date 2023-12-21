import {UserModel} from '../User';
import {AbstractModel} from '../../../_custom/types/types';
import {DesiredProductModel} from "../DesiredProduct";
import {PurchaseOrderModel} from "../PurchaseOrder";
import {ProductModel} from "../Product";


type Model = {
  designation: string
  quantity: number
  grossPrice: number
  note:string
  vatRate:number
  discountType:string
  discountValue:number
  discount:Array<DistanceModelType>
  desiredProduct:Array<DesiredProductModel>
  purchaseOrder:PurchaseOrderModel
  product:ProductModel
  user:UserModel
} & AbstractModel

export default Model;