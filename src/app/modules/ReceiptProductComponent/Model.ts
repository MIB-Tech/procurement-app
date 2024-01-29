import {AbstractModel} from '../../../_custom/types/types';
import {ReceiptProductModel} from '../ReceiptProduct';
import {PurchaseOrderProductComponentModel} from '../PurchaseOrderProductComponent';

type Model = {
  quantity: number
  receiptProduct: ReceiptProductModel
  purchaseOrderProductComponent: PurchaseOrderProductComponentModel
} & AbstractModel

export default Model;