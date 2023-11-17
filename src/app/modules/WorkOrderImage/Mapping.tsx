import { ModelMapping } from '../../../_custom/types/ModelMapping';
import React from 'react';
import { ModelEnum } from '../types';
import { ABSTRACT_FILE_LISTING_VIEW, ABSTRACT_IMAGE_LISTING_VIEW } from '../columns';
import { ColumnTypeEnum } from '../../../_custom/types/types';
import { toAbsoluteApi } from '../utils';
import { NumberFormat } from '../../../_custom/Column/Number/NumberColumn';


const mapping: ModelMapping<ModelEnum.WorkOrderImage> = {
  modelName: ModelEnum.WorkOrderImage,
  icon: '/communication/com005.svg',
  uploadable: true,
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
    workOrder: {
      type: ModelEnum.WorkOrder
    }
  },
  views: [
    ABSTRACT_IMAGE_LISTING_VIEW
  ]
};

export default mapping;
