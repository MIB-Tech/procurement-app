import {ModelMapping} from '../../../_custom/types/ModelMapping';
import {ModelEnum} from '../types';
import {ABSTRACT_FILE_LISTING_VIEW, ABSTRACT_FILE_MAPPING} from '../columns';
import {ColumnTypeEnum} from '../../../_custom/types/types'
import {NumberFormat} from '../../../_custom/Column/Number/NumberColumn'


const mapping: ModelMapping<ModelEnum.PurchaseOrderAttachment> = {
  ...ABSTRACT_FILE_MAPPING,
  modelName: ModelEnum.PurchaseOrderAttachment,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
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
    contentUrl: {
      type: ColumnTypeEnum.String
    },
    purchaseOrder: {
      type: ModelEnum.PurchaseOrder
    }
  },
  views: [
    ABSTRACT_FILE_LISTING_VIEW
  ]
};

export default mapping;
