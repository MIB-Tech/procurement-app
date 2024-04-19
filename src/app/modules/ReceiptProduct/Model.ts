import {AbstractModel} from '../../../_custom/types/types';
import {DesiredProductModel} from '../DesiredProduct';
import {ReceiptModel} from '../Receipt';
import {ReceiptProductComponentModel} from '../ReceiptProductComponent';


type Model = {
  quantity: number
  note: string
  desiredProduct: DesiredProductModel
  receipt: ReceiptModel
  components: Array<ReceiptProductComponentModel>
  readonly received: number
} & AbstractModel

export default Model;