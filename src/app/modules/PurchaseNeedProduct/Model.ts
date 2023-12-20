import {AbstractModel} from '../../../_custom/types/types';
import {PurchaseNeedModel} from '../PurchaseNeed';
import {ProductModel} from '../Product';


type Model = {
  quantity: number
  order: PurchaseNeedModel
  product: ProductModel
} & AbstractModel

export default Model;