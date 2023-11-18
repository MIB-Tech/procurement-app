import {AbstractModel} from '../../../_custom/types/types';
import {DraftOrderModel} from '../DraftOrder';


type Model = {
  name: string
  draftOrders: Array<DraftOrderModel>
} & AbstractModel

export default Model;