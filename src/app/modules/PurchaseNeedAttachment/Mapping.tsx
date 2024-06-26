import { ModelMapping } from "../../../_core/types/ModelMapping";
import { ABSTRACT_FILE_LISTING_VIEW, ABSTRACT_FILE_MAPPING } from "../columns";
import { ModelEnum } from "../types";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { NumberFormat } from "../../../_core/Column/Number/NumberColumn";

const mapping: ModelMapping<ModelEnum.PurchaseNeedAttachment> = {
  ...ABSTRACT_FILE_MAPPING,
  modelName: ModelEnum.PurchaseNeedAttachment,
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
    purchaseNeed: {
      type: ModelEnum.PurchaseNeed,
    },
  },
  views: [ABSTRACT_FILE_LISTING_VIEW],
};

export default mapping;
