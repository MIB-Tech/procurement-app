import {AbstractModel} from '../../../_custom/types/types';
import {PurchaseNeedModel} from '../PurchaseNeed';


type Model = {
  name: string
  purchaseNeeds?: Array<PurchaseNeedModel>
} & AbstractModel

export default Model;