import { ModelMapping, ViewEnum } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";

const mapping: ModelMapping<ModelEnum.PurchaseFileProduct> = {
  modelName: ModelEnum.PurchaseFileProduct,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    code: {
      type: ColumnTypeEnum.String,
    },
    designation: {
      type: ColumnTypeEnum.String,
      validation: {
        max: 1500,
      },
    },
    orderedQuantity: {
      type: ColumnTypeEnum.Number,
    },
    validateQuantity: {
      type: ColumnTypeEnum.Number,
    },
    partNumber: {
      type: ColumnTypeEnum.Number,
    },
    devisNumber: {
      type: ColumnTypeEnum.Number,
    },
    recommendedPrice: {
      type: ColumnTypeEnum.Number,
    },
    purchaseFile: {
      type: ModelEnum.PurchaseFile,
    },
    vendorOffer: {
      type: ModelEnum.VendorOffer,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        designation: true,
        code: true,
        devisNumber: true,
        vendorOffer: true,
        partNumber: true,
        orderedQuantity: true,
        validateQuantity: true,
        recommendedPrice: true,
      },
    },
    {
      type: ViewEnum.Create,
      fields: {
        designation: true,
        code: true,
        devisNumber: true,
        vendorOffer: true,
        partNumber: true,
        orderedQuantity: true,
        validateQuantity: true,
        recommendedPrice: true,
      },
    },
    {
      type: ViewEnum.Update,
      fields: {
        designation: true,
        code: true,
        devisNumber: true,
        vendorOffer: true,
        partNumber: true,
        orderedQuantity: true,
        validateQuantity: true,
        recommendedPrice: true,
      },
    },
  ],
};

export default mapping;
