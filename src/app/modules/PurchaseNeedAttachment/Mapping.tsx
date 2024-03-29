import {ModelMapping} from '../../../_custom/types/ModelMapping';
import {ABSTRACT_FILE_LISTING_VIEW, ABSTRACT_FILE_MAPPING} from '../columns';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.PurchaseNeedAttachment> = {
  ...ABSTRACT_FILE_MAPPING,
  modelName: ModelEnum.PurchaseNeedAttachment,
  views: [
    ABSTRACT_FILE_LISTING_VIEW
  ]
};


export default mapping;
