import { LocationModel } from '../Location';
import { AssetModel } from '../Asset';
import { AbstractModel } from '../../../_custom/types/types';
import { ServiceTypeModel } from '../ServiceType';


type Model = {
  serviceType?: ServiceTypeModel
  location?: LocationModel
  assets: Array<AssetModel>
} & AbstractModel

export default Model;