import {AbstractModel} from '../../../_custom/types/types';
import {PurchaseOrderProductModel} from '../PurchaseOrderProduct';
import {ProductModel} from '../Product';
import {ReceiptProductComponentModel} from '../ReceiptProductComponent';
import {QuantityStatusEnum} from '../PurchaseOrder/Model';

type Model = {
  designation: string
  quantity: number
  componentQuantity: number
  purchaseOrderProduct: PurchaseOrderProductModel
  product: ProductModel
  receiptProductComponents: Array<ReceiptProductComponentModel>
  readonly status: QuantityStatusEnum
  readonly restQuantity: number
} & AbstractModel

export default Model;