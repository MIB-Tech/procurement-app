import { ModelMapping, ViewEnum } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";
import { QUANTITY_STATUS_OPTIONS } from "../PurchaseOrder/Model";
import { StringFormat } from "../../../_core/Column/String/StringColumn";

const mapping: ModelMapping<ModelEnum.PurchaseOrderProductComponent> = {
  modelName: ModelEnum.PurchaseOrderProductComponent,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    designation: {
      type: ColumnTypeEnum.String,
      validation: {
        max: 1500,
      },
    },
    quantity: {
      type: ColumnTypeEnum.Number,
      validation: {
        positive: true,
      },
    },
    componentQuantity: {
      type: ColumnTypeEnum.Number,
      validation: {
        positive: true,
      },
    },
    restQuantity: {
      type: ColumnTypeEnum.Number,
    },
    status: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      title: "DELIVERY_STATUS",
      options: QUANTITY_STATUS_OPTIONS,
    },
    purchaseOrderProduct: {
      type: ModelEnum.PurchaseOrderProduct,
    },
    product: {
      type: ModelEnum.PurchaseOrderProduct,
    },
    receiptProductComponents: {
      type: ModelEnum.ReceiptProductComponent,
      multiple: true,
    },
  },
  views: [
    {
      type: ViewEnum.Create,
      fields: {
        product: true,
        designation: true,
        quantity: true,
      },
    },
    {
      type: ViewEnum.Update,
      fields: {
        product: true,
        designation: true,
        quantity: true,
      },
    },
  ],
};

export default mapping;
