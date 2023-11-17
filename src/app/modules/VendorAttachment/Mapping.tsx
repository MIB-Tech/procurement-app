import { ModelMapping } from '../../../_custom/types/ModelMapping';
import React from 'react';
import { ABSTRACT_FILE_LISTING_VIEW, ABSTRACT_FILE_MAPPING } from '../columns';
import { ModelEnum } from '../types';


const mapping: ModelMapping<ModelEnum.VendorAttachment> = {
  ...ABSTRACT_FILE_MAPPING,
  modelName: ModelEnum.VendorAttachment,
  views: [
    ABSTRACT_FILE_LISTING_VIEW
  ]
};

export default mapping;
