import {AbstractModel} from '../../../_custom/types/types';
import {PurchaseOrderProductModel} from '../PurchaseOrderProduct';
import {ReceiptProductModel} from '../ReceiptProduct';
import {QuantityStatusEnum} from "../PurchaseOrder/Model";
import {DeliveryDepotModel} from "../DeliveryDepot";


type Model = {
  designation: string
  //address: string
  quantity: number
  receiptProduct?: ReceiptProductModel
  purchaseOrderProduct: PurchaseOrderProductModel
  deliveryDepot?: DeliveryDepotModel
  readonly status: QuantityStatusEnum
  readonly restQuantity: number
} & AbstractModel

export default Model;