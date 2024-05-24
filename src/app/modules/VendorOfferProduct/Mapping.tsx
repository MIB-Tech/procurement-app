import { ModelMapping } from "../../../_custom/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_custom/types/types";
import { ModelEnum } from "../types";

const mapping: ModelMapping<ModelEnum.VendorOfferProduct> = {
  modelName: ModelEnum.VendorOfferProduct,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    uid: {
      type: ColumnTypeEnum.String,
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
    desination: {
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
