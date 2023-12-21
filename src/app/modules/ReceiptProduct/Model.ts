import {AbstractModel} from '../../../_custom/types/types';
import {ReceiptModel} from "../Receipt";
import {DesiredProductModel} from "../DesiredProduct";


type Model = {
  designation: string
  quantity:number
  address: string
  receipts:ReceiptModel
  desiredProducts:DesiredProductModel
} & AbstractModel

export default Model;