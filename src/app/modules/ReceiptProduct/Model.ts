import {AbstractModel} from '../../../_custom/types/types';
import {DesiredProductModel} from '../DesiredProduct';
import {ReceiptModel} from '../Receipt';


type Model = {
  quantity: number
  desiredProduct: DesiredProductModel
  receipt: ReceiptModel
} & AbstractModel

export default Model;