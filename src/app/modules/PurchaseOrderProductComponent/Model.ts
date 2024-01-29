import {AbstractModel} from '../../../_custom/types/types';
import {PurchaseOrderProductModel} from '../PurchaseOrderProduct';
import {ProductModel} from '../Product';
import {ReceiptProductComponentModel} from '../ReceiptProductComponent';

type Model = {
  designation: string
  quantity: number
  componentQuantity: number
  purchaseOrderProduct: PurchaseOrderProductModel
  product: ProductModel
  receiptProductComponents: Array<ReceiptProductComponentModel>
} & AbstractModel

export default Model;