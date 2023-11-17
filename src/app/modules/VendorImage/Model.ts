import { AbstractImageModel } from '../AssetModel/Model';
import { VendorImageModel } from './index';


type Model = {
  vendor: VendorImageModel
} & AbstractImageModel

export default Model;