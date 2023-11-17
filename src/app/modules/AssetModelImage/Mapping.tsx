import { ModelMapping } from '../../../_custom/types/ModelMapping';
import React from 'react';
import { ABSTRACT_IMAGE_MAPPING } from '../VendorImage';
import { ModelEnum } from '../types';
import { ColumnTypeEnum } from '../../../_custom/types/types';
import { NumberFormat } from '../../../_custom/Column/Number/NumberColumn';
import { ABSTRACT_FILE_LISTING_VIEW, ABSTRACT_IMAGE_LISTING_VIEW } from '../columns';
import { toAbsoluteApi } from '../utils';


const mapping: ModelMapping<ModelEnum.AssetModelImage> = {
  ...ABSTRACT_IMAGE_MAPPING,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    preview: {
      type: ColumnTypeEnum.String
    },
    fileName: {
      type: ColumnTypeEnum.String
    },
    originalName: {
      type: ColumnTypeEnum.String
    },
    mimeType: {
      type: ColumnTypeEnum.String
    },
    size: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.DecimalUnit
    },
    sortIndex: {
      type: ColumnTypeEnum.Number
    },
    dimensions: {
      type: ColumnTypeEnum.Array,
      separator: 'x'
    },
    contentUrl: {
      type: ColumnTypeEnum.String
    },
    assetModel: {
      type: ModelEnum.WorkOrder
    }
  },
  modelName: ModelEnum.AssetModelImage,
  views: [
    ABSTRACT_IMAGE_LISTING_VIEW
  ]
};

export default mapping;
