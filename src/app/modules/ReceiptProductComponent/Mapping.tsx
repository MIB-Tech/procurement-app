import { ModelMapping } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";
import { ref } from "yup";
import { DesiredProductModel } from "../DesiredProduct";
import { QuantityStatusEnum } from "../PurchaseOrder/Model";
import { PurchaseOrderProductComponentModel } from "../PurchaseOrderProductComponent";

const mapping: ModelMapping<ModelEnum.ReceiptProductComponent> = {
  modelName: ModelEnum.ReceiptProductComponent,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    quantity: {
      type: ColumnTypeEnum.Number,
      schema: (schema) =>
        schema.when(["restQuantity", "purchaseOrderProductComponent"], {
          is: (
            restQuantity: number,
            purchaseOrderProductComponent: PurchaseOrderProductComponentModel
          ) => {
            return (
              purchaseOrderProductComponent.status !==
                QuantityStatusEnum.FullyReceived && restQuantity > 0
            );
          },
          then: (schema) => schema.positive().max(ref("restQuantity")),
        }),
    },
    restQuantity: {
      type: ColumnTypeEnum.Number,
    },
    received: {
      type: ColumnTypeEnum.Boolean,
      nullable: true,
    },
    receiptProduct: {
      type: ModelEnum.ReceiptProduct,
    },
    purchaseOrderProductComponent: {
      type: ModelEnum.PurchaseOrderProductComponent,
    },
  },
};

export default mapping;
