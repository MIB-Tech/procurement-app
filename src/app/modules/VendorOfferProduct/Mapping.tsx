import { ModelMapping } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";

const mapping: ModelMapping<ModelEnum.VendorOfferProduct> = {
  modelName: ModelEnum.VendorOfferProduct,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    description: {
      type: ColumnTypeEnum.String,
    },
    vendorOffer: {
      type: ModelEnum.VendorOffer,
    },
    vendorProductCode: {
      type: ColumnTypeEnum.String,
    },
    designation: {
      type: ColumnTypeEnum.String,
    },
    quantity: {
      type: ColumnTypeEnum.Number,
    },
    unitPrice: {
      type: ColumnTypeEnum.Number,
    },
    vatRate: {
      type: ColumnTypeEnum.Number,
    },
    isConform: {
      type: ColumnTypeEnum.Boolean,
    },
    score: {
      type: ColumnTypeEnum.Number,
    },
    purchaseFileProduct: {
      type: ModelEnum.PurchaseFileProduct,
    },
  },
};

export default mapping;
