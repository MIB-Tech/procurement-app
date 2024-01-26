import {AbstractModel} from '../../../_custom/types/types';
import {PurchaseOrderProductModel} from '../PurchaseOrderProduct';
import {ProductModel} from '../Product';

type Model = {
  designation: string
  quantity: number
  componentQuantity: number
  purchaseOrderProduct: PurchaseOrderProductModel
  product: ProductModel
} & AbstractModel

export default Model;