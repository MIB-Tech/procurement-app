import {AbstractModel} from '../../../_custom/types/types';
import {DesiredProductModel} from '../DesiredProduct';
import {ReceiptModel} from '../Receipt';


type Model = {
  quantity: number
  note:string
  desiredProduct: DesiredProductModel
  receipt: ReceiptModel
  readonly desiredProductQuantity: number
} & AbstractModel

export default Model;