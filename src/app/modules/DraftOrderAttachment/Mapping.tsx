import { ModelMapping } from '../../../_custom/types/ModelMapping';
import React from 'react';
import { ABSTRACT_FILE_LISTING_VIEW, ABSTRACT_FILE_MAPPING } from '../columns';
import { ModelEnum } from '../types';
import { ColumnTypeEnum } from '../../../_custom/types/types';
import { NumberFormat } from '../../../_custom/Column/Number/NumberColumn';
import { toAbsoluteApi } from '../utils';


const mapping: ModelMapping<ModelEnum.DraftOrderAttachment> = {
  ...ABSTRACT_FILE_MAPPING,
  modelName: ModelEnum.DraftOrderAttachment,
  views: [
    ABSTRACT_FILE_LISTING_VIEW
  ]
};


export default mapping;
