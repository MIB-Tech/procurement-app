import { ModelMapping } from "../../../_core/types/ModelMapping";
import { ModelEnum } from "../types";
import { ABSTRACT_FILE_LISTING_VIEW, ABSTRACT_FILE_MAPPING } from "../columns";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { NumberFormat } from "../../../_core/Column/Number/NumberColumn";

const mapping: ModelMapping<ModelEnum.ReceiptAttachment> = {
  ...ABSTRACT_FILE_MAPPING,
  modelName: ModelEnum.ReceiptAttachment,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    fileName: {
      type: ColumnTypeEnum.String,
    },
    originalName: {
      type: ColumnTypeEnum.String,
    },
    mimeType: {
      type: ColumnTypeEnum.String,
    },
    size: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.DecimalUnit,
    },
    contentUrl: {
      type: ColumnTypeEnum.String,
    },
    receipt: {
      type: ModelEnum.Receipt,
    },
  },
  views: [ABSTRACT_FILE_LISTING_VIEW],
};

export default mapping;
