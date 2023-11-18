import {AbstractModel} from '../../../_custom/types/types';
import {DraftOrderModel} from '../DraftOrder';


type Model = {
  name: string
  code: string
  draftOrders: Array<DraftOrderModel>
} & AbstractModel

export default Model;