import {ModelMapping} from '../../../_custom/types/ModelMapping';
import {ModelEnum} from '../types';
import {ABSTRACT_FILE_LISTING_VIEW, ABSTRACT_FILE_MAPPING} from '../columns';


const mapping: ModelMapping<ModelEnum.purchaseOrderAttachment> = {
  ...ABSTRACT_FILE_MAPPING,
  modelName: ModelEnum.purchaseOrderAttachment,
  views: [
    ABSTRACT_FILE_LISTING_VIEW
  ]
};

export default mapping;
