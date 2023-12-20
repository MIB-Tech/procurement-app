import {AbstractModel} from '../../../_custom/types/types';
import {PurchaseNeedProductModel} from '../PurchaseNeedProduct';
import {CategoryModel} from '../Category';


type Model = {
  name: string
  category: CategoryModel
  purchaseNeedProducts: Array<PurchaseNeedProductModel>
} & AbstractModel

export default Model;