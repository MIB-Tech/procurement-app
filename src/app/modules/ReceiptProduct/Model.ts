import {AbstractModel} from '../../../_custom/types/types';
import {DesiredProductModel} from '../DesiredProduct';
import {ReceiptModel} from '../Receipt';


type Model = {
  quantity: number
  note: string
  desiredProduct: DesiredProductModel
  receipt: ReceiptModel
  parent?: Model
  children: Array<Model>
  readonly desiredProductQuantity: number
  readonly restQuantity: number
  readonly validated: number
} & AbstractModel

export default Model;