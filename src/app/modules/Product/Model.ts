import {AbstractModel} from '../../../_custom/types/types';
import {DraftOrderLineModel} from '../DreaftOrderLine';
import {CategoryModel} from '../Category';


type Model = {
  name: string
  category: CategoryModel
  draftOrderLines: Array<DraftOrderLineModel>
} & AbstractModel

export default Model;