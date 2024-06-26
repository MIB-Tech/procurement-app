import { ModelMapping, ViewEnum } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";
import { StringFormat } from "../../../_core/Column/String/StringColumn";

const mapping: ModelMapping<ModelEnum.PurchaseFile> = {
  modelName: ModelEnum.PurchaseFile,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    consultedAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Datetime,
    },
    description: {
      type: ColumnTypeEnum.String,
    },
    validationPath: {
      type: ColumnTypeEnum.String,
    },
    purchaseFileNumber: {
      type: ColumnTypeEnum.String,
    },
    createdAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Datetime,
    },
    purchaseFileType: {
      type: ModelEnum.PurchaseFileType,
    },
    purchaseFilesProducts: {
      type: ModelEnum.PurchaseFileProduct,
    },
    user: {
      type: ModelEnum.User,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        description: true,
        validationPath: true,
        createdAt: true,
        purchaseFileNumber: true,
      },
    },
    {
      type: ViewEnum.Create,
      fields: {
        description: true,
        validationPath: true,
        purchaseFileNumber: true,
        consultedAt: true,
        createdAt: true,
      },
    },
    {
      type: ViewEnum.Update,
      fields: {
        description: true,
        validationPath: true,
        createdAt: true,
        purchaseFileNumber: true,
        consultedAt: true,
      },
    },
  ],
};

export default mapping;
