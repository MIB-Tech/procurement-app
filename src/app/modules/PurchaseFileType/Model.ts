import {AbstractModel} from '../../../_custom/types/types';
import {PurchaseFileModel} from '../PurchaseFile';


type Model = {
  name: string
  purchaseFiles: Array<PurchaseFileModel>
} & AbstractModel

export default Model;