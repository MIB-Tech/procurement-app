import {AbstractModel} from '../../../_custom/types/types';
import {DraftOrderModel} from '../DraftOrder';
import {ProductModel} from '../Product';


type Model = {
  quantity: number
  order: DraftOrderModel
  product: ProductModel
} & AbstractModel

export default Model;